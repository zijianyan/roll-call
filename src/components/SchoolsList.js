import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { deleteSchool_thunk } from '../store/thunks';

const SchoolsList = ({ schools, deleteSchool })=> {
  return (
    <Fragment>
      <h2>Schools</h2>
      <ul>
        {
          schools.map( school => (
            <li key={school.id}>
              {school.name}
              <button onClick={()=> deleteSchool(school)}>x</button>
            </li>
          ))
        }
      </ul>
    </Fragment>
  )
}

SchoolsList.propTypes = {
  schools: PropTypes.array
}

SchoolsList.defaultProps = {
  schools: []
}

const mapStateToProps = ({ schools })=> {
  return {
    schools
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    deleteSchool: (school)=> { dispatch(deleteSchool_thunk(school)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SchoolsList);