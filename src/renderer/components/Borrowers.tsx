import React, { useEffect, useState } from 'react';
import { AddBorrower } from './borrower_components/AddBorrower';
import { RemoveBorrower } from './borrower_components/RemoveBorrower';
import { fetchData, editData } from '../utils/dbaccess_borrower'
import { BorrowerTable } from './borrower_components/BorrowerTable'
import { PaymentTable } from './borrower_components/PaymentTable';
import { BORROWERCOLUMNS } from './borrower_components/BorrowerColumns';
import { PAYMENTCOLUMNS } from './borrower_components/PaymentColumns';

import '../css/borrowers.css'

export const Borrowers = () => {

    const [data, setData] = useState([]);
    const [payData, setPayData] = useState([]);

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

    //Fetches data from the borrower and fetches the person's payment dates
    const getPayData = (id: number) => {
        setPayData([...fetchData(id, 'payment_dates')])
    }

    useEffect(() => {
        getData()
    }, [])

    //States for advanaced views
    const [click, setClick] = useState(false)
    const [id, setID] = useState(0);

    //States for note
    const [note, setNote] = useState("")

    if (!click) {
        return (
            <div className='borrower-container'>
                <div className='header'>List of borrowers</div>
                <RemoveBorrower getData={getData} />
                <AddBorrower getData={getData} />

                <BorrowerTable setClick={setClick} setID={setID} columns={BORROWERCOLUMNS} data={data} />
            </div>
        );
    } else {
        return (
            <div className='borrower-container'>
                <span onClick={() => { setClick(false); setNote("") }} className="backButton">Go back</span>
                <div className='header'>Detailed view of {fetchData(id, "firstname")}</div>
                <div className='userinfo-low'>
                    <p><span>Name:</span> {fetchData(id, "firstname")}</p>
                    <p><span>Email:</span> {fetchData(id, "email")}</p>
                    <p><span>Phone:</span> {fetchData(id, "phone")}</p>
                    <br />
                    <p><span>Personal loan amount:</span> ${fetchData(id, "loan_amount")}</p>
                    <p><span>Total terms:</span> (months): {fetchData(id, "total_loan_months")}</p>
                    <p><span>Frequency:</span> {fetchData(id, "frequency")}</p>
                    <p><span>Interest:</span> {fetchData(id, "interest")}%</p>
                </div>
                <PaymentTable id={id} getData={getPayData} data={payData} columns={PAYMENTCOLUMNS} />
                <div className='notes'>
                    <textarea onChange={e => { setNote(e.target.value) }}>
                        {fetchData(id, "notes")}
                    </textarea>
                    <button onClick={() => {
                        editData(id + 1, "notes", note) //offset the offset
                    }}
                    >Save Note</button>
                </div>
            </div>
        );
    }
}


