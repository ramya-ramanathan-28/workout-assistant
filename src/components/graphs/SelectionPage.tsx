import { mergeStyleSets, TextField, Button } from 'office-ui-fabric-react';
import * as ReactIcons from '@fluentui/react-icons';
import React, { useContext, useState } from 'react';
import Graph from './graph';
import { AppStageContext, WorkoutContext } from '../../contexts';
import { STAGES } from '../../constant';
import { SelectGraph } from './SelectGraph';
import { SelectTime } from './SelectTime';

export function SelectionPage(props: any) {
  const workoutContext = useContext(WorkoutContext);
  const appStageContext = useContext(AppStageContext);

  return (
    <div className="selectionpage">
      <div className="selectionpage_predefinedcontainers">
        <SelectGraph />
      </div>
      <div className="selectionpage_predefinedcontainers">
        <SelectTime />
      </div>

      {(workoutContext.format || workoutContext.customFormat) &&
        workoutContext.duration && (
          <Button
            styles={{
              root: {
                borderRadius: "25px",
            backgroundColor: "white",
            fontWeight: 600,
            fontSize: "22px",
            color: "black",
            width: "125px",
            height: "50px",
              },
            }}
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
