import React, { Fragment } from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { deleteSchool_thunk } from '../store/thunks';

import { findEnrolled } from '../utils';

const SchoolsList = ({ schools, deleteSchool, students })=> {
  return (
    <Fragment>
      <h2>Schools</h2>
      <ul>
        {
          schools.map( school => {
            const enrolledStudents = findEnrolled(students, school.id);
            return (
              <li key={school.id}>
                <Link to={`/schools/${school.id}`}>
                  {school.name}
                  {enrolledStudents.length ? ` (${enrolledStudents.length})` : null}
                </Link>
                <div>
                  <button onClick={()=> deleteSchool(school)}>x</button>
                </div>
              </li>              
            );
          })
        }
      </ul>
    </Fragment>
  );
};

const mapStateToProps = ({ schools, students })=> {
  return {
    schools,
    students
  };
};

const mapDispatchToProps = (dispatch)=> {
  return {
    deleteSchool: (school)=> { dispatch(deleteSchool_thunk(school));}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SchoolsList);