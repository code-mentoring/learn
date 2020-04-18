// import './table.scss';

// import { gql, useQuery } from '@apollo/react-hooks';
// import React from 'react';

// import { Loader } from '../Loader/Loader';
// import { Table, TableProps } from './Table';


// export interface QueryTableProps extends Omit<TableProps, 'data' | 'loading'> {
//   query: string;
//   queryKey: string;
// }

// export const QueryTable: React.FunctionComponent<QueryTableProps> = ({
//   query,
//   queryKey,
//   ...tableProps
// }) => {
//   const { data, loading, error } = useQuery(gql(query));
//   if (loading) return <Loader />;
//   // TODO: Add error comp
//   if (error) return <span>There was an error</span>;
//   return <Table
//     data={data![queryKey]}
//     loading={loading}
//     {...tableProps}
//   />;
// };
