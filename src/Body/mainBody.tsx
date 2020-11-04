import { Button } from 'office-ui-fabric-react';
import React, { useContext, useEffect, useState } from 'react';
import { CreateGraph } from '../components/graphs/CreateGraph';
import LandingPage from '../components/graphs/LandingPage';
import { SelectionPage } from '../components/graphs/SelectionPage';
import { STAGES } from '../constant';
import { AppStageContext } from '../contexts';

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

export default function MainBody(props: {}) {
  const { currentStage, setNextStage } = useContext(AppStageContext);
  let comp = <div></div>;
  switch (currentStage) {
    case STAGES.LandingPage:
      setNextStage(STAGES.SelectionPage);
      comp = (
        <div>
          <LandingPage></LandingPage>
        </div>
      );
      break;
    case STAGES.SelectionPage:
      setNextStage(STAGES.SongsList);
      comp = <SelectionPage></SelectionPage>;
      break;
    case STAGES.SongsList:
      comp = <SongList></SongList>;
      break;
    case STAGES.OwnGraph:
      comp = <CreateGraph></CreateGraph>;
      break;
    default:
      comp = <div></div>;
  }
  return comp;
}
