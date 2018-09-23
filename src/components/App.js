import React, { Component, Fragment } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { loadSchools_thunk, loadStudents_thunk } from '../store/thunks';

import SchoolList from './SchoolList';
import StudentList from './StudentList';
import Nav from './Nav';

class App extends Component {
  constructor() {
    super();
    this.state = {}
  }

  componentDidMount() {
    this.props.init();
  }

  render() {
    return (
      <div>
        <h1>Acme Schools and Students</h1>
        <hr />
        <Router>
          <Fragment>
            <Nav />
            <Route path='/schools' component={SchoolList}/>
            <Route path='/students' component={StudentList}/>
          </Fragment>
        </Router>
      </div>
    )
  }
}

App.defaultProps = {
  schools: [],
  students: []
}
App.propTypes = {
  schools: PropTypes.array,
  students: PropTypes.array
}


const mapDispatchToProps = (dispatch)=> {
  return {
    init: ()=> {
      dispatch(loadSchools_thunk()),
      dispatch(loadStudents_thunk())
    }
  }
}

export default connect(null, mapDispatchToProps)(App);