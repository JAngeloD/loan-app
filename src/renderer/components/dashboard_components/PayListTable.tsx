import React from 'react';
import { useTable, useGlobalFilter, useSortBy } from 'react-table';
import { payNextDate } from '../../utils/dbaccess_borrower';

const GlobalFilter = ({ filter, setFilter }) => {
    return (
        <span className='filter'>
            <input value={filter || ''}
                onChange={e => setFilter(e.target.value)}
                placeholder='Search...'
            />
        </span>
    );
}

//returns true if the date passed is today or in the past
const hasPassed = (targetDate: Date) => {
    const today = new Date()
    targetDate = new Date(targetDate)
    if (targetDate.setHours(0, 0, 0, 0) <= today.setHours(0, 0, 0, 0)) {
        return true;
    }

    return false;
}

export const PayListTable = ({ getData, columns, data }) => {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter
    } = useTable({
        columns, data, initialState: {
            sortBy: [
                {
                    id: 'next_payment_date',
                    desc: false
                }
            ]
        }
    }, useGlobalFilter, useSortBy);
    const { globalFilter } = state;

    return (
        <>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <table {...getTableProps()} className="borrower-table">
                <thead>
                    {headerGroups.map((headerGroups) => (
                        <tr {...headerGroups.getHeaderGroupProps()}>
                            {headerGroups.headers.map((column) => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}
                                onClick={() => {
                                    payNextDate(row.index + 1)
                                    getData
                                }}
                                style={{
                                    backgroundColor:(hasPassed(row.cells[3].value)) ? 'red' : null
                                }}
                                >
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