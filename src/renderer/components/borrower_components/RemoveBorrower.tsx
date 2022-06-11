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

    const handleSubmit = event => {
        event.preventDefault()

        if(removeId === 0) {
            alert("input a number above 0")
            document.getElementById("removeForm").style.display = "none";
            event.target.reset()
            return
        }

        deleteData(removeId);
        getData();
        document.getElementById("removeForm").style.display = "none";

        event.target.reset()
        calculateData(true); //Recalculates all the values in the db 
    }

    return (
        <form id="removeForm" onSubmit={handleSubmit}>
            <label>
                <span>ID of borrower:</span>
                <input onChange={e => {setRemoveId(parseInt(e.target.value))}} required />
            </label>
            <button type="submit">Remove Borrower</button>
        </form>
    );
}


export {RemoveBorrower, RemoveBorrowerForm}