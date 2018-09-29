import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { deleteSchool_thunk, deleteStudent_thunk, updateStudent_thunk, updateSchool_thunk } from '../store/thunks';

import { getSchool } from '../utils';

const School = ({ id, school, deleteSchool, unenroll, otherStudents })=> {
  console.log('School, school:', school);
  return (
    <div>
      <h2>School Detail</h2>
      <p>School id: {id}</p>
      <p>{ school ? school.name : null }</p>
      <p>{school && school.students && school.students.length ? 'Students:' : 'No Students'}</p>
      <ul>
        { school && school.students ? school.students.map( student =>
            <li key={student.id}>
              {student.firstName} {student.lastName} - GPA: {student.gpa}
            </li>
          ) : null }      
      </ul>
      <button onClick={()=> deleteSchool(school)}>Delete School</button>

      <hr/>

      <h3>Other Students</h3>
      <ul>
        {
          otherStudents.map( student =>
            <li key={student.id}>
              {student.firstName}
              {student.lastName}
              { student.school ? `- ${student.school.name}` : '- no school' }
              <div>
              </div>
            </li>
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
  console.log('School, mapStateToProps, schools:', schools);
  return {
    id: match.params.id*1,
    school: getSchool(schools, match.params.id*1),
    otherStudents: students.filter (student => student.schoolId !== match.params.id*1)
  }
}


const mapDispatchToProps = (dispatch, { match, history })=> {
  const id = match.params.id*1;
  return {
    deleteSchool: (school)=> {
        dispatch(deleteSchool_thunk(school));
        history.push('/schools');
      },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(School);