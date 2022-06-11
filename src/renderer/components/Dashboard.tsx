import React, { useState, useEffect } from 'react';
import { PayListTable } from './dashboard_components/PayListTable';
import { PAYLISTCOLUMNS } from './dashboard_components/PayListColumns';

import { DashboardHeaders } from './dashboard_components/DashboardHeaders';

import { DataMain } from '../utils/dbstructure';

import '../css/dashboard.css';


export const Dashboard = () => {

    const [borrowerData, setBorrowerData] = useState([]);
    const [dashboardData, setDashBoardData] = useState<DataMain>();

    const getBorrowerData = () => {
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
            setBorrowerData(myJson)
        });
    }
    const getDashboardData = () => {
        fetch('main.json'
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
            setDashBoardData(myJson)
        });
    }

    useEffect(() => {
        getDashboardData();
        getBorrowerData();
    }, [])

    return (
        <div className='dashboard'>
            <DashboardHeaders getDashboardData={getDashboardData} dashboardData={dashboardData}/>
            <PayListTable getData={getBorrowerData} resetDashboard={getDashboardData} columns={PAYLISTCOLUMNS} data={borrowerData} />
        </div>
    );
}


