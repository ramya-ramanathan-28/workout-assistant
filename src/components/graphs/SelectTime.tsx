import { Slider } from 'office-ui-fabric-react';
import React, { useContext, useState } from 'react';
import { AppStageContext, WorkoutContext } from '../../contexts';
import Graph from './graph';
function timeConvert(n: number) {
  var num = n;
  var hours = num / 60;
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  var hrStr = `${rhours > 0 ? `${rhours} hour${rhours > 1 ? 's' : ''}` : ''}`;
  var minStr = `${
    rminutes > 0 ? `${rminutes} minute${rminutes > 1 ? 's' : ''}` : ''
  }`;
  return `${hrStr} ${minStr}`;
}

export function SelectTime() {
  const appStageContext = useContext(AppStageContext);
  const workoutContext = useContext(WorkoutContext);
  const [selectedDuration, setSelectedDuration] = useState(
    workoutContext.duration
  );
  workoutContext.setDuration(selectedDuration);
  appStageContext.setnextStageState(workoutContext.isAllSet());
  return (
    <div>
      <Graph
        selectedItem={selectedDuration}
        onSelect={setSelectedDuration}
        graphInfo={[
          {
            id: 15,
            src: './images/periodic_rest.png',
            alt: '15 mins',
          },
          {
            id: 30,
            src: './images/gradual_increase.png',
            alt: '30 mins',
          },
          {
            id: 45,
            src: './images/gradual_increase_decrease.png',
            alt: '45 mins',
          },
          {
            id: 60,
            src: './images/high_intensity_interval_training.png',
            alt: '60 mins',
          },
        ]}
      ></Graph>
      <Slider
        max={240}
        value={selectedDuration}
        showValue
        // eslint-disable-next-line react/jsx-no-bind
        onChange={setSelectedDuration}
        styles={{
          line: {
            color: "white"
          }
        }}
      />
      Duration : {timeConvert(selectedDuration)}
    </div>
  );
}
