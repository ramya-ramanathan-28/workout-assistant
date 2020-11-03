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
      let featuresList: Array<any> = []
      let songIdList: Array<string> = []
      const songFeatures = await httpget(songLink, {
        headers: { Authorization: token },
      })
      songFeatures.data.audio_features.forEach(songFeature => {
        const {id, danceability, energy, loudness, speechiness, acousticness, instrumentalness, liveness, valence,tempo, duration_ms, time_signature} = songFeature;
        featuresList.push([tempo, danceability, energy, loudness, speechiness, acousticness, instrumentalness, liveness, valence, duration_ms, time_signature]);
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
      }
      // clusterList contains songs and their intensities(0: Low, 1: Medium, 2: High) 
      });
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
