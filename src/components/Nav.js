import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { withStyles, Paper, Typography, List, ListItem, ListItemText, Badge } from '@material-ui/core';


const Home = ()=> <Link to/>

const styles = {
  badge: {
    top: -20,
    right: -15,
  }
};


const Nav = ({ schools, students, classes })=> {
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

export default connect(mapStateToProps)(withStyles(styles)(Nav));


        // <ListItem button component={Link} to='/students/create'>
        //   <ListItemText primary='Create A Student' />
        // </ListItem>