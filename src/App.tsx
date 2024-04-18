import React from 'react';
import logo from './logo.svg';
import './App.css';
import { HashRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


import Spot from './Spot';

function App() {
  return (
    <HashRouter>
    <div className="App">
      <Spot />
    </div>
    </HashRouter>
  );
  
}

export default App;
