import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { deleteStudent_thunk } from '../store/thunks';
import { updateStudent_thunk } from '../store/thunks';

import { getSchool } from '../utils';

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
    this.setState(this.props.student)
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
      schoolId: this.state.schoolId*1,
      school: getSchool(this.props.schools, this.state.schoolId*1)
    }
    console.log('handleSubmit, student:', student);
    this.props.updateStudent(student);
  }

  render() {
    const { id, student, deleteStudent, schools, updateStudent } = this.props;
    const { firstName, lastName, gpa, schoolId } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <div>
        
        <h2>{student ? `${student.firstName} ${student.lastName} - GPA: ${student.gpa}` : null }</h2>
        {
          student && student.school
          ? `Student school: ${student.school.name}`
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
            <select name='schoolId' value={schoolId} onChange={handleChange}>
              <option>--select school--</option>
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

const getStudent = (students, id)=> {
  return students.find(student => student.id === id)
}

const mapStateToProps = ({ students, schools }, { match })=> {
  return {
    id: match.params.id*1,
    student: getStudent(students, match.params.id*1),
    schools
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




// <label htmlFor='school-choice'>School:</label>
//             <input type='text' id='school-choice' name='schoolId' list='school-datalist' onChange={handleChange}/>
//             <datalist id='school-datalist' placeholder='School'>
//               {
//                 schools.map( school => (
//                   <option key={school.id} value={school.id}> {school.name} </ option>
//                 ))
//               }
//             </datalist>