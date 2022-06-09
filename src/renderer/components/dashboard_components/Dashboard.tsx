import React, { useState, useEffect } from 'react';
import { PayListTable } from './PayListTable';
import { PAYLISTCOLUMNS } from './PayListColumns';

import '../../css/dashboard.css';

export const Dashboard = () => {

    const [data, setData] = useState([]);

    const getData = () => {
        fetch('borrower.json'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            setData(myJson)
        });
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className='dashboard'>
            <div className="header1">
                <div className='infoHeader'>
                    <p className='label'>Money on hand</p>
                    <p className='amount'>$1000</p>
                </div>
            </div>
            <div className="header2">
                <div className='infoHeader'>
                    <p className='label'>Money out for loan</p>
                    <p className='amount'>$1000</p>
                </div>
            </div>
            <div className="header3">
                <div className='infoHeader'>
                    <p className='label'>Revenue</p>
                    <p className='amount'>$1000</p>
                </div>
            </div>
            <div className="header4">
                <div className='infoHeader'>
                    <p className='label'>Expected Revenue</p>
                    <p className='amount'>$1000</p>
                </div>
            </div>
            <div className="borrowers">
            </div>

            <PayListTable getData={getData()} columns={PAYLISTCOLUMNS} data={data} />
        </div>
    );
}


