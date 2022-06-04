type Payment_Date = {
    month: string
    paid: number
    amount: number
}

type Borrower_Record = {
    id: number
    firstname: string
    lastname: string
    loanamount: number
    frequency: string
    email: string
    phone: string
    totalterms: number
    interest: number
    paymentdate: Date[]
}

type Data = Borrower_Record[];

export {Payment_Date, Borrower_Record, Data}
