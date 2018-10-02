import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { findEnrolled } from '../../utils';
import { updateStudent_thunk } from '../../store/thunks';
import { Link } from 'react-router-dom';

import { Typography, List, ListItem, ListItemText, Avatar, ListItemSecondaryAction, Button, Divider, IconButton } from '@material-ui/core';

import { Eject } from '@material-ui/icons';


const EnrolledStudentsList = ({ enrolledStudents, unenrollStudent, schoolId })=> {
  return (
    <div>
      <Typography variant='title'>{enrolledStudents.length ? 'Enrolled Students' : 'No Students'}</Typography>

      <List>
        {
          enrolledStudents ? enrolledStudents.map( student => {
            const { id, firstName, lastName, gpa, imageUrl } = student;
            return (
              <Fragment>
              <ListItem key={id}>
                <Avatar src={imageUrl}/>
                <ListItemText primary={`${firstName} ${lastName}`} secondary={`GPA: ${gpa}`}/>
                <ListItemSecondaryAction><IconButton onClick={()=> unenrollStudent(student)}><Eject /></IconButton></ListItemSecondaryAction>
                
                
              </ListItem>
              <Divider />
              </Fragment>
            );

          }) : null
        }
      </List>

      <ul>
        {
          enrolledStudents ? enrolledStudents.map( student =>
            <li key={student.id}>
              <Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link> - GPA: {student.gpa}
              <button onClick={()=> unenrollStudent(student)}>Unenroll</button>
            </li>
          ) : null
        }
        <li><Link to={`/students/create/${schoolId}`}><button>Add New Student</button></Link></li>      
      </ul>

    </div>
  );
};

const mapStateToProps = ({ students }, { schoolId })=> {
  return {
    enrolledStudents: findEnrolled(students, schoolId)
  };
};

const mapDispatchToProps = (dispatch)=> {
  return {
    unenrollStudent: (student)=> {
      const _student = {...student, schoolId: null};
      dispatch(updateStudent_thunk(_student));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EnrolledStudentsList);