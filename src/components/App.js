import React, { Component, Fragment } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { loadSchools_thunk, loadStudents_thunk, reset_thunk } from '../store/thunks';

import SchoolsList from './SchoolsList';
import StudentsList from './StudentsList';
import Nav from './Nav';
import StudentsCreate from './StudentsCreate';
import SchoolsCreate from './SchoolsCreate';
import School from './School';
import Student from './Student';

class App extends Component {
  constructor() {
    super();
    this.state = {}
  }

  componentDidMount() {
    this.props.init();
  }

  render() {
    const { reset } = this.props;
    return (
      <div>
        <h1>Acme Schools and Students</h1>
        <button onClick={reset}>Reset Database</button>
        <hr />
        <Router>
          <Fragment>
            <Nav />
            <Route exact path='/schools' component={SchoolsList}/>
            <Route exact path='/students' component={StudentsList}/>
            <Switch>
              <Route path='/schools/create' component={SchoolsCreate}/>
              <Route path='/schools/:id' component={School}/>
            </Switch>
            <Switch>
              <Route path='/students/create' component={StudentsCreate}/>
              <Route path='/students/:id' component={Student}/>
            </Switch>
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
    },
    reset: ()=> {
      dispatch(reset_thunk())
    }
  }
}

export default connect(null, mapDispatchToProps)(App);