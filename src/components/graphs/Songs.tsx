import * as React from 'react';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  SelectionMode,
  IColumn,
} from 'office-ui-fabric-react/lib/DetailsList';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';

const classNames = mergeStyleSets({
  fileIconHeaderIcon: {
    padding: 0,
    fontSize: '16px',
  },
  fileIconCell: {
    textAlign: 'center',
    selectors: {
      '&:before': {
        content: '.',
        display: 'inline-block',
        verticalAlign: 'middle',
        height: '100%',
        width: '0px',
        visibility: 'hidden',
      },
    },
  },
  fileIconImg: {
    verticalAlign: 'middle',
    maxHeight: '16px',
    maxWidth: '16px',
  },
  controlWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  exampleToggle: {
    display: 'inline-block',
    marginBottom: '10px',
    marginRight: '30px',
  },
  selectionDetails: {
    marginBottom: '20px',
  },
  detailsList: {
    height: '900px',
  },
});

export interface IDetailsListDocumentsExampleState {
  columns: IColumn[];
  items: IDocument[];
  selectionDetails?: string;
  isModalSelection: boolean;
  isCompactMode: boolean;
  announcedMessage?: string;
}

export interface IDocument {
  key: string;
  name: string;
  value: string;
  modifiedBy: string;
  duration: string;
  artists: string;
  album: string;
}

export class DetailsListDocumentsExample extends React.PureComponent<
  { songList: any },
  IDetailsListDocumentsExampleState
> {
  private _selection: Selection;
  private _allItems: IDocument[];
  private columns: IColumn[];

  constructor(props: { songList: any }) {
    super(props);

    this._allItems = _generateDocuments(props);

    this.columns = [
      //   {
      //     key: 'column1',
      //     name: 'File Type',
      //     className: classNames.fileIconCell,
      //     iconClassName: classNames.fileIconHeaderIcon,
      //     ariaLabel: 'Column operations for File type, Press to sort on File type',
      //     iconName: 'HeartFill',
      //     isIconOnly: true,
      //     fieldName: 'name',
      //     minWidth: 16,
      //     maxWidth: 16,
      //     // onColumnClick: this._onColumnClick,
      //     onRender: (item: IDocument) => {
      //       return <img src={item.iconName} className={classNames.fileIconImg} alt={item.fileType + ' file icon'} />;
      //     },
      //   },
      {
        key: 'column2',
        name: 'Title',
        fieldName: 'name',
        minWidth: 350,
        maxWidth: 350,
        isRowHeader: false,
        isResizable: false,
        // isSorted: true,
        // isSortedDescending: false,
        // sortAscendingAriaLabel: 'Sorted A to Z',
        // sortDescendingAriaLabel: 'Sorted Z to A',
        // onColumnClick: this._onColumnClick,
        data: 'string',
        isPadded: true,
      },
      {
        key: 'column4',
        name: 'Artist',
        fieldName: 'artists',
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        isCollapsible: true,
        data: 'string',
        // onColumnClick: this._onColumnClick,
        onRender: (item: IDocument) => {
          return <span>{item.artists}</span>;
        },
        isPadded: true,
      },
      {
        key: 'column5',
        name: 'Album',
        fieldName: 'album',
        minWidth: 70,
        maxWidth: 90,
        isResizable: false,
        isCollapsible: false,
        data: 'number',
        // onColumnClick: this._onColumnClick,
        onRender: (item: IDocument) => {
          return <span>{item.album}</span>;
        },
      },
      {
        key: 'column6',
        name: 'Duration',
        fieldName: 'duration',
        minWidth: 30,
        maxWidth: 30,
        isResizable: false,
        isCollapsible: false,
        data: 'number',
        // onColumnClick: this._onColumnClick,
        onRender: (item: IDocument) => {
          return <span>{item.duration}</span>;
        },
      },
    ];

    this._selection = new Selection({
      onSelectionChanged: () => {
        this.setState({});
      },
    });

    // this.state = {
    //   items: this._allItems,
    //   columns: columns,
    //   isModalSelection: false,
    //   isCompactMode: false,
    //   announcedMessage: undefined,
    // };
  }

  public render() {
    // const { columns, isCompactMode} = this.state;

    return (
      //   <Fabric>
      // {(
      <DetailsList
        className={classNames.detailsList}
        // styles={{contentWrapper:{
        //     backgroundColor:"green"
        // }}}
        items={this._allItems}
        compact={false}
        columns={this.columns}
        selectionMode={SelectionMode.none}
        getKey={this._getKey}
        setKey="none"
        layoutMode={DetailsListLayoutMode.justified}
        isHeaderVisible={true}
      />
      // )}
      //   </Fabric>
    );
  }

  public componentDidUpdate(
    previousProps: any,
    previousState: IDetailsListDocumentsExampleState
  ) {
    if (
      previousState.isModalSelection !== this.state.isModalSelection &&
      !this.state.isModalSelection
    ) {
      this._selection.setAllSelected(false);
    }
  }

  private _getKey(item: any, index?: number): string {
    return item.key;
  }
}

function _generateDocuments(props: any) {
  const items: IDocument[] = [];
  props.songList.forEach((item: any) => {
    items.push({
      key: item.name,
      name: item.name,
      value: item.name,
      modifiedBy: 'gopal',
      duration: String((item.duration / 60000).toFixed(2)),
      artists: item.artists,
      album: item.album,
    });

    // return null;
  });
  return items;
}
