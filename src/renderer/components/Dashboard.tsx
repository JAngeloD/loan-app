import React, { useState } from 'react';
import { fetch } from '../utils/dbaccess'

import '../css/dashboard.css';

export const Dashboard = () => {

    return (
        <div className='dashboard'>
            <div > Money on hand </div>
            <div > Money out for loan </div>
            <div > Revnue </div>
            <div > Expected Revenue </div>
            <div > Borrowers </div>
        </div>
    );
}


