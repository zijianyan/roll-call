import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { deleteSchool_thunk } from '../store/thunks';
import { findEnrolled } from '../utils';

import { List, ListItem, ListItemText, Typography, Button, ListItemSecondaryAction, Chip, IconButton, Badge, Paper, Table, TableHead, TableBody, TableRow, TableCell, Divider, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const SchoolsList = ({ schools, deleteSchool, students })=> {
  return (
    <Fragment>
      


      <Paper >
        <Typography variant='display1'>Schools</Typography>
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
            {schools.map(school => {
              const { id, name, address } = school;
              const enrolled = findEnrolled(students, id);
              return (
                <TableRow key={id} hover={true} >
                  <TableCell>
                    <Button component={Link} to={`/schools/${id}`}>{name}</Button>
                  </TableCell>
                  <TableCell numeric>{ enrolled.length ? enrolled.length : null }</TableCell>
                  <TableCell >{school.address}</TableCell>
                  <TableCell><Tooltip title='Delete'><IconButton onClick={()=> deleteSchool(school)}><DeleteIcon /></IconButton></Tooltip></TableCell>
                </TableRow>
              );
            })}
          </TableBody>

        </Table>
      </Paper>



      
    </Fragment>
  );
};

const mapStateToProps = ({ schools, students })=> {
  return {
    schools,
    students
  };
};

const mapDispatchToProps = (dispatch)=> {
  return {
    deleteSchool: (school)=> { dispatch(deleteSchool_thunk(school));}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SchoolsList);

