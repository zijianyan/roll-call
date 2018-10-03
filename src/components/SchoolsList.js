import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { deleteSchool_thunk } from '../store/thunks';
import { findEnrolled } from '../utils';

import { withStyles, List, ListItem, ListItemText, Typography, Button, ListItemSecondaryAction, Chip, IconButton, Badge, Paper, Table, TableHead, TableBody, TableRow, TableCell, Divider, Tooltip } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import { AddCircle } from '@material-ui/icons';

import SchoolFormDialog from './SchoolFormDialog';
import SchoolDeleteDialog from './SchoolDeleteDialog';

const styles = {
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
    return (
      <Fragment>
      
        <Paper className={classes.paper}>
          <Typography variant='display1' className={classes.heading}>Schools</Typography>
          <Divider />
          <Table >

            <TableHead>
              <TableRow>
                <TableCell>School</TableCell>
                <TableCell numeric>Students Enrolled</TableCell>
                <TableCell>Address</TableCell>
                <TableCell /> 
              </TableRow>
            </TableHead>

            <TableBody>

              <TableRow hover={true}>
                <TableCell colSpan={4}>
                  <Button onClick={toggleFormDialog} className={classes.cellButton}>
                    
                    <AddCircle color='primary' className={classes.addCircle}/>
            
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
                      <Button component={Link} to={`/schools/${id}`} className={classes.cellButton}>{name}</Button>
                    </TableCell>
                    <TableCell numeric>{ enrolled.length ? enrolled.length : null }</TableCell>
                    <TableCell >{school.address}</TableCell>
                    <TableCell><Tooltip title='Delete'><IconButton onClick={()=> toggleDeleteDialog(school)}><DeleteIcon /></IconButton></Tooltip></TableCell>
                  </TableRow>
                );
              })}
            </TableBody>

          </Table>
        </Paper>

        <SchoolFormDialog type='create' formDialog={formDialog} toggleFormDialog={toggleFormDialog}/>
        <SchoolDeleteDialog deleteDialog={deleteDialog} toggleDeleteDialog={toggleDeleteDialog} school={schoolToDelete} deleteSchool={deleteSchool}/>
        
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SchoolsList));

