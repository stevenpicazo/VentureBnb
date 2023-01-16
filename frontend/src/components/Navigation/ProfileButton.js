import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
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
    const credential = "demo@user.io"
    dispatch(sessionActions.login({credential, password}))
    closeMenu()
  }


  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

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
                <div>
                  <button onClick={logout}>Log Out</button>
                </div> 
                <div className='my-listings-div'>
                {sessionUser ? 
                  <NavLink onClick={closeMenu} className="my-listings-navlink" to={'/listings'}>
                    My listings
                  </NavLink>
                : null}
                </div> 
              </>
            ) : (
              <>
                <div>
                  <OpenModalButton
                    buttonText="Log In"
                    onButtonClick={closeMenu}
                    modalComponent={<LoginFormModal />}
                  />
                </div>
                <div>
                  <OpenModalButton
                    buttonText="Sign Up"
                    onButtonClick={closeMenu}
                    modalComponent={<SignupFormModal />}
                  />
                </div>
                <div 
                  className="demo-user"
                  onClick={demoUser} 
                  type='submit'
                  >Demo User
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

