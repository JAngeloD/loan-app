import React, { useMemo, useState } from 'react';
import DATA from '../db.json';
import { BORROWERCOLUMNS } from './BorrowerColumns';
import { useTable, useGlobalFilter } from 'react-table';

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

export const BorrowerTable = ({setClick, setID}) => {
    
    const columns = useMemo(() => BORROWERCOLUMNS, []);
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
        <>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <table {...getTableProps()} className="borrower-table">
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
                        {rows.map((row, index) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}
                                    onClick = {() => {
                                        {setClick(true)}
                                        {setID(index)}
                                    }}>
                                    {row.cells.map((cell) => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                                    })}
                                </tr> 
                            );
                        })}
                    </tbody>
                </table>
        </>
    );
}

