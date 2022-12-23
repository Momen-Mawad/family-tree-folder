import { Link, NavLink } from 'react-router-dom'

import React, { useState, useRef, useEffect, Fragment } from 'react';

import logo from './tree.svg'

import { FaBars, FaTwitter } from 'react-icons/fa'
import { guestLinks, social } from './Icons'
import Socialbar from './Socialbar'

import { connect } from 'react-redux';
import { logout } from '../actions/Auth';

const Navbar = ({ isAuthenticated, logout }) => {

  const authLinks = (
    <Fragment>
      <li className='nav-item'>
          <NavLink className='nav-link' to='/tree'>Tree</NavLink>
      </li>
      <li className='nav-item'>
          <NavLink className='nav-link' onClick={logout} to='/'>Logout</NavLink>
      </li>
    </Fragment>
  );


  const navbarLinks = (links) => (
    <Fragment>
      {links.map((link) => {
        const { id, url, text } = link;
        return (
          <li className='nav-item' key={id}>
            <NavLink to={url}>{text}</NavLink>
          </li>
        );
      })}
    </Fragment>
  );

  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);
  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;

    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      linksContainerRef.current.style.height = '0px';
    }
  }, [showLinks]);

  return (
    <nav>
      <div className='nav-center'>
        <div className='nav-header'>
          <Link to='/'>
            <img src={logo} className='logo' alt='logo' />
          </Link>
          <button className='nav-toggle' onClick={toggleLinks}>
            <FaBars />
          </button>
        </div>
        <div className='links-container' ref={linksContainerRef}>
          <ul className='links' ref={linksRef}>
            { isAuthenticated ? authLinks : navbarLinks(guestLinks) }
          </ul>
        </div>
        <Socialbar />
      </div>
    </nav>
  );
};


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Navbar);