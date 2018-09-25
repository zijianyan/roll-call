import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { updateStudent_thunk } from '../store/thunks';

class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      gpa: 0,
      id: this.props.id
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
      ...this.state,
      gpa: this.state.gpa*1
    }
    console.log('handleSubmit, student:', student);
    this.props.updateStudent(student);
  }

  render() {
    const { id, student } = this.props;
    const { firstName, lastName, gpa } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <div>
        
        <h2>{student ? `${student.firstName} ${student.lastName} - GPA: ${student.gpa}` : null }</h2>
        <p>Student id: {id}</p>

        <h3>Edit Student</h3>
        <form onSubmit={handleSubmit}>
          <input name='firstName' value={firstName} onChange={handleChange}/>
          <input name='lastName' value={lastName} onChange={handleChange}/>
          <input name='gpa' value={gpa} onChange={handleChange}/>
          <button>Save</button>
        </form>
      </div>
    )
  }
}

const getStudent = (students, id)=> {
  return students.find(student => student.id === id)
}

const mapStateToProps = ({ students }, { match })=> {
  return {
    id: match.params.id*1,
    student: getStudent(students, match.params.id*1)
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    updateStudent: (student)=> dispatch(updateStudent_thunk(student))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Student);