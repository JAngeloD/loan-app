import React from "react"
import { addData } from '../../utils/dbaccess_borrower'

export const AddBorrower = () => {
    
    return (
        <button onClick={() => {
            {addData()}
            {}
        }}>
            AddBorrower
        </button>
    )
}