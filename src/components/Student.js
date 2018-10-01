import React, { Component } from 'react';

import { connect } from 'react-redux';
import { deleteStudent_thunk, updateStudent_thunk } from '../store/thunks';
import { getSchool, getStudent } from '../utils';
import { Link } from 'react-router-dom';

class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      gpa: '',
      schoolId: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState(this.props.student);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.student !== this.props.student) {
      this.setState(this.props.student);
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
      id: this.props.student.id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      gpa: this.state.gpa*1,
      schoolId: this.state.schoolId || null
    };
    this.props.updateStudent(student);
  }

  render() {
    const { student, deleteStudent, schools, school, unenroll } = this.props;
    const { firstName, lastName, gpa, schoolId } = this.state;
    const { handleChange, handleSubmit } = this;

    const isEmpty = firstName && lastName ? false : true;

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

        <div id='student-image-container'>
          <img src={student.imageUrl} id='student-image'/>
        </div>

        {
          school
            ? (<p>Enrolled in <Link to={`/schools/${school.id}`}>{school.name}</Link> <button onClick={()=> unenroll(student)}>Unenroll</button></p>)
            : 'Not enrolled'
        }
        
        <h3>Edit Student</h3>

        <form onSubmit={handleSubmit}>
          <div>
            <input name='firstName' value={firstName} onChange={handleChange} placeholder='First Name'/>
          </div>
          <div>
            <input name='lastName' value={lastName} onChange={handleChange} placeholder='Last Name'/>
          </div>

          <div>
            <input name='gpa' type='range' value={gpa} min='0' max='4' step='.01' onChange={handleChange}/>
            GPA: {gpa}
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
          <button disabled={isEmpty}>Save</button>
        </form>
        <hr/>
        <button onClick={()=> deleteStudent(student)}>Delete Student</button>
      </div>
    )
  }
}



const mapStateToProps = ({ students, schools }, { match })=> {
  const student = getStudent(students, match.params.id); //remove *1 type coercion if using UUID
  // if (student) {
  //   const school = getSchool(schools, student.schoolId);
  // }
  // const school = student ? getSchool(schools, student.schoolId) : null
  // console.log('Student, mapStateToProps, schools:', schools);
  // console.log('Student, mapStateToProps, match.params.id*1:', match.params.id*1);
  // console.log('Student, mapStateToProps, school:', school);
  return {
    student,
    school: student ? getSchool(schools, student.schoolId) : null,
    schools
  };
};

const mapDispatchToProps = (dispatch, { history })=> {
  return {
    updateStudent: (student)=> {
      dispatch(updateStudent_thunk(student));
    },
    deleteStudent: (student)=> {
      dispatch(deleteStudent_thunk(student));
      history.push('/students');
    },
    unenroll: (student)=> {
      dispatch(updateStudent_thunk({...student, schoolId: null}))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Student);

