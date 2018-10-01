import React, { Component } from 'react';

import { connect } from 'react-redux';

import { createStudent_thunk, createStudentRandom_thunk } from '../store/thunks';

import { getSchool } from '../utils';


import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';


class StudentsCreate extends Component {

  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      gpa: 0,
      schoolId: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.schoolId ? this.setState({ schoolId: this.props.schoolId }) : null;
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
      schoolId: this.state.schoolId || null
    }
    this.props.createStudent(student)
  }

  render() {
    const { schools, createStudentRandom } = this.props;
    const { firstName, lastName, gpa, schoolId } = this.state;
    const { handleChange, handleSubmit } = this;
    const isEmpty = firstName && lastName ? false : true;
    return (
      <div>
        <Input placeholder='Test firstName...' value={firstName}/>
        <h2>Create A Student</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input name='firstName' value={firstName} placeholder='First Name' onChange={handleChange}/>
          </div>
          <div>
            <input name='lastName' value={lastName} placeholder='Last Name' onChange={handleChange}/>
          </div>
          
          <div>
            <input type='range' min='0' max='4' step='.01' name='gpa' value={gpa} onChange={handleChange}/>
            GPA: {gpa}
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
          <button disabled={isEmpty}>Save</button> 
        </form>
        <hr/>
        <button onClick={createStudentRandom}>Create Random Student</button>
      </div>
    )
  }

}

const mapStateToProps = ({ schools }, { match } )=> {
  return {
    schools,
    schoolId: match.params.schoolId,
  };
};

const mapDispatchToProps = (dispatch, { history })=> {
  return {
    createStudent: (student)=> {
      dispatch(createStudent_thunk(student));
      history.push('/students');
    },
    createStudentRandom: ()=> {
      dispatch(createStudentRandom_thunk());
      history.push('/students');
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentsCreate);

