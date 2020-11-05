import { getToken } from '../data_music/config';
import { httpget, httppost } from '../utils/httpfetch';
import axios from 'axios';
const kmeans = require('node-kmeans');

const MYSONGS = 'https://api.spotify.com/v1/me/tracks?limit=50';
let featuresList: Array<Array<number>> = [];
let songIdList: Array<Object> = [];

const getSongList = async () => {
  const token = getToken();
  const response = await httpget(MYSONGS, {
    headers: { Authorization: token },
  });

  const songs = response.data?.items;
  let ids: string = '';
  const idNameMap = {};
  songs.forEach((song) => {
    ids += `${song.track.id},`;
    idNameMap[song.track.id] = song.track.name;
  });

  if (songs.length > 0) {
    const songLink = `https://api.spotify.com/v1/audio-features/?ids=${ids}`;
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
        tempo/200,
        danceability,
        2 * energy,
        10 * (loudness + 60)/60,
        (1/acousticness)/1000,
        10 * valence
      ]);
      songIdList.push({ id: id, name: idNameMap[id], duration: duration_ms });
      console.log('song', songIdList[songIdList.length - 1]);
    });

}
}
const fetchBuckets = async (buckets: number = 3): Promise<any[]> => {
  
    let clusterListresponse: Array<any> = await new Promise((resolver, errhandler) => {
      kmeans.clusterize(featuresList, { k: buckets }, (err, res) => {
        if (err) console.error(err);
        else {
          let clusterList: Array<{
            songs: Array<Object>;
            intensity?: number;
          }> = [];
          const centroid: Array<{ tempo: number; danceability: number, energy: number, centroid: number }> = [];
          res.forEach((cluster: any, index: number) => {
            centroid.push({ tempo: cluster.centroid[0], danceability: cluster.centroid[1], energy: cluster.centroid[2], centroid: index });
            clusterList.push({
              songs: cluster.clusterInd.map(
                (index: number) => songIdList[index]
              ),
            });
          });
          centroid.sort((a, b) => ((a.tempo + a.danceability + a.energy) > (b.tempo + b.danceability + b.energy) ? 1 : -1));
          centroid.forEach((val: any, index: number) => {
            clusterList[val.centroid]['intensity'] = index;
          });
          resolver(clusterList);
        }
        // clusterList contains songs and their intensities(0: Low, 1: Medium, 2: High)
      });
    });
  return clusterListresponse
}

export const getSongs = async (req: any, res: any, ) => {
  try {
    await getSongList();
    res.send(await fetchBuckets());
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

const median = (values: Array<number>)=> {
  if(values.length ===0) return 0;

  values.sort(function(a,b){
    return a-b;
  });

  var index = Math.floor(values.length * 3 / 4);

  return (values[index])
}

const getSlotDuration = (totalDuration: number) => {
    const songDurations = songIdList.map((song: any)=>song["duration"])
    const medianDuration = median(songDurations)
    const numberOfSlots = Math.floor(totalDuration / medianDuration);
    return {median: medianDuration, slots: numberOfSlots}
}

const getDefaultPattern = (slots: number, defaultPattern: string) => {
  let songsPattern = []
  let iterator = slots; 
  switch(parseInt(defaultPattern)){
    case 1: 
      while(iterator){
        songsPattern.push(2)
        iterator = iterator - 1;
        if(iterator){
          songsPattern.push(1)
          iterator = iterator - 1;
        }
      }
      break;
    case 2:
      for(let i=1; i<=slots; i++ ){
        songsPattern.push(i);
      }
      break; 
    case 3: 
    let i: number = 1;
    for(i=1; i<=slots/2; i++ ){
      songsPattern.push(i);
    }
    let val = i;
    for(i=1; i<slots/2; i++){
      songsPattern.push(val - i)
    }
    break;
    case 4:
      while(iterator){
        songsPattern.push(3)
        iterator = iterator - 1;
        if(iterator){
          songsPattern.push(1)
          iterator = iterator - 1;
        }
      }
      break; 
  }
  return songsPattern;
}

export const getPlaylist = async (req: any, res: any) => {
  let songsPattern: Array<number>;
  const duration = parseInt(req.query.duration);
  const defaultPattern = req.query.defaultPattern
  let buckets: Array<any>;
  await getSongList();
  const {median, slots} = getSlotDuration(duration)
  let slotDuration = median;
  if(defaultPattern){
    songsPattern = getDefaultPattern(slots, defaultPattern);
  }
  else {
    songsPattern = req.query.songsPattern.split(','); 
    slotDuration = duration/songsPattern.length;
  }
  const max = Math.max(...songsPattern)
  buckets = await fetchBuckets(max);
  let visited: Array<number> = []
  let playlist: Array<number> = []
  songsPattern.forEach((songIntensity: number)=>{
    let slotTimeRemaining = slotDuration
    buckets.forEach((bucket: any) => {
      if (bucket.intensity === songIntensity - 1) {
        let songs: Array<any> = bucket["songs"]
        while (slotTimeRemaining >= -30000 && songs.length) {
          songs = songs.filter((song: any) => {
            return song["duration"] <= slotTimeRemaining + 30000 && !visited.includes(song["id"])
          })
          if (songs.length) {
            let randomIndex = Math.floor(Math.random() * songs.length);
            while (visited.includes(songs[randomIndex].id)) {
              randomIndex = Math.floor(Math.random() * songs.length);
            }
            visited.push(songs[randomIndex].id)
            slotTimeRemaining = slotTimeRemaining - songs[randomIndex].duration;
            playlist.push(songs[randomIndex]);
          }
        }
      }
    });
  })
  res.send(playlist);
}

export const addSongsToPlaylist = async (req: any, res: any) => {
  const songIds = req.query.songIds.split(',')
  let songString = ""
  songIds.forEach((songId: string)=>songString+=`spotify:track:${songId},`)

  const userDetailsUrl = 'https://api.spotify.com/v1/me'
  const user_id = (await httpget(userDetailsUrl)).data.id;

  const createPlaylistUrl = `https://api.spotify.com/v1/users/${user_id}/playlists`
  const data = {
    "name": "Workout Assistant - " + new Date().toLocaleString(),
    "description": "Auto generated playlist using Workout Assistant",
    "public": false
  }
  const playlistId = (await httppost(createPlaylistUrl, JSON.stringify(data), undefined, {'Content-Type':'application/json'})).data.id

  const addToPlaylistUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${songString}`
  await httppost(addToPlaylistUrl)

  res.send({url: `https://open.spotify.com/playlist/`})
}