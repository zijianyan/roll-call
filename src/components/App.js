import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { loadSchools_thunk } from '../store/thunks';

import SchoolList from './SchoolList';
import StudentList from './StudentList';

class App extends Component {
  constructor() {
    super();
    this.state = {}
  }

  componentDidMount() {
    this.props.loadSchools();
  }

  render() {
    return (
      <div>
        <h1>Acme Schools and Students</h1>
        <hr />
        <SchoolList />
        <StudentList />
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
    loadSchools: ()=> {
      return dispatch(loadSchools_thunk())
    }
  }
}

export default connect(null, mapDispatchToProps)(App);