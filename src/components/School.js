import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { deleteSchool_thunk } from '../store/thunks';
import { deleteStudent_thunk } from '../store/thunks';

import { getSchool } from '../utils';

const School = ({ id, school, deleteSchool, deleteStudent })=> {
  return (
    <div>
      <p>School id: {id}</p>
      <p>{ school ? school.name : null }</p>
      <p>{school && school.students.length ? 'Students:' : 'No Students'}</p>
      <ul>
        { school && school.students ? school.students.map( student =>
            <li key={student.id}>
              {student.firstName} {student.lastName} - GPA: {student.gpa}
              <button onClick={()=> deleteStudent(student)}>x</button>
            </li>
          ) : null }      
      </ul>
      <button onClick={()=> deleteSchool(school)}>Delete School</button>
    </div>
  )
}





School.propTypes = {
  id: PropTypes.number,
  school: PropTypes.object
}

const mapStateToProps = ({ schools }, { match })=> {
  return {
    id: match.params.id*1,
    school: getSchool(schools, match.params.id*1),
    // students: getSchool(schools, match.params.id*1)
  }
}


const mapDispatchToProps = (dispatch, { history })=> {
  return {
    deleteSchool: (school)=> {
        dispatch(deleteSchool_thunk(school));
        history.push('/schools');
      },
    deleteStudent: (student)=> {
      console.log('deleteStudent, student:', student);
      dispatch(deleteStudent_thunk(student));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(School);