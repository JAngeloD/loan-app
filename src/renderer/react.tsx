import React, { useState } from 'react';
import * as ReactDOM from 'react-dom';
import { Borrowers } from './components/Borrowers';
import { Dashboard } from './components/Dashboard';
import { Navbar } from './components/Navbar';

import { tryBackup } from './utils/dbaccess_main';

import './css/base.css';

function App() {

  //Defaults to dashboard 
  const [ navChoice, setNavChoice ] = useState("dashboard");

  tryBackup();

  if(navChoice == "dashboard") {
    return (
      <>
        <Navbar setNavChoice={setNavChoice}></Navbar>
        <Dashboard navChoice={navChoice}></Dashboard>
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