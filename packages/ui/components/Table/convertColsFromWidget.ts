// import { Column } from 'react-table';
// import { dotObjString } from '../../lib/dotObjString';

// export const convertColsFromWidget = (cols: Column[]) => cols.map(c => {
//   // @ts-ignore Convert from widget to capitalize
//   if (c.cell) c.Cell = c.cell;
//   // @ts-ignore Convert from widget to capitalize
//   if (c.header) c.Header = c.header;

//   if (typeof c.Cell === 'string') {
//     const cellString = c.Cell;
//     c.Cell = ({ cell }) => dotObjString(cellString as string, cell.row.original);
//   }
//   return c;
// });
