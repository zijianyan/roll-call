import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import uuidv4 from 'uuid/v4';

import { deleteStudent_thunk, updateStudent_thunk } from '../../store/thunks';
import { getSchool, getStudent, gpaPercentage } from '../../utils';

import StudentFormDialog from './StudentFormDialog';
import StudentDeleteDialog from './StudentDeleteDialog';

import { withStyles, Typography, Button, IconButton, Tooltip, Avatar, LinearProgress, Fade } from '@material-ui/core';
import { Card, CardContent, CardActions, CardMedia, CardHeader } from '@material-ui/core';
import { Eject, Edit, Delete } from '@material-ui/icons';

const styles = {
  card: {
    maxWidth: 1000,
    minWidth: 400
  },
  cardContent: {
    margin: '20 30 0 30'
  },
  cardMedia: {
    height: 300,
  },
  cardActions: {
    margin: '0 30 20 30'  
  },
  cellButton: {
    'text-transform': 'none',
    'color': 'rgba(0, 0, 0, 0.87)',
    'font-size': '0.8125rem',
    'font-weight': '400'
  },
  title: {
    fontWeight: 200,
    fontSize: '2.125rem'
  }
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
    window.scroll(0,0);
  }

  toggleFormDialog() {
    this.setState({ formDialog: !this.state.formDialog });
  }

  toggleDeleteDialog() {
    this.setState({ deleteDialog: !this.state.deleteDialog });
  }

  render() {
    if (!this.props.student) { return (<Typography>Student not found</Typography>); }

    const { student, deleteStudent, school, unenroll, classes } = this.props;
    const { toggleFormDialog, toggleDeleteDialog } = this;
    const { formDialog, deleteDialog } = this.state;
    const { firstName, lastName, imageUrl, gpa } = student;
    const { cardMedia, cardContent, cardActions } = classes;

    const editButton = (
      <Tooltip title='Edit'>
        <IconButton onClick={toggleFormDialog}>
          <Edit />
        </IconButton>
      </Tooltip>
    );

    const schoolSubheader = school ? (
      <Fragment>
        <Link to={`/schools/${school.id}`}>
          {school.name}
        </Link>
        <Tooltip title='Unenroll'>
          <IconButton onClick={()=> unenroll(student)}>
            <Eject />
          </IconButton>
        </Tooltip>
      </Fragment>
    ) : 'Not enrolled';


    return (
      <Fragment>
      
        <Fade in timeout={1000}>
          <Card className={classes.card}>

            <CardHeader
              avatar={<Avatar src={imageUrl}/>}
              action={editButton}
              title={<Typography variant='title' className={classes.title}>{firstName} {lastName}</Typography>}
              subheader={schoolSubheader}
            />

            <Fade in timeout={2000}>
              <CardMedia 
                image={`http://source.unsplash.com/random?place&forceRefresh=${uuidv4()}`}
                className={cardMedia}
              />
            </Fade>

            <CardContent className={cardContent}>
              <LinearProgress
                variant='determinate'
                value={gpaPercentage(student.gpa)*100}
                className={classes.progress}
              />
              <Typography variant='subheading'>
                GPA: {gpa}
              </Typography>
            </CardContent>

            <CardActions className={cardActions}>
              <Fragment>
                <Tooltip title='Delete'>
                  <IconButton onClick={toggleDeleteDialog}>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </Fragment>
            </CardActions>
            
          </Card>
        </Fade>

        <StudentFormDialog
          type='update'
          formDialog={formDialog}
          toggleFormDialog={toggleFormDialog}
          student={student}
        />

        <StudentDeleteDialog
          deleteDialog={deleteDialog}
          toggleDeleteDialog={toggleDeleteDialog}
          deleteStudent={deleteStudent}
          student={student}
        />

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


