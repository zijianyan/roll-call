import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { deleteSchool_thunk } from '../store/thunks';
import { findEnrolled } from '../utils';

import { List, ListItem, ListItemText, Typography, Button, ListItemSecondaryAction, Chip, IconButton, Badge, Paper, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const SchoolsList = ({ schools, deleteSchool, students })=> {
  return (
    <Fragment>
      <Typography variant='display1'>Schools</Typography>


      <Paper >
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
                  <TableCell><IconButton onClick={()=> deleteSschool(school)}><DeleteIcon /></IconButton></TableCell>
                </TableRow>
              );
            })}
          </TableBody>

        </Table>
      </Paper>

      <List>
        {
          schools.map(school => {
            const enrolledStudents = findEnrolled(students, school.id);
            return (
              <ListItem button key={school.id} component={Link} to={`/schools/${school.id}`}>
                
                {
                  enrolledStudents.length ? (
                    <Badge badgeContent={enrolledStudents.length} color='secondary'>
                      <ListItemText primary={school.name} />
                    </Badge>
                  ) : (
                    <ListItemText primary={school.name} />
                  )
                }
                


                <ListItemSecondaryAction>
                  <IconButton onClick={()=> deleteSchool(school)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
                
              </ListItem>
            );
          })
        }
      </List>


      
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



// <ul>
//         {
//           schools.map( school => {
//             const enrolledStudents = findEnrolled(students, school.id);
//             return (
//               <li key={school.id}>
//                 <Link to={`/schools/${school.id}`}>
//                   {school.name}
//                   {enrolledStudents.length ? ` (${enrolledStudents.length})` : null}
//                 </Link>
//                 <div>
//                   <button onClick={()=> deleteSchool(school)}>x</button>
//                 </div>
//               </li>              
//             );
//           })
//         }
//       </ul>