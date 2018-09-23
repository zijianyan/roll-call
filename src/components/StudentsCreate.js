import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { createStudent_thunk } from '../store/thunks';

class StudentsCreate extends Component {

  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      gpa: 0
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  handleSubmit(ev) {
    ev.preventDefault();
    const student = this.state;
    this.props.createStudent(student)
  }

  render() {
    const { firstName, lastName, gpa } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <div>
        <h2>Create A Student</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input name='firstName' value={firstName} placeholder='First Name' onChange={handleChange}/>
          </div>
          <div>
            <input name='lastName' value={lastName} placeholder='Last Name' onChange={handleChange}/>
          </div>
          <div>
            <input name='gpa' value={gpa} placeholder='GPA' onChange={handleChange}/>
          </div>
          <button>Save</button> 
        </form>
      </div>
    )
  }

}

const mapDispatchToProps = (dispatch, { history })=> {
  return {
    createStudent: (student)=> {
      dispatch(createStudent_thunk(student));
      history.push('/students');
    }
  }
}

export default connect(null, mapDispatchToProps)(StudentsCreate);