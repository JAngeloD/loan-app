import React, { useState } from 'react';
import { AddBorrower } from './borrower_components/AddBorrower';
import { RemoveBorrower } from './borrower_components/RemoveBorrower';
import { fetch } from '../utils/dbaccess'
import { BorrowerTable } from './borrower_components/BorrowerTable'
import { PaymentTable } from './borrower_components/PaymentTable'; 

import '../css/borrowers.css'


export const Borrowers = () => {

    const [ click, setClick ] = useState(false)
    const [ id, setID ] = useState(0);

    if(!click) {
        return (
            <div className='borrower-container'>
                <div className='header'>List of borrowers</div>
                <RemoveBorrower />
                <AddBorrower />
                <BorrowerTable setClick={setClick} setID={setID}/>
            </div>
        );
    } else {
        return (
            <div className='borrower-container'>
                <span onClick={() => {
                    setClick(false)}}
                    className="backButton"
                >Go back</span>
                <div className='header'>Detailed view of {fetch(id, "firstname")}</div>
                <div className='userinfo-low'>
                    <p><span>Name:</span> {fetch(id, "firstname")}</p>
                    <p><span>Email:</span> {fetch(id, "email")}</p>
                    <p><span>Phone:</span> {fetch(id, "phone")}</p>
                    <br/>
                    <p><span>Personal loan amount:</span> ${fetch(id, "loan_amount")}</p>
                    <p><span>Total terms:</span> (months): {fetch(id, "total_loan_months")}</p>
                    <p><span>Frequency:</span> {fetch(id, "frequency")}</p>
                    <p><span>Interest:</span> {fetch(id, "interest")}%</p>
                </div>
                <PaymentTable id={id} />
            </div> 
        );
    }
}


