import { Button, mergeStyleSets } from 'office-ui-fabric-react';
import React, { useContext, useEffect, useState } from 'react';
import { CreateGraph } from '../components/graphs/CreateGraph';
import LandingPage from '../components/graphs/LandingPage';
import { SelectionPage } from '../components/graphs/SelectionPage';
import { STAGES } from '../constant';
import { AppStageContext } from '../contexts';
const classes = mergeStyleSets({
  divb: {
    background: '#FFFFFF',
  },
});

function SongList(props: any) {
  const isloggedin = props.isLoggedIn;
  const [showSongs, setShowSongs] = useState(false);
  const [songsList, setSongsList] = useState([]);
  useEffect(() => {
    if (showSongs) {
      fetch('http://localhost:5000/api/songs').then((response) =>
        response.json().then((res) => setSongsList(res))
      );
    }
  }, [showSongs]);
  //if (isloggedin) {
  const listItems1 = (songsList.filter((item: any) => {
    return item.intensity == 0;
  })[0] as any)?.songs.map((eachItem: any) => <li>{eachItem.name}</li>);

  const listItems2 = (songsList.filter((item: any) => {
    return item.intensity == 1;
  })[0] as any)?.songs.map((eachItem: any) => <li>{eachItem.name}</li>);

  const listItems3 = (songsList.filter((item: any) => {
    return item.intensity == 2;
  })[0] as any)?.songs.map((eachItem: any) => <li>{eachItem.name}</li>);

  const ShowSongs = showSongs ? (
    <div className={classes.divb}>
      <text> Low</text>
      <ul>{listItems1}</ul>
      <text> Medium</text>
      <ul>{listItems2}</ul>
      <text> High</text>
      <ul>{listItems3}</ul>
    </div>
  ) : null;
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
      setNextStage(STAGES.SongsList);
      comp = <LandingPage></LandingPage>;
      break;

    case STAGES.SongsList:
      comp = <SongList></SongList>;
      break;
    case STAGES.OwnGraph:
      comp = <CreateGraph></CreateGraph>;
      break;
  }
  return <div>{comp}</div>;
}
