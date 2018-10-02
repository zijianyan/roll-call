import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteStudent_thunk } from '../store/thunks';

import { getSchool } from '../utils';

import { withStyles, Typography, List, ListItem, ListItemText, Chip, Grid, Avatar, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, IconButton, Divider, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';


const styles = {
  avatar: {
    'margin-right': '15px'
  }
}

const StudentsList = ({ students, deleteStudent, schools, classes })=> {
  return (
    <Fragment>
      


      <Paper >
        <Typography variant='display1'>Students</Typography>
        <Divider />
        <Table >

          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell numeric>GPA</TableCell>
              <TableCell>School</TableCell>
              <TableCell /> 
            </TableRow>
          </TableHead>

          <TableBody>
            {students.map(student => {
              const { id, firstName, lastName, gpa, schoolId } = student;
              const school = getSchool(schools, schoolId);
              return (
                <TableRow key={id} hover={true} >
                  <TableCell>
                    <Button component={Link} to={`/students/${id}`}><Avatar src={student.imageUrl} className={classes.avatar}/>{firstName} {lastName}</Button>
                  </TableCell>
                  <TableCell numeric>{gpa}</TableCell>
                  <TableCell >{school ? <Button component={Link} to={`/schools/${school.id}`}>{school.name}</Button> : null }</TableCell>
                  <TableCell><Tooltip title='Delete'><IconButton onClick={()=> deleteStudent(student)}><DeleteIcon /></IconButton></Tooltip></TableCell>
                </TableRow>
              );
            })}
          </TableBody>

        </Table>
      </Paper>
    </Fragment>
  );
};

const mapStateToProps = ({ students, schools })=> {
  return {
    students,
    schools
  };
};

const mapDispatchToProps = (dispatch)=> {
  return {
    deleteStudent: (student)=> dispatch(deleteStudent_thunk(student))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StudentsList));