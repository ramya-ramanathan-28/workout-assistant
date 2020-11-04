import React from 'react';
import Graph from './graph';

export function SelectionPage(props: any) {
  return (
    <div className="selectionpage">
      <Graph setSelectedConfig={props.setSelectedConfig}></Graph>
    </div>
  );
}
