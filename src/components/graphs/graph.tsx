import React, { useContext, useState } from 'react';
import { graphClassNames } from './graph.styles';
import { AppStageContext, WorkoutContext } from '../../contexts';

function Graph(props: any) {
  return (
    <div className={graphClassNames.container}>
      <div className={graphClassNames.row}>
        {props.graphInfo.map(
          (eachItem: { id: string; src: string; alt: string }) => {
            <button
              className={`${graphClassNames.item} ${
                props.selectedItem == eachItem.id ? 'selected-pattern' : ''
              }`}
              onClick={() => {
                props.onSelect(eachItem.id);
              }}
            >
              <img
                className={graphClassNames.graphImage}
                src={eachItem.src}
                alt={eachItem.alt}
              />
            </button>;
          }
        )}
      </div>
    </div>
  );
}

export default Graph;
