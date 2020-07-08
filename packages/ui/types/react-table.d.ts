// eslint-disable-next-line
import * as ReactTable from 'react-table';

declare module 'react-table' {
  // export interface Column  ReactTable.Column & {
  //   className?: string;
  //   ellipsis?: boolean;
  //   maxWidth?: string | number;
  //   minWidth?: string | number;
  //   canSort?: boolean;
  // }
  export interface TableInstance {
    getToggleAllRowsSelectedProps(): any;
  }
  export interface Row {
    getToggleRowSelectedProps(): any;
    isSelected: boolean;
  }
  export interface TableState {
    selectedRowPaths: any[];
  }
}
