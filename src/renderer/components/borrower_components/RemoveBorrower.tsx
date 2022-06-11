import React, {useState} from "react"
import { deleteData } from "../../utils/dbaccess_borrower";

import "../../css/popupform.css"
import { calculateData } from "../../utils/dbaccess_main";

const RemoveBorrower = () => {
    return (
        <button onClick={() => {document.getElementById("removeForm").style.display = "block";}}>
            Remove Borrower
        </button>
    );
}

const RemoveBorrowerForm = ({getData}) => {

    const [removeId, setRemoveId] = useState(0);

    return (
        <form id="removeForm">
            <label>
                <span>ID of borrower:</span>
                <input onChange={e => {setRemoveId(parseInt(e.target.value))}} required />
            </label>
            <button onClick={() => {
                event.preventDefault()
                deleteData(removeId);
                getData();
                document.getElementById("removeForm").style.display = "none";
                calculateData();
            }}>
            Remove Borrower
            </button>
        </form>
    );
}


export {RemoveBorrower, RemoveBorrowerForm}