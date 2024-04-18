import React from 'react';
import logo from './logo.svg';
import './App.css';
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';


import Spot from './Spot';

function App() {
  return (
    <HashRouter>
    <div>
    <Routes>
      <Route path="/Spot/*" element={<Spot />} />
    </Routes>
    </div>
    </HashRouter>
  );
  
}

export default App;
