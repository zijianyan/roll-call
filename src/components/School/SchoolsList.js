import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { deleteSchool_thunk } from '../../store/thunks';
import { findEnrolled } from '../../utils';

import SchoolFormDialog from './SchoolFormDialog';
import SchoolDeleteDialog from './SchoolDeleteDialog';

import { withTheme, withStyles, Typography, Button, IconButton, Paper, Divider, Tooltip, Fade } from '@material-ui/core';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import { AddCircle, Delete } from '@material-ui/icons';

import styles from './SchoolsList.styles.js';

class SchoolsList extends Component {
  constructor() {
    super();
    this.state = {
      formDialog: false,
      deleteDialog: false,
      schoolToDelete: null
    };
    this.toggleFormDialog = this.toggleFormDialog.bind(this);
    this.toggleDeleteDialog = this.toggleDeleteDialog.bind(this);
    this.deleteSchool = this.deleteSchool.bind(this);
  }

  toggleFormDialog() {
    this.setState({ formDialog: !this.state.formDialog });
  }

  toggleDeleteDialog(school) {
    this.setState({
      deleteDialog: !this.state.deleteDialog,
      schoolToDelete: school
    });
  }

  deleteSchool(school) {
    this.props.dispatchDeleteSchool(school);
    this.setState({ deleteDialog: false, schoolToDelete: null });
  }

  render() {
    const { schools, students, classes } = this.props;
    const { toggleFormDialog, toggleDeleteDialog, deleteSchool } = this;
    const { formDialog, deleteDialog, schoolToDelete } = this.state;
    const { cellButton, addCircle, paper, heading, tableDesktop } = classes;
    return (
      <Fragment>

        <Fade in>
          <Paper className={paper}>
            <Typography variant='display1' className={heading}>Schools</Typography>
            <Divider />

            <Table >
              <TableHead>
                <TableRow className={tableDesktop}>
                  <TableCell>School</TableCell>
                  <TableCell className={tableDesktop}numeric>Students Enrolled</TableCell>
                  <TableCell className={tableDesktop}>Address</TableCell>
                  <TableCell /> 
                </TableRow>
              </TableHead>

              <TableBody>

                <TableRow hover={true}>
                  <TableCell colSpan={4}>
                    <Button onClick={toggleFormDialog} className={cellButton}>
                      <AddCircle color='primary' className={addCircle}/>
                      <Typography>Add New School</Typography>
                    </Button>
                  </TableCell>
                </TableRow>

                {schools.map(school => {
                  const { id, name, address } = school;
                  const enrolled = findEnrolled(students, id);
                  return (
                    <TableRow key={id} hover={true} >
                      <TableCell>
                        <Button component={Link} to={`/schools/${id}`} className={cellButton}>
                          {name}
                        </Button>
                      </TableCell>
                      <TableCell className={tableDesktop}numeric>{ enrolled.length || null }</TableCell>
                      <TableCell className={tableDesktop}>{address}</TableCell>
                      <TableCell>
                        <Tooltip title='Delete'>
                          <IconButton onClick={()=> toggleDeleteDialog(school)}>
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </Fade> 

        <SchoolFormDialog
          type='create'
          formDialog={formDialog}
          toggleFormDialog={toggleFormDialog}
        />

        <SchoolDeleteDialog
          deleteDialog={deleteDialog}
          toggleDeleteDialog={toggleDeleteDialog}
          deleteSchool={deleteSchool}
          school={schoolToDelete}
        />
        
      </Fragment>
    );
  }
}

const mapStateToProps = ({ schools, students })=> {
  return {
    schools,
    students
  };
};

const mapDispatchToProps = (dispatch, { history })=> {
  return {
    dispatchDeleteSchool: (school)=> {
      dispatch(deleteSchool_thunk(school));
      history.push('/schools');
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme()(withStyles(styles)(SchoolsList)));

