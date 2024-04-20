import React from 'react';
import './App.css';
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';


import Spot from './Spot';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/Spot/*" />} />
          <Route path="/Spot/*" element={<Spot />} />
        </Routes>
      </div>
    </BrowserRouter>
  );

}

export default App;
