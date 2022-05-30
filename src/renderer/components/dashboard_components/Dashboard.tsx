import React, { useState } from 'react';
import { BorrowerTable } from '../borrower_components/BorrowerTable';
import { fetchData } from '../../utils/dbaccess_borrower'

import '../../css/dashboard.css';

export const Dashboard = () => {

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
        </div>
    );
}


