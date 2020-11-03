import React from 'react';
import { graphClassNames } from './graph.styles'

function Graph() {
  return (
    <div className={graphClassNames.container}>
    <div className={graphClassNames.row}>
        <a className={graphClassNames.item}><img className={graphClassNames.graphImage} height="300px" src="./images/1.png"/></a>
        <a className={graphClassNames.item}><img className={graphClassNames.graphImage} src="./images/2.png"/></a>
    </div>
    <div className={graphClassNames.row}>
        <a className={graphClassNames.item}><img className={graphClassNames.graphImage} src="./images/3.png"/></a>
        <a className={graphClassNames.item}><img className={graphClassNames.graphImage} src="./images/4.png"/></a>
    </div>
    </div>
  );
}

export default Graph;
