import React, { useContext, useState } from 'react';
import { AppStageContext, WorkoutContext } from '../../contexts';
import Graph from './graph';

export function SelectGraph() {
  const appStageContext = useContext(AppStageContext);
  const workoutContext = useContext(WorkoutContext);
  const [selectedWorkout, setSelectedIcon] = useState(workoutContext.format);
  workoutContext.setFormat(selectedWorkout);
  appStageContext.setnextStageState(workoutContext.isAllSet());
  return (
    <Graph
      selectedItem={selectedWorkout}
      onSelect={setSelectedIcon}
      isImage={true}
      graphInfo={[
        {
          id: 1,
          src: './images/periodic_rest.png',
          alt: 'periodic_rest',
        },
        {
          id: 2,
          src: './images/gradual_increase.png',
          alt: 'gradual_increase',
        },
        {
          id: 3,
          src: './images/gradual_increase_decrease.png',
          alt: 'gradual_increase_decrease',
        },
        {
          id: 4,
          src: './images/high_intensity_interval_training.png',
          alt: 'high_intensity_interval_training',
        },
      ]}
    ></Graph>
  );
}
