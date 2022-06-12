import React, { useState } from "react"
import { addData, getNextID } from '../../utils/dbaccess_borrower'
import { addMoneyOnHand, calculateData } from "../../utils/dbaccess_main"

import { fetch } from "../../utils/dbaccess_main"

import "../../css/popupform.css"
import Popup from "reactjs-popup"

//Button
const AddBorrower = ({ getData }) => {

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

        //Checks if the user has enough money to create a borrower
        if (loanamount > fetch("money_on_hand")) {
            alert("Cannot make this borrower, not enough money on hand!")
            document.getElementById("borrowerForm").style.display = "none"
            event.target.reset()
            return
        }

        //Set other attributes for pushing
        let loan = parseInt(loanamount)
        let potentialRevenue = (loan * (parseInt(interest) / 100)) * parseInt(loanmonths)
        let totalPayment = loan + potentialRevenue //Payment amount with interest
        let paymentPerPeriod = totalPayment / (((frequency == "bi") ? 2 : 1) * parseInt(loanmonths)) //total payment spread throughout all terms
        setDate(date.replace(/-/g, '\/')) //Used to avoid the 1 day off bug that JS has

        addData({
            id: getNextID(),
            firstname: firstname,
            lastname: lastname,
            loan_amount: loan,
            frequency: frequency,
            email: email,
            phone: phone,
            total_loan_months: parseInt(loanmonths),
            months_left: parseInt(loanmonths),
            interest: parseInt(interest),
            starting_date: date,
            total_payment: totalPayment,
            payment_left: loan,
            potential_revenue: potentialRevenue,
            next_payment_date: date,
            payment_per_period: parseFloat(paymentPerPeriod.toFixed(2)), //I have no idea why it considers it a string when adding toFixed (DOC)
            payment_dates: [],
            notes: ""
        })
        document.getElementById("borrowerForm").style.display = "none";

        addMoneyOnHand(loan * -1)
        getData();
        calculateData(); //Recalculates the values of the main.json file

        //Reset all states to their default
        setFirstname('')
        setLastname('')
        setLoanAmount('')
        setFrequency('bi')
        setEmail('')
        setPhone('')
        setLoanMonths('')
        setInterest('')
        setDate('')

        //Resets the form
        event.target.reset()
    }

    const overlayStyle = { background: 'rgba(0,0,0,0.5)' };

    return (
        <Popup trigger={
            <button>
                AddBorrower
            </button>
        }
        modal
        {...{overlayStyle}}
        >
            return (
            <form id="borrowerForm" onSubmit={handleSubmit}>
                <label>
                    <span>First Name:</span>
                    <input onChange={e => { setFirstname(e.target.value) }} defaultValue={firstname} required />
                </label>

                <label>
                    <span>Last Name:</span>
                    <input onChange={e => { setLastname(e.target.value) }} defaultValue={lastname} required />
                </label>

                <label>
                    <span>Email:</span>
                    <input onChange={e => { setEmail(e.target.value) }} type="email" defaultValue={email} required />
                </label>

                <label>
                    <span>Phone number:</span>
                    <input onChange={e => { setPhone(e.target.value) }} type="tel" defaultValue={phone} required />
                </label>

                <label>
                    <span>Loan Amount:</span>
                    <input onChange={e => { setLoanAmount(e.target.value) }} type="number" defaultValue={loanamount} required />
                </label>

                <label>
                    <span>Loan Months:</span>
                    <input onChange={e => { setLoanMonths(e.target.value) }} type="number" defaultValue={loanmonths} required />
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
                    <input onChange={e => { setInterest(e.target.value) }} type="number" defaultValue={interest} required />
                </label>

                <label>
                    <span>Starting Date:</span>
                    <input onChange={e => { setDate(e.target.value) }} type="date" defaultValue={date} required />
                </label>

                <button type="submit">
                    Add Borrower
                </button>
            </form>
            );
        </Popup>
    )
}

export { AddBorrower }