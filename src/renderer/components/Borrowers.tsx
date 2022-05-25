import * as React from 'react';
import { useMemo } from 'react';
import { useTable, useGlobalFilter } from 'react-table';
import { AddBorrower } from './AddBorrower';
import { RemoveBorrower } from './RemoveBorrower';
import DATA from './db.json';

import '../css/borrowers.css'

const COLUMNS = [
    {
        Header: 'ID',
        accessor: 'id'
    },
    {
        Header: 'Name',
        accessor: 'firstname'
    },
    {
        Header: 'Email',
        accessor: 'email'
    },
    {
        Header: 'Phone',
        accessor: 'phone'
    },
    {
        Header: 'Loan amount',
        accessor: 'loan_amount'
    }
];

const GlobalFilter = ({ filter, setFilter })  => {
    return (
        <span className='filter'>
            <input value={ filter || ''}
            onChange={e => setFilter(e.target.value)}
            placeholder='Search...'
            />
        </span>
    );
}

export const Borrowers = () => {

    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => DATA, []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter
    } = useTable({ columns, data} , useGlobalFilter);

    const { globalFilter } = state;

    return (
        <div className='borrower-container'>
            <div className='header'>List of borrowers</div>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <RemoveBorrower />
            <AddBorrower />
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroups) => (
                        <tr {...headerGroups.getHeaderGroupProps()}>
                            {headerGroups.headers.map((column) => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}