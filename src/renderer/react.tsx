import React, { useState } from 'react';
import * as ReactDOM from 'react-dom';
import { Borrowers } from './components/Borrowers';
import { Navbar } from './components/Navbar';

import './css/base.css';

function App() {

  const [ navChoice, setNavChoice ] = useState("dashboard");

  if(navChoice == "dashboard") {
    return (
      <>
        <Navbar setNavChoice={setNavChoice}></Navbar>
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