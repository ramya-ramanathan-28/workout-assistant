import React, {useState,useEffect, useContext} from "react";
import { Button, DetailsList, mergeStyleSets } from 'office-ui-fabric-react';
import {WorkoutContext} from "../../contexts";
import  {DetailsListDocumentsExample} from "./Songs";

async function createPlaylist(url = "", data = {}) {
  const baseurl = "http://localhost:5000/api/addSongsToPlaylist";
  // Default options are marked with *
  const response = await fetch(`${baseurl}${url}`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

function SongList(props: any) {
    const isloggedin = props.isLoggedIn;
    const [showSongs, setShowSongs] = useState(false);
    const [songsList, setSongsList] = useState([]);
    const workoutContext = useContext(WorkoutContext);
    console.log(">>> ",workoutContext.format);
    useEffect(() => {
      if (showSongs) {
        fetch(`http://localhost:5000/api/playlist?duration=3600000&defaultPattern=${workoutContext.format}`).then((response) =>
        response.json().then((res) => setSongsList(res))
        );
      }
    }, [showSongs]);
    //if (isloggedin) {
    // const listItems1 = (songsList.filter((item: any) => {
    //   return item.intensity == 0;
    // })[0] as any)?.songs.map((eachItem: any) => <li>{eachItem.name}</li>);
  
    // const listItems2 = (songsList.filter((item: any) => {
    //   return item.intensity == 1;
    // })[0] as any)?.songs.map((eachItem: any) => <li>{eachItem.name}</li>);
  
    // const listItems3 = (songsList.filter((item: any) => {
    //   return item.intensity == 2;
    // })[0] as any)?.songs.map((eachItem: any) => <li>{eachItem.name}</li>);
  
    // const ShowSongs = showSongs ? (
    //   <div className={classes.divb}>
    //     <text> Low</text>
    //     <ul>{listItems1}</ul>
    //     <text> Medium</text>
    //     <ul>{listItems2}</ul>
    //     <text> High</text>
    //     <ul>{listItems3}</ul>
    //   </div>
    // ) : null;

    return (
      <>
        <Button
          onClick={() => {
            setShowSongs(!showSongs);
          }}
        >
          ShowSongs
        </Button>
        <Button
          onClick={() => {
            // setShowSongs(!showSongs);
          }}
        >
          Add to Queue
        </Button>
        <Button
          onClick={() => {
            // setShowSongs(!showSongs);
            const songids = songsList.map((song: any) => {
              return song.id;
            })

            fetch(`http://localhost:5000/api/addSongsToPlaylist?songIds=${songids.join()}`, { method:'post'}).then((response) =>
              response.json().then((res) => console.log(res))
            );
          }}
        >
          Create Playlist
        </Button>
        {/* {ShowSongs} */}
        <div className="song-list">
        {showSongs &&<DetailsListDocumentsExample songList={songsList} key={songsList.length}/>}
        </div>
      </>
    );
  }

  export default SongList;

  // /{url: "https://open.spotify.com/playlist/1Zy1cej6y1EMiP0czag8kN"}
// url: "https://open.spotify.com/playlist/1Zy1cej6y1EMiP0czag8kN"