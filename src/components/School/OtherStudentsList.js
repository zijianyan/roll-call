import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { updateStudent_thunk } from '../../store/thunks';
import { getSchool, findOtherStudents } from '../../utils';

import { Paper, List, ListItem, ListItemText, Typography, Divider, Avatar, Tooltip, IconButton, ListItemSecondaryAction } from '@material-ui/core';
import { Eject, CompareArrows, AddCircle } from '@material-ui/icons';

const OtherStudentsList = ({ otherStudents, enrollStudent, schools })=> {
  return (
    <div>
      <Typography variant='title' >Other Students</Typography>

      <List>
        {
          otherStudents.map( student => {
            const otherSchool = getSchool(schools, student.schoolId);
            const { id, firstName, lastName, imageUrl } = student;
            return (
              <Fragment key={id}>
                <ListItem component={Link} to={`/students/${id}`} button>
                  <Avatar src={imageUrl}/>
                  <ListItemText primary={`${firstName} ${lastName}`} secondary={otherSchool ? otherSchool.name : null}/>
                  {
                    otherSchool ? (
                      <ListItemSecondaryAction><Tooltip title={`Transfer from ${otherSchool.name}`}><IconButton onClick={()=> enrollStudent(student)}><CompareArrows/></IconButton></Tooltip></ListItemSecondaryAction>
                    ) : (
                      <ListItemSecondaryAction><Tooltip title='Enroll'><IconButton onClick={()=> enrollStudent(student)}><Eject/></IconButton></Tooltip></ListItemSecondaryAction>
                    )
                  }
                  
                </ListItem>
                <Divider light/>
              </Fragment>
            );
          })
        }
      </List>

      <ul>
        {
          otherStudents.map( student => {
            const otherSchool = getSchool(schools, student.schoolId);
            return (
              <li key={student.id}>
                <Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link>
                {
                  otherSchool
                    ? (<span> - {otherSchool.name} - <button onClick={()=> enrollStudent(student)}>Transfer In</button></span>)
                    : (<span> - <button onClick={()=> enrollStudent(student)}>Enroll</button></span>)
                }
                <div>
                </div>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

const mapStateToProps = ({ students, schools }, { schoolId }) => {
  return {
    otherStudents: findOtherStudents(students, schoolId),
    schools
  };
};

const mapDispatchToProps = (dispatch, { schoolId })=> {
  return {
    enrollStudent: (student)=> {
      const _student = {...student, schoolId };
      dispatch(updateStudent_thunk(_student));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OtherStudentsList);