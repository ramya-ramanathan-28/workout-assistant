import { createIntersectionTypeNode } from 'typescript';
import { getToken } from '../data_music/config';
import { httpget } from '../utils/httpfetch';
const ObjectsToCsv = require('objects-to-csv');
const kmeans = require('node-kmeans');

const MYSONGS = 'https://api.spotify.com/v1/me/tracks?limit=50';

export const getSongs = async (req: any, res: any) => {
  try {
    const token = getToken();
    const response = await httpget(MYSONGS, {
      headers: { Authorization: token },
    });

    const songs = response.data.items;
    let ids: string = '';
    const idNameMap = {};
    songs.forEach((song) => {
      ids += `${song.track.id},`;
      idNameMap[song.track.id] = song.track.name;
    });

    if (songs.length > 0) {
      const songLink = `https://api.spotify.com/v1/audio-features/?ids=${ids}`;
      let featuresList: Array<Array<string>> = [];
      let songIdList: Array<Object> = [];
      const songFeatures = await httpget(songLink, {
        headers: { Authorization: token },
      });
      songFeatures.data.audio_features.forEach((songFeature) => {
        const {
          id,
          danceability,
          energy,
          loudness,
          acousticness,
          valence,
          tempo,
          duration_ms,
          time_signature,
          name,
        } = songFeature;
        featuresList.push([
          tempo / 200,
          danceability,
          2 * energy,
          (10 * (loudness + 60)) / 60,
          1 / acousticness / 1000,
          10 * valence,
        ]);
        songIdList.push({ id: id, name: idNameMap[id] });
        console.log('song', songIdList[songIdList.length - 1]);
      });

      let clusterListresponse = await new Promise((resolver, errhandler) => {
        kmeans.clusterize(featuresList, { k: 3 }, (err, res) => {
          if (err) console.error(err);
          else {
            let clusterList: Array<{
              songs: Array<Object>;
              intensity?: number;
            }> = [];
            const centroid: Array<{ tempo: number; centroid: number }> = [];
            res.forEach((cluster: any, index: number) => {
              centroid.push({ tempo: cluster.centroid[0], centroid: index });
              clusterList.push({
                songs: cluster.clusterInd.map(
                  (index: number) => songIdList[index]
                ),
              });
            });
            centroid.sort((a, b) => (a.tempo > b.tempo ? 1 : -1));
            centroid.forEach((val: any, index: number) => {
              clusterList[val.centroid]['intensity'] = index;
            });
            resolver(clusterList);
          }
          // clusterList contains songs and their intensities(0: Low, 1: Medium, 2: High)
        });
      });
      res.send(clusterListresponse);
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
