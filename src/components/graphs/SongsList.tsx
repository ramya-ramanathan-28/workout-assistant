import React, {useState,useEffect, useContext} from "react";
import { Button, DetailsList, mergeStyleSets } from 'office-ui-fabric-react';
import {WorkoutContext} from "../../contexts";
import  {DetailsListDocumentsExample} from "./Songs";

// const classes = mergeStyleSets({
//     divb: {
//       background: '#FFFFFF',
//     },
//   });

function SongList(props: any) {
    const isloggedin = props.isLoggedIn;
    const [showSongs, setShowSongs] = useState(false);
    const [songsList, setSongsList] = useState([]);
    const workoutContext = useContext(WorkoutContext);
    console.log(">>> ",workoutContext.format);
    useEffect(() => {
      if (showSongs) {
        fetch('http://localhost:5000/api/songs').then((response) =>
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
          }}
        >
          Create Playlist
        </Button>
        {/* {ShowSongs} */}
        <div className="song-list">
          <DetailsListDocumentsExample songList={songsList} key={songsList.length}/>
        </div>
      </>
    );
  }

  export default SongList;