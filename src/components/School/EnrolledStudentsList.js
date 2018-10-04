import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { findEnrolled } from '../../utils';
import { updateStudent_thunk } from '../../store/thunks';
import { Link } from 'react-router-dom';

import StudentFormDialog from '../StudentFormDialog';

import { withStyles, Typography, List, ListItem, ListItemText, Avatar, ListItemSecondaryAction, Button, Divider, IconButton, Tooltip, Paper } from '@material-ui/core';

import { Eject, AddCircle } from '@material-ui/icons';

const styles = {
  paper: {
    padding: 50,
    marginTop: 10,
    marginBottom: 10
  }
};

class EnrolledStudentsList extends Component {
  constructor() {
    super();
    this.state = {
      formDialog: false
    };
    this.toggleFormDialog = this.toggleFormDialog.bind(this);
  }

  toggleFormDialog() {
    this.setState({ formDialog: !this.state.formDialog });
  }

  render() {
    const { enrolledStudents, unenrollStudent, schoolId, classes } = this.props;
    const { toggleFormDialog } = this;
    const { formDialog } = this.state;
    return (
      <Paper className={classes.paper}>
        <Typography variant='title'>{enrolledStudents.length ? 'Enrolled Students' : 'No Students'}</Typography>

        <List>
          {
            enrolledStudents ? enrolledStudents.map( student => {
              const { id, firstName, lastName, gpa, imageUrl } = student;
              return (
                <Fragment key={id} >
                  <ListItem component={Link} to={`/students/${id}`} button>
                    <Avatar src={imageUrl}/>
                    <ListItemText primary={`${firstName} ${lastName}`} secondary={`GPA: ${gpa}`}/>
                    <ListItemSecondaryAction><Tooltip title='Unenroll'><IconButton onClick={()=> unenrollStudent(student)}><Eject /></IconButton></Tooltip></ListItemSecondaryAction>
                    
                    
                  </ListItem>
                  <Divider light/>
                </Fragment>
              );

            }) : null
          }
          <ListItem button onClick={toggleFormDialog}> 
            <AddCircle color='primary'/>
            <ListItemText>Add New Student</ListItemText>
          </ListItem>
        </List>

        <StudentFormDialog type='create' schoolId={schoolId} formDialog={formDialog} toggleFormDialog={toggleFormDialog}/>

      </Paper>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EnrolledStudentsList));


//NEED TO OPEN UP STUDENT FORM DIALOG WITH ADD NEW STUDENT BUTTON - AND PASS IN SCHOOLID TO THE STUDENT FORM DIALOG