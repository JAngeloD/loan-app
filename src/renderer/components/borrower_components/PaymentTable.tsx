import React, { useMemo, useState, useEffect } from 'react';
import { useTable } from 'react-table';
import { fetchData, editData } from '../../utils/dbaccess_borrower';
import Popup from 'reactjs-popup';


export const PaymentTable = ({ id, getData, data, columns }) => {

    useEffect(() => {
        getData(id)
    }, [])

    //State hook for inputting new values to the payment dates of a borrower
    const [newVal, setNewVal] = useState('')

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    //Style hooks for Pop up elements
    const contentStyle= {   
                            background: 'white', 
                            color: 'black',
                            margin: '5%'   
                        };
    const overlayStyle = { background: 'rgba(0,0,0,0.5)' };
    const arrowStyle = { color: '#000' }; // style for an svg element

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
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <Popup
                                            //Edits the borrower's payment detail on a specific cell
                                            //cell.row.id = row index
                                            //id = borrower index (NOT ID, INDEX, THERE IS A DIFFERENCE)
                                            trigger={
                                                <td {...cell.getCellProps()}>
                                                    {cell.render('Cell')}
                                                </td>
                                            }
                                            modal
                                            {...{contentStyle, overlayStyle, arrowStyle}}
                                        >
                                            <div>
                                                <label>Input new value</label>
                                                <input onChange={e => {setNewVal(e.target.value)}}/>
                                                <button onClick={() =>{
                                                    if(newVal !== '') {
                                                        editData(id + 1, "payment_dates", newVal, cell.row.id, cell.column.id)
                                                    }
                                                    setNewVal('')
                                                    getData(id)
                                                }}>
                                                    Input
                                                </button>
                                            </div>
                                        </Popup>
                                    )
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

