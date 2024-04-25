import React, { useState } from "react";
import './styles.css';
import * as client from "./client";

interface SignupProps {
    closeModal: () => void;  // closeModal is a function that takes no arguments and returns nothing
}

export default function Signup({ closeModal }: SignupProps) {
  const [error, setError] = useState("");
  const [user, setUser] = useState({ username: "", password: "", firstName: "", lastName: "" });

  const handleSignup = async () => {
    try {
      await client.signup(user);
      closeModal();  // Close the modal on successful signup
    } catch (err: any) {
      setError(err.response?.data?.message || "Error during signup.");
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      {error && <div className="error">{error}</div>}
      <input className="input-field" placeholder="First Name" value={user.firstName} onChange={(e) => setUser({ ...user, firstName: e.target.value })} />
      <input className="input-field" placeholder="Last Name" value={user.lastName} onChange={(e) => setUser({ ...user, lastName: e.target.value })} />
      <input className="input-field" placeholder="Username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
      <input className="input-field" type="password" placeholder="Password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
      <button className="btn btn-primary" onClick={handleSignup}>Signup</button>
      <button className="btn btn-secondary" onClick={closeModal}>Cancel</button>
    </div>
  );
}
