import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { findEnrolled } from '../../utils';
import { updateStudent_thunk } from '../../store/thunks';

import StudentFormDialog from '../Student/StudentFormDialog';

import { withStyles, Typography, Avatar, Button, Divider, IconButton, Tooltip, Paper } from '@material-ui/core';
import { List, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import { Eject, AddCircle } from '@material-ui/icons';

const styles = {
  paper: {
    padding: 50,
    marginTop: 10,
    marginBottom: 10
  },
  addCircle: {
    margin: 10
  },
  headline: {
    fontWeight: 200
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
      <Fragment>
        <Paper className={classes.paper}>
          <Typography variant='headline' className={classes.headline}>{enrolledStudents.length ? 'Enrolled Students' : 'No Students'}</Typography>

          <List>
            <ListItem button onClick={toggleFormDialog}> 
              <AddCircle color='primary' className={classes.addCircle}/>
              <ListItemText>Add New Student</ListItemText>
            </ListItem>
            <Divider />
            {
              enrolledStudents ? enrolledStudents.map( student => {
                const { id, firstName, lastName, gpa, imageUrl } = student;
                return (
                  <Fragment key={id} >
                    <ListItem component={Link} to={`/students/${id}`} button>
                      <Avatar src={imageUrl}/>
                      <ListItemText primary={`${firstName} ${lastName}`} secondary={`GPA: ${gpa}`}/>
                      <ListItemSecondaryAction>
                        <Tooltip title='Unenroll'>
                          <IconButton onClick={()=> unenrollStudent(student)}>
                            <Eject />
                          </IconButton>
                        </Tooltip>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                  </Fragment>
                );
              }) : null
            }
          </List>

          <StudentFormDialog
            type='create'
            schoolId={schoolId}
            formDialog={formDialog}
            toggleFormDialog={toggleFormDialog}
          />

        </Paper>
      </Fragment>
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
      dispatch(updateStudent_thunk({...student, schoolId: null}));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EnrolledStudentsList));


