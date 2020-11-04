import { createIntersectionTypeNode } from 'typescript';
import { getToken } from '../data_music/config';
import { httpget } from '../utils/httpfetch';
const ObjectsToCsv = require('objects-to-csv');
const kmeans = require('node-kmeans');


const MYSONGS = 'https://api.spotify.com/v1/me/tracks';

export const getSongs = async (req: any, res: any) => {
  try {
    const token = getToken()
    const response = await httpget(MYSONGS, {
      headers: { Authorization: token },
    });
    res.send(response.data);
    const songs = response.data.items;
    let ids: string = ""
    songs.forEach(song => {
      ids+= `${song.track.id},`
    });
    if(songs.length > 0){
      const songLink = `https://api.spotify.com/v1/audio-features/?ids=${ids}`
      let featuresList: Array<Array<string>> = []
      let songIdList: Array<string> = []
      const songFeatures = await httpget(songLink, {
        headers: { Authorization: token },
      })
      songFeatures.data.audio_features.forEach(songFeature => {
        const {id, danceability, energy, loudness, acousticness, valence, tempo, duration_ms, time_signature} = songFeature;
        featuresList.push([10*tempo, 10*danceability, 10*energy, 2*(loudness+60), 1/acousticness, valence, time_signature]);
        songIdList.push(id)
      });
      kmeans.clusterize(featuresList, {k: 3}, (err,res) => {
        if (err) console.error(err);
        else {
        const clusterList: Array<{songs: Array<string>, intensity?: number}> = []
        const centroid: Array<{tempo: number, centroid: number}> = []
        res.forEach((cluster: any, index: number) => {
          centroid.push({tempo: cluster.centroid[0], centroid: index})
          clusterList.push({songs: cluster.clusterInd.map((index: number)=>songIdList[index])})
        });
        centroid.sort((a, b) => (a.tempo > b.tempo) ? 1 : -1)
        centroid.forEach((val: any, index: number)=>{
          clusterList[val.centroid]["intensity"] = index; 
        })
        console.log(clusterList)
      }
      // clusterList contains songs and their intensities(0: Low, 1: Medium, 2: High) 
      });
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
