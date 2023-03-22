import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import CreateSpot from '../CreateSpot/CreateSpot';
import './Navigation.css';


function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='nav-container'>
      <div className='home-button'>
        {/* <i class="fa-brands fa-gg-circle"> */}
        <NavLink exact to="/">
          <img
            className='nav-logo'
            src={require('./logo.png')} alt="Home" />
        </NavLink>
      </div>

      <div className='create-spot-button'>
        {sessionUser ?
          <NavLink className="create-spot-navlink" to={'/host'}>
            Venture your home
          </NavLink>
          : null}
      </div>

      <div className='profile-button'>
        {isLoaded && (
          <ProfileButton user={sessionUser} />
        )}
      </div>


    </div>

  );
}

export default Navigation;