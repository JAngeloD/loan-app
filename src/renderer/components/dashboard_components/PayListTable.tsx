import React from 'react';
import { useTable, useGlobalFilter, useSortBy } from 'react-table';
import { payNextDate, fetchData } from '../../utils/dbaccess_borrower';
import { calculateData } from '../../utils/dbaccess_main';

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

export const PayListTable = ({ getData, resetDashboard, columns, data }) => {

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
                    autoResetSortBy: false,
                    desc: false
                }
            ]
        }
    }, useGlobalFilter, useSortBy);

    const { globalFilter } = state;

    return (
        <div className='borrowers'>
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
                    {rows.map((row, index) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}
                                onClick={() => {
                                    window.confirm('Are you sure this borrower has paid? CANNOT BE REVERSED') ? payNextDate(row.index + 1, rows[index].cells[2].value) : console.log("cancelled")
                                    calculateData() 
                                    getData()
                                    resetDashboard()
                                }}
                                style={{
                                    backgroundColor: (hasPassed(row.cells[3].value)) ? 'red' : null,
                                    display: (fetchData(row.index, "months_left") !== 0) ? "table-row" : "none"
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
        </div>
    );
}