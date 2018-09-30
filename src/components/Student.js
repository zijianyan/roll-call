import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { deleteStudent_thunk, updateStudent_thunk, updateSchool_thunk, unenrollStudent_thunk } from '../store/thunks';
import { getSchool, getStudent } from '../utils';
import { Link } from 'react-router-dom';

class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      gpa: '',
      id: this.props.id,
      schoolId: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // console.log('Student, componentDidMount, this.props.student:', this.props.student);
    this.setState(this.props.student)
  }

  componentDidUpdate(prevProps) {
    // console.log('Student, componentDidUpdate, this.props.student:', this.props.student);
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
    const previousSchool = this.props.school;
    // const nextSchool = student.school;
    console.log('handleSubmit, student:', student);

    // this.props.unenrollStudent(previousSchool, student);
    this.props.school ? this.props.unenroll(this.props.school, student) : null;
    // this.props.enrollStudent(nextSchool, student)
    this.props.updateStudent(student);
  }

  render() {
    // console.log('Student, render, this.props:', this.props);
    const { id, student, deleteStudent, schools, updateStudent, school, unenroll } = this.props;
    const { firstName, lastName, gpa, schoolId } = this.state;
    const { handleChange, handleSubmit } = this;

    if (!student) {
      return (
        <div>
          Student not found
        </div>
      )
    }

    return (
      <div>
        
        <h2>{student ? `${student.firstName} ${student.lastName} - GPA: ${student.gpa}` : null }</h2>
        {
          school
            ? (<p>Enrolled in <Link to={`/schools/${school.id}`}>{school.name}</Link></p>)
            : 'Student has no school'
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
            <select name='schoolId' value={schoolId || ''} onChange={handleChange}>
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
  const school = student ? getSchool(schools, student.schoolId) : null;
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
    updateStudent: (student)=> {
      dispatch(updateStudent_thunk(student));
      //need to update old school (if any) and update new school (if any)
    },
    deleteStudent: (student)=> {
      dispatch(deleteStudent_thunk(student));
      history.push('/students');
    },
    unenroll: (school, student)=> {
      console.log('Student, unenroll, school:', school);
      dispatch(unenrollStudent_thunk(school, student));
    }
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Student);

