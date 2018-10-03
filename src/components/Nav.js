import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { withStyles, Paper, Typography, List, ListItem, ListItemText, Badge, Tabs, Tab } from '@material-ui/core';


const Home = ()=> <Link to/>

const styles = {
  badge: {
    top: -20,
    right: -15,
  }
};

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      value: 0
    };
    this.handleNav = this.handleNav.bind(this);
  }

  handleNav(event, value) {
    this.setState({ value });
  };


  render() {
    const { schools, students, classes } = this.props;
    return (
      <Fragment>

      <Tabs
          value={this.state.value}
          onChange={this.handleNav}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Schools" component={Link} to='/schools'/>
          <Tab label="Students" component={Link} to='/students'/>
        </Tabs>

      <List>

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


      </List>




    </Fragment>
    )
  }
}

const mapStateToProps = ({ schools, students })=> {
  return {
    schools,
    students
  };
};

export default connect(mapStateToProps)(withStyles(styles)(Nav));

