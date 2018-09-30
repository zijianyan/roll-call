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
      gpa: 0,
      schoolId: ''
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
    const student = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      gpa: this.state.gpa*1,
      schoolId: this.state.schoolId*1 || null
    }
    this.props.createStudent(student)
  }

  render() {
    const { schools } = this.props;
    const { firstName, lastName, gpa, schoolId } = this.state;
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
          <div>
            <select name='schoolId' value={schoolId} onChange={handleChange}>
              <option value=''>--no school--</option>
              {
                schools.map( school => 
                  <option value={school.id} key={school.id}>{school.name}</option>
                )
              }
            </select>
          </div>
          <button>Save</button> 
        </form>
      </div>
    )
  }

}

const mapStateToProps = ({ schools })=> {
  return {
    schools
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

export default connect(mapStateToProps, mapDispatchToProps)(StudentsCreate);