import React, { useState } from 'react';
import * as ReactDOM from 'react-dom';
import { Borrowers } from './components/Borrowers';
import { Dashboard } from './components/dashboard_components/Dashboard';
import { Navbar } from './components/Navbar';

import './css/base.css';

function App() {

  //Defaults to dashboard 
  const [ navChoice, setNavChoice ] = useState("dashboard");

  if(navChoice == "dashboard") {
    return (
      <>
        <Navbar setNavChoice={setNavChoice}></Navbar>
        <Dashboard></Dashboard>
      </>
    )
  }
  else if (navChoice == "borrowers") {
    return (
      <>
        <Navbar setNavChoice={setNavChoice}></Navbar>
        <Borrowers></Borrowers>
      </>
    )
  }
}
  
ReactDOM.render(<App />, document.getElementById("app"));