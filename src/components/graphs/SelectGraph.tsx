import React, { useContext, useState } from 'react';
import { AppStageContext, WorkoutContext } from '../../contexts';
import Graph from './graph';

const getTrainingName = (format: any): string => {
  switch(format){
    case 1: return "Periodic Rest"
    case 2: return "Gradual Increase"
    case 3: return "Increase - Decrease"
    case 4: return "High Intensity Interval Training"
    default: return ""
  }
};

export function SelectGraph() {
  const appStageContext = useContext(AppStageContext);
  const workoutContext = useContext(WorkoutContext);
  appStageContext.setnextStageState(workoutContext.isAllSet());
  return (
    <div>
    <Graph
      selectedItem={workoutContext.format}
      onSelect={workoutContext.setFormat}
      isImage={true}
      graphInfo={[
        {
          id: 1,
          src: './images/periodic_rest.png',
          alt: 'Periodic Rest',
        },
        {
          id: 2,
          src: './images/gradual_increase.png',
          alt: 'Gradual Increase',
        },
        {
          id: 3,
          src: './images/gradual_increase_decrease.png',
          alt: 'Increase - Decrease',
        },
        {
          id: 4,
          src: './images/high_intensity_interval_training.png',
          alt: 'High Intensity Interval Training',
        },
      ]}
    ></Graph>
    {workoutContext.format && (<p> Training : {getTrainingName(workoutContext.format)}</p>)}
    </div>
  );
}
