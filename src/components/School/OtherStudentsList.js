import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { updateStudent_thunk } from '../../store/thunks';
import { getSchool, findOtherStudents } from '../../utils';

import { withStyles, Paper, Typography, Divider, Avatar, Tooltip, IconButton } from '@material-ui/core';
import { List, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import { CompareArrows, AddCircle } from '@material-ui/icons';

const styles = {
  paper: {
    padding: 50,
    marginTop: 10
  }
};

const OtherStudentsList = ({ otherStudents, enrollStudent, schools, classes })=> {
  return (
    <Paper className={classes.paper}>
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
                  <ListItemText
                    primary={`${firstName} ${lastName}`}
                    secondary={otherSchool ? otherSchool.name : null}
                  />
                  {
                    otherSchool ? (
                      <ListItemSecondaryAction>
                        <Tooltip title={`Transfer from ${otherSchool.name}`}>
                          <IconButton onClick={()=> enrollStudent(student)}>
                            <CompareArrows/>
                          </IconButton>
                        </Tooltip>
                      </ListItemSecondaryAction>
                    ) : (
                      <ListItemSecondaryAction>
                        <Tooltip title='Enroll'>
                          <IconButton onClick={()=> enrollStudent(student)}>
                            <AddCircle/>
                          </IconButton>
                        </Tooltip>
                      </ListItemSecondaryAction>
                    )
                  }
                </ListItem>
                <Divider />
              </Fragment>
            );
          })
        }
      </List>
    </Paper>
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
      dispatch(updateStudent_thunk({...student, schoolId}));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OtherStudentsList));