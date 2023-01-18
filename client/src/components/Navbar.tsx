import { Link, NavLink } from 'react-router-dom'

import React, { useState, useRef, useEffect, Fragment} from 'react';
import { useTranslation } from 'react-i18next';

import logo from './tree.svg'

import { FaBars, FaTwitter } from 'react-icons/fa'
import { guestLinks, social } from './Icons'
import Socialbar from './Socialbar'

import { connect } from 'react-redux';
import { logout } from '../actions/Auth';
import LanguageSelect from './LanguageSelect/LanguageSelect';

const Navbar = ({ isAuthenticated, logout }) => {

  const { t, i18n } = useTranslation();

  const authLinks = (
    <Fragment>
      <li className='nav-item'>
          <NavLink className='nav-link' to='/tree'>{t('Navbar.tree')}</NavLink>
      </li>
      <li className='nav-item'>
          <NavLink className='nav-link' onClick={logout} to='/'>{t('Navbar.logout')}</NavLink>
      </li>
    </Fragment>
  );


  const navbarLinks = (links) => (
    <Fragment>
      {links.map((link) => {
        const { id, url, text } = link;
        return (
          <li className='nav-item' key={id}>
            <NavLink to={url}>{t('Navbar.'+text)}</NavLink>
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
      <div className='nav-center' dir={i18n.dir()}>
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
        <LanguageSelect {...i18n} />
      </div>
    </nav>
  );
};


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Navbar);