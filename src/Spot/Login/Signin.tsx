import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Signup from "./Signup";
import * as client from "./client";
import './styles.css';

export default function Signin() {
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignin = async () => {
        try {
            await client.signin(credentials);
            navigate("/Spot/Profile");
        } catch (err: any) {
            setError(err.response?.data?.message || "Invalid credentials.");
        }
    };

    return (
        <div className="form-container">
            <h1>Signin</h1>
            {error && <div className="error">{error}</div>}
            <input className="input-field" placeholder="Username" value={credentials.username} onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} />
            <input className="input-field" type="password" placeholder="Password" value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
            <button className="btn btn-primary" onClick={handleSignin}>Signin</button>
            <button className="btn btn-secondary" onClick={() => setShowSignupModal(true)}>Signup</button>
            <button className="btn btn-tertiary" onClick={() => navigate("/Spot/Feed")}>Continue as Guest</button>

            {showSignupModal && (
                <div className="modal">
                    <div className="modal-content">
                        <Signup closeModal={() => setShowSignupModal(false)} />
                    </div>
                </div>
            )}
        </div>
    );
}
