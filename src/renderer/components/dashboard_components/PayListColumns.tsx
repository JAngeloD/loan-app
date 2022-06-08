import { format } from 'date-fns'

export const PAYLISTCOLUMNS = [
    {
        Header: 'ID',
        accessor: 'id'
    },
    {
        Header: 'Name',
        accessor: 'firstname'
    },
    {
        Header: 'Amount',
        accessor: 'payment_per_period'
    },
    {
        Header: 'Date Due:',
        accessor: 'next_payment_date',
        Cell: ({value}) => {return format(new Date(value), 'dd/MM/yyyy')}
    }
];