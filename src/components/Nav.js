import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { withStyles, Paper, Typography, List, ListItem, ListItemText, Badge, Tabs, Tab, Fade } from '@material-ui/core';


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
      <Fade in>
      <Tabs
          value={this.state.value}
          onChange={this.handleNav}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          
          {
            schools.length ? (
              
                <Tab label={`Schools (${schools.length})`} component={Link} to='/schools'/>

            ) : (
              <Tab label='Schools' component={Link} to='/schools'/>
            )
          }

          {
            students.length ? (
              
                <Tab label={`Students (${students.length})`} component={Link} to='/students'/>

            ) : (
              <Tab label='Students' component={Link} to='/students'/>
            )
          }
        </Tabs>

      </Fade>
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

