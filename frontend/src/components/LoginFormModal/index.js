// frontend/src/components/LoginFormPage/index.js
import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
  };


  return (
    <div className="login-container">
      <div className="login-title">Welcome to VentureBnb</div>
        <form className="login-form" onSubmit={handleSubmit}>
          <ul className="ul-errors">
            {errors.map((error, idx) => (
              <div className="errors" key={idx}>{error}</div>
            ))}
          </ul>
          <div className="login-label-container">
          <label className="login-label">
            <input
              className="user-email"
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              placeholder="Email or username"
              required
            />
          </label>
          <label className="login-label">
            <input
              className="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </label>
          </div>
          <button
            className="login-button"
            type="submit">Log In</button>
        </form>
    </div>
  );
}

export default LoginFormModal;