import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { deleteSchool_thunk } from '../store/thunks';

const SchoolsList = ({ schools, deleteSchool })=> {
  return (
    <Fragment>
      <h2>Schools</h2>
      <ul>
        {
          schools.map( school => {
            const { students } = school;
            return (
              <li key={school.id}>
                <Link to={`/schools/${school.id}`}>{school.name} {students.length ? `(${students.length})` : null}</Link>
                <div>
                  <button onClick={()=> deleteSchool(school)}>x</button>
                </div>
              </li>              
            )
          })
        }
      </ul>
    </Fragment>
  )
}

SchoolsList.propTypes = {
  schools: PropTypes.array
}

// SchoolsList.defaultProps = {
//   schools: []
// }

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