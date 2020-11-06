import { mergeStyleSets, TextField } from 'office-ui-fabric-react';
import React, { useContext, useState } from 'react';
import { AppStageContext, WorkoutContext } from '../../contexts';
import Graph from './graph';
import * as ReactIcons from '@fluentui/react-icons';

const getTrainingName = (format: any): string => {
  switch (format) {
    case 1:
      return 'Periodic Rest';
    case 2:
      return 'Gradual Increase';
    case 3:
      return 'Increase - Decrease';
    case 4:
      return 'High Intensity Interval Training';
    default:
      return 'Custom';
  }
};
const classes = mergeStyleSets({
  cell: {
    display: 'flex',
    flexDirection: 'row',
    // alignItems: 'center',
    margin: '20px 20px 10px 0',
    // float: 'left',
    // height: '50px',
    // width: '50px',
  },
  icon: {
    fontSize: '50px',
    margin: '5px 20px',
  },
  code: {
    background: '#f2f2f2',
    borderRadius: '4px',
    padding: '4px',
  },
  navigationText: {
    width: 100,
    margin: '0 5px',
  },
});
export function UserDefined() {
  const [showUserDefinedInput, setShowUserDefinedInput] = useState(false);
  const workoutContext = useContext(WorkoutContext);
  return (
    <div className="selectionpage_userDefined_container">
      <div
        className={classes.cell}
        onClick={() => {
          if (showUserDefinedInput) {
            workoutContext.setCustomFormat('');
          } else {
            workoutContext.setFormat('');
          }
          setShowUserDefinedInput(!showUserDefinedInput);
        }}
      >
        <ReactIcons.AddIcon className={classes.icon} />
      </div>
      {showUserDefinedInput ? (
        <TextField
          placeholder="Enter Custom Setting"
          value={workoutContext.customFormat}
          onChange={(e, newValue = '') => {
            workoutContext.setCustomFormat(newValue);
          }}
        />
      ) : null}
    </div>
  );
}

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
      <UserDefined></UserDefined>

      {(workoutContext.format || workoutContext.customFormat) && (
        <p> Training : {getTrainingName(workoutContext.format)}</p>
      )}
    </div>
  );
}
