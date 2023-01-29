import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './ProfileButton.css'

function ProfileButton({ user }) {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory()

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
    closeMenu();
  };

  const demoUser = (e) => {
    e.preventDefault()
    const password = 'password'
    const credential = "Demo-lition"
    dispatch(sessionActions.login({ credential, password }))
    closeMenu()
  }

  const handleClick = () => {
    closeMenu();
    history.push('/listings');
  }

  const tripsClick = () => {
    closeMenu();
    history.push('/trips');
  }

  const ulClassName = "profile-dropdown" + (showMenu ? " show" : " hidden");

  return (
    <>
      <div className="profile-wrapper">
        <div className="profile-container">
          <button className="open-menu-button" onClick={openMenu}>

            <i className="fa-solid fa-bars"></i>
            <i className="fas fa-user-circle" />
          </button>
          <ul className={ulClassName} ref={ulRef}>
            {user ? (
              <>
                <div className="user-container">

                  <button className="email-button">{user.email}</button>
                  {sessionUser ?
                    <button
                    className="linkedin-button"
                      onClick={() => window.open("https://www.linkedin.com/in/steven-picazo-994042225", "_blank")} >LinkedIn
                    </button>
                    : null}

                    <div className="linkedin-border"></div>

                  {sessionUser ?
                    <button
                      onClick={handleClick}
                      className="my-listings-button">
                      My Listings
                    </button>
                    : null}
                  {sessionUser ?
                    <button
                      onClick={tripsClick}
                      className="trips-button">
                      Trips
                    </button>
                    : null}
                  <button
                    className="logout-button"
                    onClick={logout}>Log Out
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="modal-container">
                  <div className="modal-background">

                    {/* <button className='userlogin-button'> */}
                    {/* Log In */}
                    <OpenModalButton
                      buttonText="Login"
                      onButtonClick={closeMenu}
                      modalComponent={<LoginFormModal />}
                    />
                    {/* </button> */}

                    {/* <button className='usersignup-button'> */}
                    <OpenModalButton
                      buttonText="Signup"
                      onButtonClick={closeMenu}
                      modalComponent={<SignupFormModal />}
                    />
                    {/* </button> */}

                    <button
                      className="demo-user-button"
                      onClick={demoUser}
                      type='submit'
                    >Demo User
                    </button>
                  </div>
                </div>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default ProfileButton;

