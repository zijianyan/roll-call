import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { deleteSchool_thunk, updateStudent_thunk, updateSchool_thunk, unenrollStudent_thunk } from '../store/thunks';

import { getSchool, findEnrolled } from '../utils';

const School = ({ id, school, schools, deleteSchool, otherStudents, unenrollStudent, enrollStudent, transferStudentFrom, students })=> {
  const enrolledStudents = findEnrolled(students, id)
  return (
    <div> 
      <h2>School Detail: { school ? school.name : null }</h2>

      <h3>{enrolledStudents ? 'Students' : 'No Students'}</h3>
      <ul>
        {
          enrolledStudents ? enrolledStudents.map( student =>
            <li key={student.id}>
              <Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link> - GPA: {student.gpa}
              <button onClick={()=> unenrollStudent(school, student)}>Unenroll</button>
            </li>
          ) : null
        }      
      </ul>
      <button onClick={()=> deleteSchool(school)}>Delete School</button>

      <hr/>

      <h3>Other Students</h3>
      <ul>
        {
          otherStudents.map( student => {
            const otherSchool = getSchool(schools, student.schoolId);
            return (
            <li key={student.id}>
              <Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link>
              {
                otherSchool
                  ? (<span> - {otherSchool.name} - <button onClick={()=> transferStudentFrom(otherSchool, student)}>Transfer In</button></span>)
                  : (<span> - <button onClick={()=> enrollStudent(student)}>Enroll</button></span>)
              }
              <div>
              </div>
            </li>
            )
          })
        }
      </ul>
    </div>
  )
}





School.propTypes = {
  id: PropTypes.number,
  school: PropTypes.object
};

const mapStateToProps = ({ schools, students }, { match })=> {
  return {
    id: match.params.id*1,
    school: getSchool(schools, match.params.id*1),
    otherStudents: students.filter (student => student.schoolId !== match.params.id*1),
    schools,
    students
  };
};


const mapDispatchToProps = (dispatch, { match, history })=> {
  return {
    deleteSchool: (school)=> {
      dispatch(deleteSchool_thunk(school));
      history.push('/schools');
    },
    updateStudent: (student)=> {
      dispatch(updateStudent_thunk(student));
    },
    unenrollStudent: (school, student)=> {
      const _student = {...student, schoolId: null};
      dispatch(updateStudent_thunk(_student));
      dispatch(unenrollStudent_thunk(school, student));
    },
    enrollStudent: (student)=> {
      const _student = {...student, schoolId: match.params.id*1};
      dispatch(updateStudent_thunk(_student));
    },
    transferStudentFrom: (school, student)=> {
      const _student = {...student, schoolId: match.params.id*1};
      dispatch(updateStudent_thunk(_student));
      dispatch(unenrollStudent_thunk(school, student));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(School);