import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import CreateSpot from '../CreateSpot/CreateSpot';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='nav-container'>
      <div className='home-button'>
      {/* <i class="fa-brands fa-gg-circle"> */}
        <NavLink exact to="/">Home</NavLink>
      </div>
      <div className='create-spot-button'>
        <NavLink className="creat-spot-navlink" to={'/spots/host'}>
        {isLoaded && (
          <CreateSpot user={sessionUser} />
        )}
          Venture your home
        </NavLink>
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