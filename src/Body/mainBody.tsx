import React, { useContext} from 'react';
import { CreateGraph } from '../components/graphs/CreateGraph';
import LandingPage from '../components/graphs/LandingPage';
import { STAGES } from '../constant';
import { AppStageContext } from '../contexts';
import SongList from "../components/graphs/SongsList"

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
