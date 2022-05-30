import React from "react"

export const RemoveBorrower = ({getData}) => {
    return (
        <button onClick={getData}
        >
            Remove Borrower
        </button>
    );
}