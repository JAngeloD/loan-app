import React from "react"
import { deleteData, editData } from "../../utils/dbaccess_borrower";

export const RemoveBorrower = ({getData}) => {
    return (
        <button onClick={ () => {
            {editData(1, "firstname", "TestEdit")}
            /* {deleteData(0)} */
            {getData()}
        }}
        >
            Remove Borrower
        </button>
    );
}