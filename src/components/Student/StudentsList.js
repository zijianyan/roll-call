import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { deleteStudent_thunk } from '../../store/thunks';
import { getSchool } from '../../utils';

import StudentFormDialog from './StudentFormDialog';
import StudentDeleteDialog from './StudentDeleteDialog';

import { withStyles, Typography, Avatar, Paper, Button, IconButton, Divider, Tooltip, Fade } from '@material-ui/core';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { AddCircle, Delete } from '@material-ui/icons';

const styles = {
  avatar: {
    'margin-right': '15px'
  },
  cellButton: {
    'text-transform': 'none',
    'color': 'rgba(0, 0, 0, 0.87)',
    'font-size': '0.8125rem',
    'font-weight': '400'
  },
  paper: {
    padding: '50px'
  },
  heading: {
    'margin-bottom': 20
  },
  addCircle: {
    margin: 10
  }
};

class StudentsList extends Component {
  constructor() {
    super();
    this.state = {
      formDialog: false,
      deleteDialog: false,
      studentToDelete: null
    };
    this.toggleFormDialog = this.toggleFormDialog.bind(this);
    this.toggleDeleteDialog = this.toggleDeleteDialog.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
  }

  toggleFormDialog() {
    this.setState({ formDialog: !this.state.formDialog });
  }

  toggleDeleteDialog(student) {
    this.setState({
      deleteDialog: !this.state.deleteDialog,
      studentToDelete: student
    });
  }

  deleteStudent(student) {
    this.props.dispatchDeleteStudent(student);
    this.setState({ deleteDialog: false, studentToDelete: null });
  }

  render() {
    const { students, schools, classes } = this.props;
    const { toggleFormDialog, toggleDeleteDialog, deleteStudent } = this;
    const { formDialog, deleteDialog, studentToDelete } = this.state;
    const { heading, paper, cellButton, addCircle, avatar } = classes;
    return (
      <Fragment>
        <Fade in>
          <Paper className={paper}>
            <Typography variant='display1' className={heading}>Students</Typography>
            <Divider/>
            <Table>

              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell numeric>GPA</TableCell>
                  <TableCell>School</TableCell>
                  <TableCell /> 
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow hover={true}>
                  <TableCell colSpan={4}>
                    <Button onClick={toggleFormDialog} className={cellButton}>
                      <AddCircle color='primary' className={addCircle}/>
                      <Typography>Add New Student</Typography>
                    </Button>
                  </TableCell>
                </TableRow>
                {
                  students.map( student => {
                    const { id, firstName, lastName, gpa, schoolId, imageUrl } = student;
                    const school = getSchool(schools, schoolId);
                    return (
                      <TableRow key={id} hover={true} >
                        <TableCell>
                          <Button component={Link} to={`/students/${id}`} className={cellButton}>
                            <Avatar src={imageUrl || null} className={avatar}/>
                            {firstName} {lastName}
                          </Button>
                        </TableCell>
                        <TableCell numeric>
                          {gpa}
                        </TableCell>
                        <TableCell >
                          {
                            school ? (
                              <Button component={Link} to={`/schools/${school.id}`} className={cellButton}>
                                {school.name}
                              </Button>
                            ) : null
                          }
                        </TableCell>
                        <TableCell>
                          <Tooltip title='Delete'>
                            <IconButton onClick={()=> toggleDeleteDialog(student)}>
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })
                }
              </TableBody>

            </Table>
          </Paper>
        </Fade>

        <StudentFormDialog
          type='create'
          formDialog={formDialog}
          toggleFormDialog={toggleFormDialog}
        />

        <StudentDeleteDialog 
          deleteDialog={deleteDialog}
          toggleDeleteDialog={toggleDeleteDialog}
          deleteStudent={deleteStudent}
          student={studentToDelete}  
        />
        
      </Fragment>
    );
  }
}

const mapStateToProps = ({ students, schools })=> {
  return {
    students,
    schools
  };
};

const mapDispatchToProps = (dispatch, { history })=> {
  return {
    dispatchDeleteStudent: (student)=> {
      dispatch(deleteStudent_thunk(student));
      history.push('/students');
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StudentsList));


