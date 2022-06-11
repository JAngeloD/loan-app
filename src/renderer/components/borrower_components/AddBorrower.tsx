import React, { useState } from "react"
import { addData, getNextID } from '../../utils/dbaccess_borrower'

import "../../css/popupform.css"

//Button
const AddBorrowerButton = () => {
    return (
        <button onClick={() => {document.getElementById("borrowerForm").style.display = "block"; }}>
            AddBorrower
        </button>
    )
}

//Form
const AddBorrowerForm = ({getData}) => {

    //Sets states and deefaults them to empty strings
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [loanamount, setLoanAmount] = useState('');
    const [frequency, setFrequency] = useState('bi'); //Select option defaults to "bi" but doesn't grab the value if the user didn't click the input.
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [loanmonths, setLoanMonths] = useState('');
    const [interest, setInterest] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = event => {
        
        event.preventDefault() // Disables submit functionality (We don't want it to refresh the page)

        //Set other attributes for pushing
        let potentialRevenue = (parseInt(loanamount) * (parseInt(interest) / 100)) * parseInt(loanmonths)
        let totalPayment = parseInt(loanamount) + potentialRevenue //Payment amount with interest
        let paymentPerPeriod = totalPayment / (((frequency == "bi") ? 2 : 1) * parseInt(loanmonths)) //total payment spread throughout all terms
        setDate(date.replace(/-/g, '\/')) //Used to avoid the 1 day off bug that JS has

        addData({
            id: getNextID(),
            firstname: firstname,
            lastname: lastname,
            loan_amount: parseInt(loanamount),
            frequency: frequency,
            email: email,
            phone: phone,
            total_loan_months: parseInt(loanmonths),
            months_left: parseInt(loanmonths),
            interest: parseInt(interest),
            starting_date: date,
            total_payment: totalPayment,
            potential_revenue:  potentialRevenue,
            next_payment_date: date,
            payment_per_period: parseFloat(paymentPerPeriod.toFixed(2)), //I have no idea why it considers it a string when adding toFixed (DOC)
            payment_dates: [],
            notes: ""
        })
        document.getElementById("borrowerForm").style.display = "none";
        getData();
        
        setFirstname('')
        setLastname('')
        setLoanAmount('')
        setFrequency('')
        setEmail('')
        setPhone('')
        setLoanMonths('')
        setInterest('')
        setDate('')
    }

    return (
        <form id="borrowerForm" onSubmit={handleSubmit}>
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

            <label>
                <span>Starting Date:</span>
                <input onChange={e => { setDate(e.target.value) }} type="date" required />
            </label>

            <button type="submit">
                Add Borrower
            </button>
        </form>
    );
}

export { AddBorrowerButton, AddBorrowerForm }