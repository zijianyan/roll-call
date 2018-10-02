import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteStudent_thunk } from '../store/thunks';

import { getSchool } from '../utils';

import { withStyles, Typography, List, ListItem, ListItemText, Chip, Grid, Avatar, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';


const styles = {
  avatar: {
    'margin-right': '15px'
  }
}

const StudentsList = ({ students, deleteStudent, schools, classes })=> {
  return (
    <Fragment>
      <Typography variant='display1'>Students</Typography>


      <Paper >
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
                  <TableCell><IconButton onClick={()=> deleteStudent(student)}><DeleteIcon /></IconButton></TableCell>
                </TableRow>
              );
            })}
          </TableBody>

        </Table>
      </Paper>



      <List>
        {
          students.map(student => {
            const { id, firstName, lastName, gpa, schoolId } = student;
            const school = getSchool(schools, schoolId);
            return (
              <ListItem button key={student.id} component={Link} to={`/students/${id}`}>
                <Avatar src={student.imageUrl}/>
                <ListItemText primary={`${firstName} ${lastName}`}/>
                <ListItemText>more text</ListItemText>
              </ListItem>
            );
          })
        }
      </List>
      <ul>
        {
          students.map( student => {
            const { id, firstName, lastName, gpa, schoolId } = student;
            const school = getSchool(schools, schoolId);
            return (
              <li key={id}>
                <Link to={`/students/${id}`}>{firstName} {lastName}</Link>
                - gpa: {gpa}
                {
                  school
                    ? (<span> - school: {<Link to={`/schools/${school.id}`}>{school.name}</Link>}</span>) 
                    : null
                }
                <div>
                  <button onClick={()=> deleteStudent(student)}>x</button>
                </div>
              </li>
            );
          })
        }
      </ul>
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