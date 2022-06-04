type Payment_Date = {
    date: string
    paid: string
    amount: string
}

type Borrower_Record = {
    id: string
    firstname: string
    lastname: string
    loan_amount: string
    frequency: string
    email: string
    phone: string
    total_loan_months: string
    interest: string
    payment_dates: Payment_Date[]
}

type Data = Borrower_Record[];

export {Payment_Date, Borrower_Record, Data}
