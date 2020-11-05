import React, {useContext} from 'react';
import { graphClassNames } from './graph.styles';
import { AppStageContext, WorkoutContext } from '../../contexts';

function Graph(props: any) {
  const appStageContext = useContext(AppStageContext);
  const workoutContext = useContext(WorkoutContext);
  console.log(">>> ",workoutContext.format);

  return (
    <div className={graphClassNames.container}>
      <div className={graphClassNames.row}>
        <button className={graphClassNames.item} onClick={() => {
          workoutContext.setFormat("1");
          appStageContext.gotoStage(appStageContext.nextStage);
        }}>
          <img className={graphClassNames.graphImage} src="./images/periodic_rest.png" alt="periodic_rest"/>
        </button>
        <button className={graphClassNames.item} onClick={() => {
          workoutContext.setFormat("2");
          appStageContext.gotoStage(appStageContext.nextStage);
        }}>
          <img className={graphClassNames.graphImage} src="./images/gradual_increase.png" alt="gradual_increase"/>
        </button>
      </div>
      <div className={graphClassNames.row}>
        <button className={graphClassNames.item} onClick={() => {
          workoutContext.setFormat("3");
          appStageContext.gotoStage(appStageContext.nextStage);
        }}>
          <img className={graphClassNames.graphImage} src="./images/gradual_increase_decrease.png" alt="gradual_increase_decrease"/>
        </button>
        <button className={graphClassNames.item} onClick={() => {
          workoutContext.setFormat("4");
          appStageContext.gotoStage(appStageContext.nextStage);
        }}>
          <img className={graphClassNames.graphImage} src="./images/high_intensity_interval_training.png" alt="high_intensity_interval_training"/>
        </button>
      </div>
    </div>
  );
}

export default Graph;
