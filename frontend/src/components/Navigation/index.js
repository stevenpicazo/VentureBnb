import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import CreateSpot from '../CreateSpot/CreateSpot';
import './Navigation.css';
import OpenModalButton from '../OpenModalButton';
import SearchBar from '../SearchBar';


function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='nav-container'>
      <div className='home-button'>
        {/* <i class="fa-brands fa-gg-circle"> */}
        <NavLink exact to="/">
          <img
            className='nav-logo'
            src={require('./logo2.png')} alt="Home" />
        </NavLink>
      </div>

      <div className='nav-search-bar'>
        <SearchBar />
      </div>

      <div className='nav-bar-right-section'>
        <i onClick={() => window.open("https://github.com/stevenpicazo", "_blank")} class="fa-brands fa-github nav-icons"></i>
        <i onClick={() => window.open("https://www.linkedin.com/in/steven-picazo-994042225", "_blank")} class="fa-brands fa-linkedin nav-icons"></i>
        <i onClick={() => window.open("https://wellfound.com/u/steven-picazo", "_blank")} class="fa-brands fa-angellist nav-icons"></i>
        <i onClick={() => window.open("https://stevenpicazo.com", "_blank")} class="fa-solid fa-folder-open"></i>
        <div className='create-spot-button'>

          {sessionUser ?
            <OpenModalButton
              modalComponent={<CreateSpot />}
              buttonText="Venture your home"
              className="create-spot-navlink"
            />
            : null}
        </div>
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