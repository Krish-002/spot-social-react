import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { authenticateAdmin } from '../Reducers/adminSlice';
import * as client from "./client";
import './Admin.css';
import { AppDispatch } from "../Store";

export default function AdminSignin() {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const handleAdminSignin = () => {
        dispatch(authenticateAdmin(credentials))
          .unwrap()
          .then(() => navigate("/Spot/Admin"))
          .catch((error: string) => setError(error));
      };

    return (
        <div className="sp-admin-form-container">
            <h1>Admin Signin</h1>
            {error && <div className="sp-admin-error">{error}</div>}
            <input className="sp-admin-input-field" placeholder="Username" value={credentials.username} onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} />
            <input className="sp-admin-input-field" type="password" placeholder="Password" value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
            <button className="btn btn-primary sp-admin-btn-primary" onClick={handleAdminSignin}>Signin</button>
        </div>
    );
}
