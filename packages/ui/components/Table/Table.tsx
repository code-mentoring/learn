// import '../../types/react-table';
// import './table.scss';

// import classnames from 'classnames';
// import React, { useEffect, useMemo } from 'react';
// import { Column, Row, useExpanded, useRowSelect, useSortBy, useTable, UseTableOptions as RTProps } from 'react-table';

// import { Icon } from '../Icon/Icon';
// import { Checkbox } from '../Checkbox/Checkbox';
// import { Loader } from '../Loader/Loader';
// import { convertColsFromWidget } from './convertColsFromWidget';

// export type TableColumn = Column & {
//   className?: string;
//   ellipsis?: boolean;
//   maxWidth?: string | number;
//   minWidth?: string | number;
//   canSort?: boolean;
// }

// export interface TableProps extends Partial<RTProps<any>> {
//   selectable?: boolean;
//   onSelect?: (values: any[]) => void;
//   onRowClick?: (data: any) => void;
//   loading?: boolean;
//   small?: boolean;
//   columns: TableColumn[]
// }

// export interface TableRowProps {
//   row: Row;
//   prepareRow: (row: any) => void;
//   selected: boolean;
//   onClick?: TableProps['onRowClick'];
// }


// const columnSelectable: ColumnInstance = {
//   id: 'selection',
//   width: 30,
//   Header: ({ getToggleAllRowsSelectedProps }) =>
//     <Checkbox {...getToggleAllRowsSelectedProps()} />
//   ,
//   Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
//   className: 'checkbox'

// };

// export const Table: React.FunctionComponent<TableProps> = ({
//   data = [],
//   columns = [],
//   selectable,
//   onSelect,
//   loading,
//   onRowClick,
//   small
// }) => {

//   const { getTableProps, headerGroups, rows, prepareRow, state } = useTable({
//     // @ts-ignore
//     data,
//     columns: useMemo(() => {
//       if (selectable) columns.unshift(columnSelectable);
//       return convertColsFromWidget(columns);
//     }, [columns])
//   }, useSortBy, useExpanded, useRowSelect);


//   useEffect(() => {
//     if (onSelect) onSelect(state.selectedRowPaths.map((i: string) => rows[parseInt(i)].original));
//   }, [state]);


//   const gridTemplateColumns = useMemo(
//     () => (headerGroups[0]?.headers || [])
//       .map(({ maxWidth, minWidth, width }: any) => {
//         if (minWidth === 0 && width === 150 && maxWidth === 9007199254740991) return '1fr';
//         if (width) {
//           if (typeof width === 'string') return width;
//           if (typeof width === 'number') return `${width}px`;
//         }
//         const min = typeof minWidth === 'string' ? minWidth : minWidth ? `${minWidth}px` : 'auto';
//         const max = typeof maxWidth === 'string' ? maxWidth : maxWidth ? `${maxWidth}px` : 'auto';
//         return `minmax(${min}, ${max})`;
//       }).join('\n'),
//     [headerGroups
//       // headerGroups[0].headers
//     ]
//   );


//   return <div
//     {...getTableProps()}
//     className={classnames('table', { small })}
//     style={{ gridTemplateColumns }}
//   >

//     {headerGroups.map((hg: any) => <>
//       {hg.headers.map((column: any, i: number) =>
//         <div
//           {...column.getHeaderProps(column.getSortByToggleProps())}
//           className={classnames('th', column.className, {
//             last: i === hg.headers.length - 1,
//             sortable: column.canSort
//           })}
//           key={i}
//         >
//           <span>{column.render('Header')}</span>

//           {!column.canSort ? null : column.isSorted
//             ? <Icon
//               size={'small'}
//               icon="chevronDown"
//               className={column.isSortedDesc ? 'active' : 'flip'}
//             />
//             : <Icon
//               size={'small'}
//               icon="chevronUp"
//             />
//           }
//         </div>
//       )}
//     </>)}

//     {loading
//       ? <Loader />
//       : rows.map((row: Row, i: number) =>
//         <TR
//           key={i}
//           row={row}
//           prepareRow={prepareRow}
//           selected={row.isSelected}
//           onClick={onRowClick}
//         />
//       )
//     }

//   </div>;
// };


// export const TR: React.FunctionComponent<TableRowProps> = React.memo(({
//   row,
//   prepareRow,
//   onClick
// }) => {
//   prepareRow(row);
//   return <>
//     {row.cells.map((cell, i) =>
//       // if (cell.column.skip && cell.column.skip(cell)) return null;
//       <div
//         {...cell.getCellProps()}
//         className={classnames('td', cell.column.className, {
//           ellipsis: cell.column.ellipsis,
//           clickable: Boolean(onClick)
//         })}
//         onClick={() => onClick?.(cell.row.original)}
//         key={i}
//       >
//         <div> {cell.render('Cell')} </div>
//       </div>
//     )}
//   </>;
// });
