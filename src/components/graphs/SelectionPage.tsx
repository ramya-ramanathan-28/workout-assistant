import { mergeStyleSets } from 'office-ui-fabric-react';
import * as ReactIcons from '@fluentui/react-icons';
import React, { useContext } from 'react';
import Graph from './graph';
import { AppStageContext } from '../../contexts';
import { STAGES } from '../../constant';

const classes = mergeStyleSets({
  cell: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '80px',
    float: 'left',
    height: '50px',
    width: '50px',
  },
  icon: {
    fontSize: '50px',
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
        <Graph setSelectedConfig={props.setSelectedConfig}></Graph>
      </div>
      <div className="selectionpage_userDefined_container">
        <div
          className={classes.cell}
          onClick={() => {
            appStageContext.gotoStage(STAGES.OwnGraph);
          }}
        >
          <ReactIcons.AddIcon className={classes.icon} />
          <br />
          <code className={classes.code}>Choose Your Own Graph</code>
        </div>
      </div>
    </div>
  );
}
