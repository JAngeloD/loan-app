import React from 'react';
import { useTable, useGlobalFilter, useSortBy } from 'react-table';
import Popup from 'reactjs-popup';
import { fetchData, payNextDate } from '../../utils/dbaccess_borrower';
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
        <div className='borrowers' >
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
                            <Popup
                                trigger={
                                    <tr {...row.getRowProps()}
                                        style={{
                                            backgroundColor: (hasPassed(row.cells[3].value)) ? 'rgba(255, 32, 21, 0.4)' : null,
                                            display: (fetchData(index, "months_left") !== 0) ? "table-row" : 'none'
                                        }}
                                    >
                                        {row.cells.map((cell) => {
                                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                                        })}
                                    </tr>
                                }
                                modal
                                {...{overlayStyle: {background: 'rgba(0,0,0,0.5)'}}}
                            >
                                <div id="confirmation">
                                    Are you sure that this borrower has paid?
                                    <button onClick={() => {
                                        payNextDate(row.index + 1, rows[index].cells[2].value)
                                        calculateData()
                                        getData()
                                        resetDashboard()
                                    }}>Yes</button>
                                </div>
                            </Popup>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}