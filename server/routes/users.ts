import { getToken } from '../data_music/config';
import { httpget } from '../utils/httpfetch';
const ObjectsToCsv = require('objects-to-csv');

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
      const songFeatures = await httpget(songLink, {
        headers: { Authorization: token },
      })
      songFeatures.data.audio_features.forEach(songFeature => {
        const {id, danceability, energy, loudness, speechiness, acousticness, instrumentalness, liveness, valence,tempo, duration_ms, time_signature} = songFeature;
        featuresList.push({id, danceability, energy, loudness, speechiness, acousticness, instrumentalness, liveness, valence,tempo, duration_ms, time_signature});
      });
      const csv = new ObjectsToCsv(featuresList);
      await csv.toDisk('./features.csv');
      // To print: console.log(await csv.toString());
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
