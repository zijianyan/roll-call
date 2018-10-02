import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { deleteStudent_thunk, updateStudent_thunk } from '../store/thunks';
import { getSchool, getStudent } from '../utils';
import { Link } from 'react-router-dom';

import { Typography, Button, IconButton, Tooltip } from '@material-ui/core';
import { Eject } from '@material-ui/icons';

import StudentForm from './StudentForm';

const Student = ({ student, deleteStudent, school, unenroll, history })=> {
  window.scroll(0,0);
  if (!student) {
    return (
      <div>
        Student not found
      </div>
    );
  }
  return (
    <div>
      <Typography variant='display1'>{student ? `${student.firstName} ${student.lastName} - GPA: ${student.gpa}` : null }</Typography>
      <div id='student-image-container'>
        <img src={student.imageUrl} id='student-image'/>
      </div>

      {
        school
          ? (<Fragment><Typography variant='subheading'>Enrolled in <Link to={`/schools/${school.id}`}>{school.name}</Link></Typography>
          
            <Tooltip title='Unenroll'>
              <IconButton onClick={()=> unenroll(student)}><Eject/>
              </IconButton>
            </Tooltip></Fragment>)
          : <Typography variant='subheading'>Not enrolled</Typography>
      }
      
      <h3>Edit Student</h3>
      <StudentForm type='update' student={student}/>
      <hr/>
      <button onClick={()=> deleteStudent(student)}>Delete Student</button>
    </div>
  );
};

const mapStateToProps = ({ students, schools }, { match })=> {
  const student = getStudent(students, match.params.id);
  return {
    student,
    school: student ? getSchool(schools, student.schoolId) : null
  };
};

const mapDispatchToProps = (dispatch, { history })=> {
  return {
    deleteStudent: (student)=> {
      dispatch(deleteStudent_thunk(student));
      history.push('/students');
    },
    unenroll: (student)=> {
      dispatch(updateStudent_thunk({...student, schoolId: null}))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Student);
