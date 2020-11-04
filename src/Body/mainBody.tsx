import { Button } from 'office-ui-fabric-react';
import React, { useEffect, useState } from 'react';
import LandingPage from '../components/graphs/LandingPage';
import { SelectionPage } from '../components/graphs/SelectionPage';

function SongList(props: any) {
  const isloggedin = props.isLoggedIn;
  const [showSongs, setShowSongs] = useState(false);
  const [songsList, setSongsList] = useState([]);
  useEffect(() => {
    if (showSongs) {
      fetch('http://localhost:5000/api/songs').then((response) =>
        response.json().then((res) => setSongsList(res.items))
      );
    }
  }, [showSongs]);
  //if (isloggedin) {
  const listItems = songsList.map((item: { track: { name: '' } }) => {
    let name = item.track.name;
    return <li>{name}</li>;
  });
  const ShowSongs = showSongs ? <ul>{listItems}</ul> : null;
  return (
    <div>
      <Button
        onClick={() => {
          setShowSongs(!showSongs);
        }}
      >
        ShowSongs
      </Button>
      {ShowSongs}
    </div>
  );
  //} else {
  //return <Button disabled={!props.isloggedin}>ShowSongs</Button>;
  // }
}

export default function MainBody(props: {
  stage: any;
  setStage: (stage: number) => void;
}) {
  let comp = <div></div>;
  switch (props.stage) {
    case 0:
      comp = (
        <div>
          <LandingPage setStage={props.setStage}></LandingPage>
        </div>
      );
      break;
    case 1:
      comp = <SelectionPage></SelectionPage>;
      break;
    case 2:
      comp = <SongList></SongList>;
      break;
    default:
      comp = <div></div>;
  }
  return comp;
}
