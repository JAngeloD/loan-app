/*
NOTE: 
Dates are a string because if they are a date type, interacting with DBLow and pushing them into the db
randomizes their month for some reason.

*/

//Data structure for borrower.json
type Payment_Date = {
    date: string
    paid: string
    amount: number
}

type Borrower_Record = {
    id: number
    firstname: string
    lastname: string
    address: string
    loan_amount: number
    frequency: string
    email: string
    phone: string
    total_loan_months: number
    months_left: number
    interest: number
    starting_date: string
    total_payment: number
    payment_left: number
    potential_revenue: number
    payment_per_period: number
    next_payment_date: string
    payment_dates: Payment_Date[]
    notes: string
}

type Data = Borrower_Record[];

//Data structure from maindata.json
type DataMain = {
    version: number,
    last_backup: string,
    money_on_hand: number,
    money_out: number,
    revenue: number,
    potential_revenue: number
}

export {Payment_Date, Borrower_Record, Data, DataMain}
