import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Paper, Typography, List, ListItem, ListItemText, Badge } from '@material-ui/core';


const Home = ()=> <Link to/>


const Nav = ({ schools, students })=> {
  return (
    <Fragment>

      <List>
        <ListItem button component={Link} to='/'>
          <ListItemText primary='Home' />
        </ListItem>
        <ListItem button component={Link} to='/schools'>
          {
            schools.length ? (
              <Badge badgeContent={schools.length} color='primary'>
                <ListItemText primary='Schools' />
              </Badge>
            ) : (
              <ListItemText primary='Schools' />
            )
          }
        </ListItem>
        <ListItem button component={Link} to='/students'>
          {
            students.length ? (
              <Badge badgeContent={students.length} color='primary'>
                <ListItemText primary='Students' />
              </Badge>
            ) : (
              <ListItemText primary='Students' />
            )
          }
        </ListItem>
        <ListItem button component={Link} to='/schools/create'>
          <ListItemText primary='Create A School' />
        </ListItem>
        <ListItem button component={Link} to='/students/create'>
          <ListItemText primary='Create A Student' />
        </ListItem>
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

export default connect(mapStateToProps)(Nav);



      // <ul>
      //   <li>
      //     <Link to='/'>Home</Link>
      //   </li>
      //   <li>
      //     <Link to='/schools'>Schools ({schools.length})</Link>
      //   </li>
      //   <li>
      //     <Link to='/students'>Students ({students.length})</Link>
      //   </li>
      //   <li>
      //     <Link to='/schools/create'>Create A School</Link>
      //   </li>
      //   <li>
      //     <Link to='/students/create'>Create A Student</Link>
      //   </li>
      // </ul>
