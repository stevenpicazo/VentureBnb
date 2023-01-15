import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='nav-container'>
      <ul id='home-button'>
      {/* <i class="fa-brands fa-gg-circle"> */}
        <NavLink exact to="/">Home</NavLink>
      </ul>
      
      <ul id='profile-button'>
      {isLoaded && (
          <ProfileButton user={sessionUser} />
      )}
      </ul>
     
    </div>

  );
}

export default Navigation;