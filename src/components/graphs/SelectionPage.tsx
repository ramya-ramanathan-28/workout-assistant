import { mergeStyleSets, TextField, Button } from 'office-ui-fabric-react';
import * as ReactIcons from '@fluentui/react-icons';
import React, { useContext, useState } from 'react';
import Graph from './graph';
import { AppStageContext, WorkoutContext } from '../../contexts';
import { STAGES } from '../../constant';
import { SelectGraph } from './SelectGraph';
import { SelectTime } from './SelectTime';

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

export function SelectionPage(props: any) {
  const workoutContext = useContext(WorkoutContext);
  const appStageContext = useContext(AppStageContext);
  const [showUserDefinedInput, setShowUserDefinedInput] = useState(false);
  return (
    <div className="selectionpage">
      <div className="selectionpage_predefinedcontainers">
        <SelectGraph />
      </div>

      {/* <div className="selectionpage_userDefined_container">
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
          <div>Or pick a custom setting</div>
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
      </div> */}
      
      <div className="selectionpage_predefinedcontainers">
        <SelectTime />
      </div>
      { workoutContext.format && workoutContext.duration && (
        <Button
          styles={{root:{
            borderRadius: "25px",
            backgroundColor: "white",
            fontWeight: 600,
            fontSize: "22px",
            color: "black",
            marginTop: "20px",
            width: "130px",
            height: "50px"
          }}}
          onClick={() => {
            appStageContext.gotoStage(appStageContext.nextStage);
          }}
        >
          Proceed
        </Button>
      )}
    </div>
  );
}
