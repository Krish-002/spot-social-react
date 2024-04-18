import SpotNavigation from "./Navigation";
import AdminHomePage from "./Admin";
import "./index.css";
import { Routes, Route, Navigate } from "react-router-dom";

const Spot = () => {
  return (<div className="d-flex kb-container">
  <SpotNavigation />

  <Routes>
  <Route path="/" element={<Navigate to="/Feed" />} />
  <Route path="/Profile/*" element={<h1>Profile</h1>} /> 
  <Route path="/Post/*" element={<h1>Post</h1>} /> 
  <Route path="/Admin" element={<AdminHomePage />}/>
  </Routes>
  </div>)
  
};

export default Spot;