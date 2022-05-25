import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Borrowers } from './components/Borrowers';
import { Navbar } from './components/Navbar';

import './css/base.css';

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Borrowers></Borrowers>
    </>
  )
}
  
ReactDOM.render(<App />, document.getElementById("app"));