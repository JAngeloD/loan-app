import React, { useEffect } from 'react';

import { calculateData } from '../../utils/dbaccess_main';

export const DashboardHeaders = ({getDashboardData, dashboardData}) => {
   
    useEffect(() => {
        getDashboardData();
    }, [])

    if (dashboardData === undefined) {
        return <>Still loading...</>;
    }

    return (
        <>
            <div className="header1">
                <div className='infoHeader'>
                    <p className='label'>Money on hand</p>
                    <p className='amount'>{dashboardData.money_on_hand.toFixed(2)}</p>
                </div>
            </div>
            <div className="header2">
                <div className='infoHeader'>
                    <p className='label'>Money out for loan</p>
                    <p className='amount'>{dashboardData.money_out.toFixed(2)}</p>
                </div>
            </div>
            <div className="header3">
                <div className='infoHeader'>
                    <p className='label'>Revenue</p>
                    <p className='amount'>{dashboardData.revenue.toFixed(2)}</p>
                </div>
            </div>
            <div className="header4">
                <div className='infoHeader'>
                    <p className='label'>Expected Revenue</p>
                    <p className='amount'>{dashboardData.potential_revenue.toFixed(2)}</p>
                </div>
            </div>
        </>
    )
}