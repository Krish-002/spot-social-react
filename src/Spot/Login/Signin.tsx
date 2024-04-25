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
            <input className="sp-input-field" placeholder="Username" value={credentials.username} onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} />
            <input className="sp-input-field" type="password" placeholder="Password" value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
            <button className="btn btn-primary sp-btn-primary" onClick={handleSignin}>Signin</button>
            <button className="btn btn-secondary sp-btn-secondary" onClick={() => setShowSignupModal(true)}>Signup</button>
            <button className="btn btn-tertiary sp-btn-tertiary" onClick={() => navigate("/Spot/Feed")}>Continue as Guest</button>

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
