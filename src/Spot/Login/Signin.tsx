import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { authenticateUser } from '../Reducers/authSlice'; // Adjust the import path
import Signup from "./Signup";
import './styles.css';
import { AppDispatch } from "../Store";

export default function Signin() {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSignin = () => {
    dispatch(authenticateUser(credentials))
      .unwrap()
      .then(() => navigate("/Spot/Profile"))
      .catch((error: string) => setError(error));
  };

  return (
    <div className="form-container">
      <h1>Signin</h1>
      {error && <div className="error">{error}</div>}
      <input
        className="sp-input-field"
        placeholder="Username"
        value={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
      />
      <input
        className="sp-input-field"
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />
      <button className="btn btn-primary sp-btn-primary" onClick={handleSignin}>Signin</button>
      <button className="btn btn-secondary sp-btn-secondary" onClick={() => setShowSignupModal(true)}>Signup</button>
      <button className="btn btn-tertiary sp-btn-tertiary" onClick={() => navigate("/Spot/Feed")}>Continue as Guest</button>
      <button className="btn btn-tertiary sp-btn-tertiary" onClick={() => navigate("/Spot/Admin/Signin")}>Proceed as Admin</button>
      {showSignupModal && (
        <div className="sp-modal">
          <div className="sp-modal-content">
            <Signup closeModal={() => setShowSignupModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
