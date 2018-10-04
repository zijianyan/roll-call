import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core';
import { Tabs, Tab } from '@material-ui/core';

const styles = {
  tabs: {
    marginTop: 10,  
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
  }

  render() {
    const { schools, students, classes } = this.props;
    return (
      <Fragment>
        <Tabs value={this.state.value} onChange={this.handleNav} className={classes.tabs} centered>
          { schools.length
            ? <Tab label={`Schools (${schools.length})`} component={Link} to='/schools'/>
            : <Tab label='Schools' component={Link} to='/schools'/> }
          { students.length
            ? <Tab label={`Students (${students.length})`} component={Link} to='/students'/>
            : <Tab label='Students' component={Link} to='/students'/> }
        </Tabs>
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

export default connect(mapStateToProps)(withStyles(styles)(Nav));

//bug in nav tab... on page refresh, tab returns to value 0...