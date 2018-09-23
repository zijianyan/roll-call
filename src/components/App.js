import React, { Component, Fragment } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { loadSchools_thunk, loadStudents_thunk } from '../store/thunks';

import SchoolsList from './SchoolsList';
import StudentsList from './StudentsList';
import Nav from './Nav';
import StudentsCreate from './StudentsCreate';
import SchoolsCreate from './SchoolsCreate';

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
            <Route exact path='/schools' component={SchoolsList}/>
            <Route exact path='/students' component={StudentsList}/>
            <Route path='/schools/create' component={SchoolsCreate}/>
            <Route path='/students/create' component={StudentsCreate}/>
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