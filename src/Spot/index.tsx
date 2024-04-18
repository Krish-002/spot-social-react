import SpotNavigation from "./Navigation";
import AdminHomePage from "./Admin";
import PostScreen from "./Post";
import "./index.css";
import { Routes, Route, Navigate } from "react-router-dom";

const Spot = () => {
  return (<div className="kb-container">
  <SpotNavigation />

  <Routes>
  <Route path="/" element={<Navigate to="/Feed" />} />
  <Route path="/Profile/*" element={<h1>Profile</h1>} /> 
  <Route path="/Post/*" element={<PostScreen />} /> 
  <Route path="/Admin" element={<AdminHomePage />}/>
  </Routes>
  </div>)
  
};

export default Spot;