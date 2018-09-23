import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { deleteSchool_thunk } from '../store/thunks';

const SchoolList = ({ schools, deleteSchool })=> {
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

SchoolList.propTypes = {
  schools: PropTypes.array
}

SchoolList.defaultProps = {
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

export default connect(mapStateToProps, mapDispatchToProps)(SchoolList);