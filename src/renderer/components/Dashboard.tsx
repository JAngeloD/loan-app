import React, { useState } from 'react';
import { fetchData } from '../utils/dbaccess_borrower'

import '../css/dashboard.css';

export const Dashboard = () => {

    return (
        <div className='dashboard'>
            <div className="header1"> Money on hand </div>
            <div className="header2"> Money out for loan </div>
            <div className="header3"> Revnue </div>
            <div className="header4"> Expected Revenue </div>
            <div className="borrowers"> Borrowers </div>
        </div>
    );
}


