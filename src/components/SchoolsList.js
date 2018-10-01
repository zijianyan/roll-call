import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { deleteSchool_thunk } from '../store/thunks';
import { findEnrolled } from '../utils';

import { List, ListItem, ListItemText, Typography, Button, ListItemSecondaryAction } from '@material-ui/core';

const SchoolsList = ({ schools, deleteSchool, students })=> {
  return (
    <Fragment>
      <Typography variant='display1'>Schools</Typography>


      <List>
        {
          schools.map(school => {
            const enrolledStudents = findEnrolled(students, school.id);
            return (
              <ListItem button key={school.id} component={Link} to={`/schools/${school.id}`}>
                <ListItemText primary={school.name} />
                <ListItemText primary={enrolledStudents.length ? ` (${enrolledStudents.length})` : null}/>
                <ListItemSecondaryAction>
                  <Button onClick={()=> deleteSchool(school)}>Delete</Button>
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