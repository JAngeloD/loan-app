import React, { useState } from "react"
import { addData } from '../../utils/dbaccess_borrower'

import "../../css/popupform.css"

const AddBorrowerButton = () => {
    return (
        <button onClick={() => {document.getElementById("borrowerForm").style.display = "flex";}}>
            AddBorrower
        </button>
    )
}

const AddBorrowerForm = () => {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [loanamount, setLoanAmount] = useState('');
    const [frequency, setFrequency] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [loanmonths, setLoanMonths] = useState('');
    const [interest, setInterest] = useState('');

    return (
        <form id="borrowerForm">
            <label>First Name:</label>
            <input onChange={e => {setFirstname(e.target.value)}} required />
            <br/>
            <label>Last Name:</label>
            <input onChange={e => {setLastname(e.target.value)}} required/>
            <br/>
            <label>Email:</label>
            <input onChange={e => {setEmail(e.target.value)}} type="email" required/>
            <br/>
            <label>Phone number:</label>
            <input onChange={e => {setPhone(e.target.value)}} type="tel" required/>
            <br/>
            <label>Loan Amount:</label>
            <input onChange={e => {setLoanAmount(e.target.value)}} required/>
            <br/>
            <label>Loan Months:</label>
            <input onChange={e => {setLoanMonths(e.target.value)}} type="number" required/>
            <br/>
            <label>Frequency:</label>
            <select onChange={e => {setFrequency(e.target.value)}}>
                <option value="bi">Bi-Weekly</option>
                <option value="monthly">Monthly</option>
            </select>
            <br/>
            <label>Interest:</label>
            <input onChange={e => {setInterest(e.target.value)}} type="number" required/>
            <br/>
            <button onClick={() =>
                {
                    console.log(firstname)
                    console.log(lastname)
                    console.log(email)
                    console.log(phone)
                    console.log(loanamount)
                    console.log(frequency)
                    console.log(loanmonths)
                    console.log(interest)
                }
            }/>
        </form>
    );
}

export { AddBorrowerButton, AddBorrowerForm }