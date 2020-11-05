import React, { useState, useEffect, useContext } from 'react';
import { Button } from 'office-ui-fabric-react';
import { WorkoutContext } from '../../contexts';
import { DetailsListDocumentsExample } from './Songs';

function SongList(props: any) {
  const [songsList, setSongsList] = useState([]);
  const [playlistLink, setPlaylistLink] = useState('');
  const workoutContext = useContext(WorkoutContext);

  useEffect(() => {
    fetch(
      `http://localhost:5000/api/playlist?duration=${
        workoutContext.duration * 60 * 1000
      }&${
        !workoutContext.customFormat
          ? `defaultPattern=${workoutContext.format}`
          : `songsPattern=${workoutContext.customFormat}`
      }`
    ).then((response) => response.json().then((res) => setSongsList(res)));
  }, []);

  return (
    <>
      <div className="song-list">
        {playlistLink === '' && (
          <div style={{display: "flex", margin: "20px"}}>
          <Button
          styles={{root:{
            borderRadius: "15px",
            backgroundColor: "white",
            fontWeight: 600,
            color: "black",
            margin: "0 10px"
          }}}
            onClick={() => {
              const songids = songsList.map((song: any) => {
                return song.id;
              });
              
              fetch(
                `http://localhost:5000/api/addSongsToPlaylist?songIds=${songids.join()}`,
                { method: 'post' }
                ).then((response) =>
                response.json().then((res) => {
                  console.log(res);
                  setPlaylistLink(res.url);
                })
                );
              }}
              >
            Create Playlist on Spotify
          </Button>
          <Button
          styles={{root:{
            borderRadius: "15px",
            backgroundColor: "white",
            fontWeight: 600,
            color: "black",
            margin: "0 10px"
          }}}
            onClick={() => {
              const songids = songsList.map((song: any) => {
                return song.id;
              });
              
              fetch(
                `http://localhost:5000/api/addSongsToPlaylist?songIds=${songids.join()}`,
                { method: 'post' }
                ).then((response) =>
                response.json().then((res) => {
                  console.log(res);
                  setPlaylistLink(res.url);
                })
                );
              }}
              >
            Add songs to the queue
          </Button>
        </div>
        )}
        { playlistLink === '' &&
          <DetailsListDocumentsExample
          songList={songsList}
            key={songsList.length}
          />
        }
        {playlistLink !== '' && (
          <div style={{
            fontSize: "80px",
            fontWeight: "bolder",
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
            <p>Playlist created</p>
            <a href={playlistLink} style={{color:"white"}}>Click here to listen</a>
          </div>
        )}
      </div>
    </>
  );
}

export default SongList;

// /{url: "https://open.spotify.com/playlist/1Zy1cej6y1EMiP0czag8kN"}
// url: "https://open.spotify.com/playlist/1Zy1cej6y1EMiP0czag8kN"
