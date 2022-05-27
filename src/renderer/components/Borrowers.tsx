import React, { useMemo, useState } from 'react';
import DATA from './db.json';
import { useTable, useGlobalFilter } from 'react-table';
import { AddBorrower } from './AddBorrower';
import { RemoveBorrower } from './RemoveBorrower';
import { fetch } from '../utils/dbaccess'

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
    const [ click, setClick ] = useState(false)
    const [ id, setID] = useState(0);

    if(!click) {
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
                        {rows.map((row, index) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}
                                    onClick = {() => {
                                        setClick(true)
                                        setID(index)
                                    }}>
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
    } else {
        var borrower = JSON.stringify(fetch(id));
        return (
            <div className='borrower-container'>
                <span onClick={() => {
                    setClick(false)}}
                    className="backButton"
                >Go back</span>
                <p>{borrower}</p>
            </div>
        );
    }
}


