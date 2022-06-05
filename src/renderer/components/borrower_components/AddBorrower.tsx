import React, { useState } from "react"
import { addData, getNextID } from '../../utils/dbaccess_borrower'

import "../../css/popupform.css"

const AddBorrowerButton = () => {
    return (
        <button onClick={() => {document.getElementById("borrowerForm").style.display = "block"; }}>
            AddBorrower
        </button>
    )
}

const AddBorrowerForm = ({getData}) => {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [loanamount, setLoanAmount] = useState('');
    const [frequency, setFrequency] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [loanmonths, setLoanMonths] = useState('');
    const [interest, setInterest] = useState('');

    const resetStates = () => {
        setFirstname('')
        setLastname('')
        setLoanAmount('')
        setFrequency('')
        setEmail('')
        setPhone('')
        setLoanMonths('')
        setInterest('')
    }

    return (
        <form id="borrowerForm">
            <label>
                <span>First Name:</span>
                <input onChange={e => { setFirstname(e.target.value) }} required />
            </label>

            <label>
                <span>Last Name:</span>
                <input onChange={e => { setLastname(e.target.value) }} required />
            </label>

            <label>
                <span>Email:</span>
                <input onChange={e => { setEmail(e.target.value) }} type="email" required />
            </label>

            <label>
                <span>Phone number:</span>
                <input onChange={e => { setPhone(e.target.value) }} type="tel" required />
            </label>

            <label>
                <span>Loan Amount:</span>
                <input onChange={e => { setLoanAmount(e.target.value) }} type="number" required />
            </label>

            <label>
                <span>Loan Months:</span>
                <input onChange={e => { setLoanMonths(e.target.value) }} type="number" required />
            </label>

            <label>
                <span>Frequency:</span>
                <select onChange={e => { setFrequency(e.target.value) }}>
                    <option value="bi">Bi-Weekly</option>
                    <option value="monthly">Monthly</option>
                </select>
            </label>

            <label>
                <span>Interest:</span>
                <input onChange={e => { setInterest(e.target.value) }} type="number" required />
            </label>

            <button onClick={() => {
                event.preventDefault()
                addData({
                    id: getNextID(),
                    firstname: firstname,
                    lastname: lastname,
                    loan_amount: loanamount,
                    frequency: frequency,
                    email: email,
                    phone: phone,
                    total_loan_months: loanmonths,
                    interest: interest,
                    payment_dates: []
                })
                document.getElementById("borrowerForm").style.display = "none";
                resetStates();
                getData();
            }}>
                Add Borrower
            </button>
        </form>
    );
}

export { AddBorrowerButton, AddBorrowerForm }