import { classNamesFunction, IStyle } from 'office-ui-fabric-react';

type GraphClassNames = 'container' | 'item' | 'row' | 'graphImage';

type IGraphStyles = Record<GraphClassNames, IStyle>;

const getGraphStyles = (): IGraphStyles => {
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      // height: '280px',
    },
    item: {
      // flexGrow: 1,
      // opacity: 0.7,
      // borderRadius: "15px",
      overflow: "hidden",
      margin:"10px",
      selectors: {
        ':hover': {
          opacity: 0.7,
          // border: '1px solid #0000ff',
        },
      },
    },
    graphImage: {
      height: '210px',
    },
  };
};

const getGraphClassNames = classNamesFunction<{}, IGraphStyles>();

export const graphClassNames = getGraphClassNames(getGraphStyles);
