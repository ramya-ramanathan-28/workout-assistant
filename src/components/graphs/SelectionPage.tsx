import { mergeStyleSets } from 'office-ui-fabric-react';
import * as ReactIcons from '@fluentui/react-icons';
import React, { useContext } from 'react';
import Graph from './graph';
import { AppStageContext } from '../../contexts';
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
  const appStageContext = useContext(AppStageContext);
  return (
    <div className="selectionpage">
      <div className="selectionpage_predefinedcontainers">
        <SelectGraph />
      </div>
      <div className="selectionpage_userDefined_container">
        <div
          className={classes.cell}
          onClick={() => {
            appStageContext.gotoStage(STAGES.OwnGraph);
          }}
        >
          <div>Or pick a custom setting</div>
          <ReactIcons.AddIcon className={classes.icon} />
          {/* <br /> */}
        </div>
      </div>
      <div className="selectionpage_predefinedcontainers">
        <SelectTime />
      </div>
    </div>
  );
}
