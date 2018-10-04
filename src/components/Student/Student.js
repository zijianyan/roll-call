import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';

import { deleteStudent_thunk, updateStudent_thunk } from '../../store/thunks';
import { getSchool, getStudent } from '../../utils';
import { Link } from 'react-router-dom';

import uuidv4 from 'uuid/v4';

import { withStyles, Typography, Button, IconButton, Tooltip, Card, CardContent, CardActions, CardActionArea, CardMedia, CardHeader, Avatar, LinearProgress, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, } from '@material-ui/core';
import { Eject, MoreVertIcon, Edit, Delete } from '@material-ui/icons';

import StudentFormDialog from './StudentFormDialog';
import StudentDeleteDialog from './StudentDeleteDialog';

const styles = {
  card: {
    maxWidth: 1000,
    minWidth: 400
  },
  media: {
    height: 300,
  },
  cellButton: {
    'text-transform': 'none',
    'color': 'rgba(0, 0, 0, 0.87)',
    'font-size': '0.8125rem',
    'font-weight': '400'
  },
  progress: {
    marginTop: 5,
    marginBottom: 10
  }
};

const gpaPercentage = gpa => {
  return (gpa/4).toFixed(2);
};
  

class Student extends Component {
  constructor() {
    super();
    this.state = {
      deleteDialog: false,
      formDialog: false
    };
    this.toggleFormDialog = this.toggleFormDialog.bind(this);
    this.toggleDeleteDialog = this.toggleDeleteDialog.bind(this);
  }

  componentDidMount() {
    window.scroll(0,0); // make sure the user starts at the top of the page after first render
  }

  toggleFormDialog() {
    this.setState({ formDialog: !this.state.formDialog });
  }

  toggleDeleteDialog() {
    this.setState({ deleteDialog: !this.state.deleteDialog });
  }

  render() {
    const { student, deleteStudent, school, unenroll, history, classes } = this.props;
    const { toggleFormDialog, toggleDeleteDialog } = this;
    const { formDialog, deleteDialog } = this.state;
    if (!student) {
      return (
        <Typography>
          Student not found
        </Typography>
      );
    }

    return (
      <Fragment>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar className={classes.avatar} src={student.imageUrl}>
              </Avatar>
            }
            action={
              <Tooltip title='Edit'>
                <IconButton onClick={toggleFormDialog}><Edit /></IconButton>
              </Tooltip>
            }
            
            title={`${student.firstName} ${student.lastName}`}
            subheader={ school ? (<Fragment><Link to={`/schools/${school.id}`}>{school.name}</Link> <Tooltip title='Unenroll'>
              <IconButton onClick={()=> unenroll(student)} ><Eject fontSize='small'/>
              </IconButton>
            </Tooltip></Fragment>) : 'Not enrolled'}
          />
          <CardMedia 
            image={`http://source.unsplash.com/random?place&forceRefresh=${uuidv4()}`}
            className={classes.media}
          />
          <CardContent>
            <LinearProgress variant='determinate' value={gpaPercentage(student.gpa)*100} className={classes.progress}/>
            <Typography variant='subheading'>GPA: {student.gpa}</Typography>
          </CardContent>
          <CardActions>
            <Fragment>
              <Tooltip title='Delete'>
                <IconButton onClick={toggleDeleteDialog}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </Fragment>
          </CardActions>
        </Card>

        <StudentFormDialog type='update' formDialog={formDialog} toggleFormDialog={toggleFormDialog} student={student}/>

        <StudentDeleteDialog deleteDialog={deleteDialog} toggleDeleteDialog={toggleDeleteDialog} deleteStudent={deleteStudent} student={student}/>

      </Fragment>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Student));



//  <StudentForm type='update' student={student}/>




    //  <Tooltip title='Edit'>
    //             <IconButton onClick={toggleEditing}><Edit /></IconButton>
    //           </Tooltip>