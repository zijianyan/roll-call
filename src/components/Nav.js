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
      path: null
    };
    this.handleNav = this.handleNav.bind(this);
  }

  componentDidMount() {
    this.setState({ path: this.props.path });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.path !== this.props.path) {
      this.setState({ path: this.props.path });
    }
  }

  handleNav(event, value) {
    // console.log(`set tab to ${value}`);
    this.setState({ path: value || null});
  }

  render() {
    console.log('Nav, this.props:', this.props);
    console.log('Nav, this.state:', this.state);
    const { schools, students, classes } = this.props;
    const { path } = this.state;
    const { handleNav } = this;
    const { tabs } = classes;
    return (
      <Fragment>
        <Tabs value={path} onChange={handleNav} className={tabs} centered>
          { schools.length
            ? <Tab label={`Schools (${schools.length})`} component={Link} to='/schools' value='/schools'/>
            : <Tab label='Schools' component={Link} to='/schools' value='/schools'/> }
          { students.length
            ? <Tab label={`Students (${students.length})`} component={Link} to='/students' value='/students'/>
            : <Tab label='Students' component={Link} to='/students' value='/students'/> }
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