import React, {useState,useEffect, useContext} from "react";
import { Button} from 'office-ui-fabric-react';
import {WorkoutContext} from "../../contexts";
import  {DetailsListDocumentsExample} from "./Songs";

function SongList(props: any) {
    const isloggedin = props.isLoggedIn;
    const [showSongs, setShowSongs] = useState(false);
    const [songsList, setSongsList] = useState([]);
    const [playlistLink, setPlaylistLink] = useState("");
    const workoutContext = useContext(WorkoutContext);
    console.log(">>> ",workoutContext.format);
    useEffect(() => {
      if (showSongs) {
        fetch(`http://localhost:5000/api/playlist?duration=3600000&defaultPattern=${workoutContext.format}`).then((response) =>
        response.json().then((res) => setSongsList(res))
        );
      }
    }, [showSongs, workoutContext.format]);

    return (
      <>
        <Button
          onClick={() => {
            setShowSongs(true);
          }}
        >
          ShowSongs
        </Button>
        <Button
          onClick={() => {
            setShowSongs(false);
            const songids = songsList.map((song: any) => {
              return song.id;
            })

            fetch(`http://localhost:5000/api/addSongsToPlaylist?songIds=${songids.join()}`, { method:'post'}).then((response) =>
              response.json().then((res) => {
                console.log(res);
                setPlaylistLink(res.url);
                
              })
            );
          }}
        >
          Create Playlist
        </Button>
        <div className="song-list">
          {showSongs &&( <DetailsListDocumentsExample songList={songsList} key={songsList.length}/>)}
        </div>
        { playlistLink !== "" && (
        <div>
          Playlist created. Click below
          <a href={playlistLink}>Link</a>
        </div>
        )}
      </>
    );
  }

  export default SongList;

  // /{url: "https://open.spotify.com/playlist/1Zy1cej6y1EMiP0czag8kN"}
// url: "https://open.spotify.com/playlist/1Zy1cej6y1EMiP0czag8kN"