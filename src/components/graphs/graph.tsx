import React, { useContext, useState } from 'react';
import { graphClassNames } from './graph.styles';
import { AppStageContext, WorkoutContext } from '../../contexts';
import { Button } from 'office-ui-fabric-react';

function Graph(props: any) {
  return (
    <div className={graphClassNames.container}>
      <div className={graphClassNames.row}>
        {props.graphInfo.map(
          (eachItem: { id: string; src: string; alt: string }) =>
            props.isImage ? (
              <button
                className={`${graphClassNames.item} ${
                  props.selectedItem === eachItem.id ? 'selected-pattern' : ''
                } img__wrap`}
                onClick={() => {
                  props.onSelect(eachItem.id);
                }}
              >
                {/* <div className="content-overlay"></div> */}
                <img
                  className={`${graphClassNames.graphImage} content-image`}
                  src={eachItem.src}
                  alt={eachItem.alt}
                />
                <div className="img__description_layer">
              <h3 className="img__description">{eachItem.alt}</h3>
                </div>
              </button>
            ) : (
              <Button
                className={`${graphClassNames.item} ${
                  props.selectedItem === eachItem.id ? 'selected-pattern' : ''
                }`}
                onClick={() => {
                  props.onSelect(eachItem.id);
                }}
              >
                {eachItem.alt}
              </Button>
            )
        )}
      </div>
    </div>
  );
}

export default Graph;
