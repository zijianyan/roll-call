import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteStudent_thunk } from '../store/thunks';

import { getSchool } from '../utils';

const StudentsList = ({ students, deleteStudent, schools })=> {
  return (
    <Fragment>
      <h2>Students</h2>
      <ul>
        {
          students.map( student => {
            const { id, firstName, lastName, gpa, schoolId } = student;
            const school = getSchool(schools, schoolId);
            return (
              <li key={id}>
                <Link to={`/students/${id}`}>{firstName} {lastName}</Link>
                - gpa: {gpa}
                {
                  school
                    ? (<span> - school: {<Link to={`/schools/${school.id}`}>{school.name}</Link>}</span>) 
                    : null
                }
                <div>
                  <button onClick={()=> deleteStudent(student)}>x</button>
                </div>
              </li>
            )
          })
        }
      </ul>
    </Fragment>
  )
}

StudentsList.propTypes = {
  students: PropTypes.array
}

StudentsList.defaultProps = {
  students: []
}

const mapStateToProps = ({ students, schools })=> {
  return {
    students,
    schools
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    deleteStudent: (student)=> dispatch(deleteStudent_thunk(student))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentsList);