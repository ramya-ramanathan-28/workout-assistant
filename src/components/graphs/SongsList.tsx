import React, { useState, useEffect, useContext } from 'react';
import { Button } from 'office-ui-fabric-react';
import { AppStageContext, WorkoutContext } from '../../contexts';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react';
import { DetailsListDocumentsExample } from './Songs';

function SongList(props: any) {
  const [songsList, setSongsList] = useState([]);
  const [playlistLink, setPlaylistLink] = useState('');
  const workoutContext = useContext(WorkoutContext);
  const appStageContext = useContext(AppStageContext);
  const [showPlaylistPage, setShowPlaylistPage] = useState(false)
  const [playlistName, setPlaylistName] = useState("Workout Assistant - " + new Date().toLocaleString());
  useEffect(() => {
    fetch(
      `http://localhost:5000/api/playlist?duration=${workoutContext.duration * 60 * 1000
      }&${!workoutContext.customFormat
        ? `defaultPattern=${workoutContext.format}`
        : `songsPattern=${workoutContext.customFormat}`
      }`
    ).then((response) => response.json().then((res) => setSongsList(res)));
  }, []);

  return (
    <>
      <Button
        styles={{
          root: {
            borderRadius: "15px",
            backgroundColor: "white",
            fontWeight: 600,
            color: "black",
            margin: "0 10px",
            float: "left"
          }
        }}
        onClick={() => {
          appStageContext.gotoStage(appStageContext.prevStageArr[appStageContext.prevStageArr.length - 1]);
        }}
      >
        Back
        </Button>
      <div className="song-list">
        {playlistLink === '' && (
          <div style={{ display: "flex", margin: "20px" }}>
            <Button
              styles={{
                root: {
                  borderRadius: "15px",
                  backgroundColor: "white",
                  fontWeight: 600,
                  color: "black",
                  margin: "0 10px"
                }
              }}
              onClick={() => {
                setShowPlaylistPage(true)
              }}
            >
              Create Playlist on Spotify
          </Button>
            <Button
              styles={{
                root: {
                  borderRadius: "15px",
                  backgroundColor: "white",
                  fontWeight: 600,
                  color: "black",
                  margin: "0 10px"
                }
              }}
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
        {showPlaylistPage &&
          <div style={{
            display: "flex",
            flexDirection:"column",
            backgroundColor: "black",
            width: "300px", 
            height: "200px",
            justifyContent:"center"
          }}>
            <div 
              style = {{    
                color: "white",
                textAlign: "center"
              }}
              >
                Enter playlist name: 
            </div>
            <input
             style = {{
              padding: "12px 20px",
              margin: "20px auto",
              border: "1px solid #ccc",
              borderRadius: "4px",
              boxSizing: "border-box",
              width: "75%"

             }}
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
            >
            </input>
            <Button
              styles={{
                root: {
                  borderRadius: "15px",
                  backgroundColor: "white",
                  fontWeight: 600,
                  color: "black",
                  margin: "0 auto"
                }
              }}
              onClick={() => {
                const songids = songsList.map((song: any) => {
                  return song.id;
                });

                fetch(
                  `http://localhost:5000/api/addSongsToPlaylist?songIds=${songids.join()}&playlistName=${playlistName}`,
                  { method: 'post' }
                ).then((response) =>
                  response.json().then((res) => {
                    console.log(res);
                    setPlaylistLink(res.url);
                  })
                )
              }}
            >
              Create Playlist
          </Button>
          </div>
        }
        {!songsList.length && <Spinner size={SpinnerSize.large} label={"Loading playlist"} /> }
        {playlistLink === '' && !showPlaylistPage &&
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
            <a href={playlistLink}  target="_blank" style={{ color: "white" }}>Click here to listen</a>
          </div>
        )}
      </div>
    </>
  );
}

export default SongList;

// /{url: "https://open.spotify.com/playlist/1Zy1cej6y1EMiP0czag8kN"}
// url: "https://open.spotify.com/playlist/1Zy1cej6y1EMiP0czag8kN"
