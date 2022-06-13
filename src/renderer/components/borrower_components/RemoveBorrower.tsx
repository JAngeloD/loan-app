import React, { useState } from "react"
import Popup from 'reactjs-popup';
import { deleteData } from "../../utils/dbaccess_borrower";

import "../../css/popupform.css"
import { calculateData } from "../../utils/dbaccess_main";


const RemoveBorrower = ({ getData }) => {

    const [removeId, setRemoveId] = useState(0);

    const handleSubmit = event => {
        event.preventDefault()

        if (removeId === 0) {
            alert("input a number above 0")
            event.target.reset()
            return
        }

        deleteData(removeId);
        getData(); //Re renders the borrower table

        event.target.reset()
        calculateData(true); //Recalculates all the values in the db 
    }
    
    const overlayStyle = { background: 'rgba(0,0,0,0.5)' };

    return (
        <Popup trigger={
            <button name="removeborrower">
                Remove Borrower
            </button>
            }
            modal
            {...{overlayStyle}}
        >
            <form onSubmit={handleSubmit}>
                <label>
                    <span>ID of borrower:</span>
                    <input name="id" onChange={e => { setRemoveId(parseInt(e.target.value)); console.log(e.target.value) }} defaultValue={0} required />
                </label>
                <button name="submitremove" type="submit">Remove Borrower</button>
            </form>
        </Popup>
    );
}


export { RemoveBorrower }