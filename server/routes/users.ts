import { createIntersectionTypeNode } from 'typescript';
import { getToken } from '../data_music/config';
import { httpget } from '../utils/httpfetch';
const ObjectsToCsv = require('objects-to-csv');
const kmeans = require('node-kmeans');

const MYSONGS = 'https://api.spotify.com/v1/me/tracks?limit=50';
let featuresList: Array<Array<string>> = [];
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
        10 * tempo,
        10 * danceability,
        10 * energy,
        2 * (loudness + 60),
        1 / acousticness,
        valence,
        time_signature,
      ]);
      songIdList.push({ id: id, name: idNameMap[id], duration: duration_ms });
      // console.log('song', songIdList[songIdList.length - 1]);
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
  console.log(duration)
  const defaultPattern = req.query.defaultPattern
  let buckets: Array<any>;
  await getSongList();
  const {median, slots} = getSlotDuration(duration)
  console.log(slots)
  if(defaultPattern){
    songsPattern = getDefaultPattern(slots, defaultPattern);
    console.log(songsPattern)
  }
  else {
    songsPattern = req.query.songsPattern.split(','); 
  }
  const max = Math.max(...songsPattern)
  console.log(max)
  buckets = await fetchBuckets(max);
  let visited: Array<number> = []
  let playlist: Array<number> = []
  songsPattern.forEach((songIntensity: number)=>{
    let slotTimeRemaining = median
    buckets.forEach((bucket: any) => {
      if (bucket.intensity === songIntensity - 1) {
        let songs: Array<any> = bucket["songs"]
        while (slotTimeRemaining >= -3000 && songs.length) {
          // console.log("Entered")
          songs = songs.filter((song: any) => {
            return song["duration"] <= slotTimeRemaining + 30000 && !visited.includes(song["id"])
          })
          // console.log(songs)
          if (songs.length) {
            let randomIndex = Math.floor(Math.random() * songs.length);
            // console.log(randomIndex)
            while (visited.includes(songs[randomIndex].id)) {
              // console.log(randomIndex)
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