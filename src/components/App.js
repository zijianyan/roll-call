import React, { Component, Fragment } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { loadSchools_thunk, loadStudents_thunk } from '../store/thunks';

import Header from './Header';
import SchoolsList from './School/SchoolsList';
import StudentsList from './Student/StudentsList';
import School from './School/School';
import Student from './Student/Student';
import Footer from './Footer';

import { withStyles, Paper, Grid } from '@material-ui/core';

const styles = {
  root: {
    margin: 20,
    padding: 50,
    maxWidth: 1000,
    minWidth: 600
  }
};

class App extends Component {

  componentDidMount() {
    this.props.init();
  }

  render() {
    const { classes } = this.props;
    const { root } = classes;
    return (
      <Fragment>
        <Grid container justify='center'>
          <Paper className={root} elevation={16}>
            <Router>
              <Fragment>
                <Route path ='/' component={Header}/>
                <Route exact path='/schools' component={SchoolsList}/>
                <Route exact path='/students' component={StudentsList}/>
                <Route path='/schools/:id' component={School}/>
                <Route path='/students/:id' component={Student}/>
                <Route path ='/' component={Footer}/>
              </Fragment>
            </Router>
          </Paper>
        </Grid>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    init: ()=> {
      dispatch(loadSchools_thunk());
      dispatch(loadStudents_thunk());
    }
  };
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(App));