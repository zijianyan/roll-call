import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { deleteStudent_thunk, updateStudent_thunk } from '../store/thunks';
import { getSchool, getStudent, findSchoolByStudent } from '../utils';

class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      gpa: '',
      id: this.props.id,
      schoolId: -1
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log('Student, componentDidMount, this.props.student:', this.props.student);
    this.setState(this.props.student)
  }

  componentDidUpdate(prevProps) {
    console.log('Student, componentDidUpdate, this.props.student:', this.props.student);
    if (prevProps.student !== this.props.student) {
      this.setState(this.props.student)
    }
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
      gpa: this.state.gpa*1,
      schoolId: this.state.schoolId*1 || null,
      school: getSchool(this.props.schools, this.state.schoolId*1) || {}
    }
    console.log('handleSubmit, student:', student);
    this.props.updateStudent(student);
  }

  render() {
    console.log('Student, render, this.props:', this.props);
    const { id, student, deleteStudent, schools, updateStudent } = this.props;
    const { firstName, lastName, gpa, schoolId } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <div>
        
        <h2>{student ? `${student.firstName} ${student.lastName} - GPA: ${student.gpa}` : null }</h2>
        {
          this.props.school
            ? `Student school: ${this.props.school.name}`
            : 'Student has no school'

          // student && student.school && student.school.name
          //   ? `Student school: ${student.school.name}`
          //   : 'Student has no school'
        }
        <p>Student id: {id}</p>
        

        <h3>Edit Student</h3>

        <form onSubmit={handleSubmit}>
          <div>
            <input name='firstName' value={firstName} onChange={handleChange} placeholder='First Name'/>
          </div>
          <div>
            <input name='lastName' value={lastName} onChange={handleChange} placeholder='Last Name'/>
          </div>
          <div>
            <input name='gpa' value={gpa} onChange={handleChange} placeholder='GPA'/>
          </div>
          <div>
            <select name='schoolId' value={schoolId} onChange={handleChange}>
              <option value=''>--no school--</option>
              {
                schools.map( school => 
                  <option key={school.id} value={school.id}>{school.name}</option>
                )
              }
            </select>
          </div>
          <button>Save</button>
        </form>
        
        <button onClick={()=> deleteStudent(student)}>Delete Student</button>
      </div>
    )
  }
}



const mapStateToProps = ({ students, schools }, { match })=> {
  const student = getStudent(students, match.params.id*1);
  const school = findSchoolByStudent(schools, student);
  return {
    id: match.params.id*1,
    student,
    schools,
    students,
    school
  }
}

const mapDispatchToProps = (dispatch, { history })=> {
  return {
    updateStudent: (student)=> dispatch(updateStudent_thunk(student)),
    deleteStudent: (student)=> {
      dispatch(deleteStudent_thunk(student));
      history.push('/students');
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Student);

