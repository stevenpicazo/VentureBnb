import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import LoginFormModal from "../LoginFormModal";
import LoginModalMenu from "../Navigation/OpenModalMenuItem";
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };


  return (
    <div className="signup-container">
      <div className="modal-title">Sign up</div>
      <div className="venturebnb-title">Welcome to Venturebnb</div>
      <form className="signup-form" onSubmit={handleSubmit}>
        <ul className="ul-errors">
          {errors.map((error, idx) => <div className="errors" key={idx}>{error}</div>)}
        </ul>
        <div className='signup-label-container'>
          <label className="sign-up-label">
            <input
              className="signup-input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
              required
            />
          </label>
          <div className="border"></div>
          <label className="sign-up-label">
            <input className="signup-input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
          </label>
          <div className="border"></div>
          <label className="sign-up-label">
            <input className="signup-input"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"

              required
            />
          </label>
          <div className="border"></div>
          <label className="sign-up-label">
            <input className="signup-input"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              required
            />
          </label>
          <div className="border"></div>
          <label className="sign-up-label">
            <input className="signup-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </label>
          <label className="sign-up-label">
            <div className="border"></div>
            <input className="signup-input"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
            />
          </label>
        </div>
        <button
          className="signup-button"
          type="submit">Sign Up</button>



      </form>
    </div>
  );
}

export default SignupFormModal;