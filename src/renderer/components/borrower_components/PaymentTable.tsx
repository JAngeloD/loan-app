import React, { useMemo } from 'react';
import { PAYMENTCOLUMNS } from './PaymentColumns';
import { useTable} from 'react-table';
import { fetch } from '../../utils/dbaccess';

export const PaymentTable = ({id}) => {

    const DATA = fetch(id, 'payment_dates')
    
    const columns = useMemo(() => PAYMENTCOLUMNS, []);
    const data = useMemo(() => DATA, []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data});

    return (
        <>
            <table {...getTableProps()} className="payment-table">
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
                                <tr {...row.getRowProps()}>
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

