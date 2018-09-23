import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Nav = ()=> {
  return (
    <Fragment>
      <h2>Nav</h2>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/schools'>Schools</Link>
        </li>
        <li>
          <Link to='/students'>Students</Link>
        </li>
      </ul>
    </Fragment>
  )
}

export default Nav;