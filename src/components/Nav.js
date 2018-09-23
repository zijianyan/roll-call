import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

const Nav = ({ schools, students })=> {
  return (
    <Fragment>
      <h2>Nav</h2>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/schools'>Schools ({schools.length})</Link>
        </li>
        <li>
          <Link to='/students'>Students ({students.length})</Link>
        </li>
        <li>
          <Link to='/schools/create'>Create A School</Link>
        </li>
        <li>
          <Link to='/students/create'>Create A Student</Link>
        </li>
      </ul>
    </Fragment>
  )
}

const mapStateToProps = ({ schools, students })=> {
  return {
    schools,
    students
  }
}

export default connect(mapStateToProps)(Nav);