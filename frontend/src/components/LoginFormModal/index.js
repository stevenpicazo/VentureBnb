// frontend/src/components/LoginFormPage/index.js
import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { Link } from 'react-router-dom';
import "./LoginForm.css";
import SignupFormModal from "../SignupFormModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";

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

  const demoUser = (e) => {
    e.preventDefault()
    const password = 'password'
    const credential = "Demo-lition"
    dispatch(sessionActions.login({ credential, password }))
    closeModal()
  }


  return (
    <div className="login-container">
      <div className="login-title">Log in</div>
      <div className="venturebnb-title">Welcome to Venturebnb</div>
      <div className="login-form-container">
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
            <div className="border"></div>
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
            type="submit">Continue
          </button>
          <div className="alternate-logins">
            or
          </div>
          <button
            className="modal-demo-button"
            onClick={demoUser}
            type='submit'
          >Demo user
          </button>
          {/* <div className="signup-redirect"> */}
          <OpenModalMenuItem
          
            modalComponent={<SignupFormModal />}
          />
          {/* </div> */}
        </form>
      </div>
    </div>
  );
}

export default LoginFormModal;