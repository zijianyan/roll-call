import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { deleteSchool_thunk, deleteStudent_thunk, updateStudent_thunk, updateSchool_thunk } from '../store/thunks';

import { getSchool } from '../utils';

const School = ({ id, school, deleteSchool, unenroll, otherStudents })=> {
  return (
    <div>
      <p>School id: {id}</p>
      <p>{ school ? school.name : null }</p>
      <p>{school && school.students && school.students.length ? 'Students:' : 'No Students'}</p>
      <ul>
        { school && school.students ? school.students.map( student =>
            <li key={student.id}>
              {student.firstName} {student.lastName} - GPA: {student.gpa}
              <button onClick={()=> unenroll(student, school)}>Unenroll</button>
            </li>
          ) : null }      
      </ul>
      <button onClick={()=> deleteSchool(school)}>Delete School</button>

      <hr/>

      <h3>Other Students</h3>
      <ul>
        {
          otherStudents.map( student =>
            <li key={student.id}>{student.firstName} {student.lastName} { student.school ? `- ${student.school.name}` : '- no school' }</li>
          )
        }
      </ul>
    </div>
  )
}





School.propTypes = {
  id: PropTypes.number,
  school: PropTypes.object
}

const mapStateToProps = ({ schools, students }, { match })=> {
  return {
    id: match.params.id*1,
    school: getSchool(schools, match.params.id*1),
    otherStudents: students.filter (student => student.schoolId !== match.params.id*1)
  }
}


const mapDispatchToProps = (dispatch, { history })=> {
  return {
    deleteSchool: (school)=> {
        dispatch(deleteSchool_thunk(school));
        history.push('/schools');
      },
    unenroll: (student, school)=> {
      // const _student = {...student, schoolId: null};
      // console.log('School, unenroll, _student:', _student);
      dispatch(updateStudent_thunk({...student, schoolId: null}));
      const students = school.students.filter( _student => _student.id !== student.id);
      dispatch(updateSchool_thunk({...school, students}))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(School);