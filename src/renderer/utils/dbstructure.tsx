/*
NOTE: 
Dates are a string because if they are a date type, interacting with DBLow and pushing them into the db
randomizes their month for some reason.

*/

type Payment_Date = {
    date: string
    paid: string
    amount: number
}

type Borrower_Record = {
    id: number
    firstname: string
    lastname: string
    loan_amount: number
    frequency: string
    email: string
    phone: string
    total_loan_months: number
    interest: number
    starting_date: string
    total_payment: number
    payment_per_period: number
    next_payment_date: string
    payment_dates: Payment_Date[]
    notes: string
}

type Data = Borrower_Record[];

export {Payment_Date, Borrower_Record, Data}
