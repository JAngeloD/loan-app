import * as React from 'react';
import '../css/navbar.css';

export const Navbar = ({setNavChoice}) => {
    return (
        <div className='nav-bar'>
            <h1>Loan App</h1>
            <div onClick={() => {
                setNavChoice("dashboard")
            }}
            >Dashboard</div>
            <div onClick={() => {
                setNavChoice("borrowers")
            }}>Borrowers</div>
        </div>
    );
}