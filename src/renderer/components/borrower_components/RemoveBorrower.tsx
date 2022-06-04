import React from "react"
import { deleteData, editData } from "../../utils/dbaccess_borrower";

const RemoveBorrower = () => {
    return (
        <button onClick={ () => {document.getElementById("removeForm").style.display = "block"; }}>
            Remove Borrower
        </button>
    );
}

const RemoveBorrowerForm = ({getData}) => {
    return (
        <form>

        </form>
    );
}


export {RemoveBorrower, RemoveBorrowerForm}