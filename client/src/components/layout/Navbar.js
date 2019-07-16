import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';


const Navbar = ({ title, icon }) => {

  const authContext = useContext(AuthContext);

  const { isAuthenticated, logout, user } = authContext;

  const authLinks = (
    <Fragment>
      <li>Hello { user && user.name }</li>
      <li>
        <Link to='/about'>About</Link>
      </li>
      <li>
        <a href="#!">
          <i className="fas fa-sign-out-alt"></i> <span className="hide-sm">Logout</span>
        </a>
      </li>
    </Fragment>
  )

  const guestLinks = (
    <Fragment>
        <li>
          <Link to='/register'>Register</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
    </Fragment>
  )

  return (
    <div className="navbar bg-primary">
      <h3>
        <i className={icon} /> {title}
      </h3>
      <ul>
        {isAuthenticated ? authLinks : guestLinks}
      </ul>
    </div>
  )
}

Navbar.defaultProps = {
  title: 'Contact Keeper',
  icon: 'fas fa-id-card-alt'
}
export default Navbar
