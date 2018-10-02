import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createStudent_thunk, updateStudent_thunk } from '../store/thunks';
import { Dialog, Button, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

class StudentForm extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      gpa: 0,
      schoolId: '',
      editing: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);
  }

  componentDidMount() {
    this.props.schoolId ? this.setState({ schoolId: this.props.schoolId }) : null; // when creating, prefill schoolId
    this.props.student ? this.setState(this.props.student) : null; // when updating, prefill student
  }

  // componentDidUpdate(prevProps) { //unecessary now that this.props.student is being sent in from Student with each render?
  //   if (prevProps.student !== this.props.student) {
  //     this.setState(this.props.student);
  //   }
  // }

  toggleEditing() {
    this.setState({ editing: !this.state.editing });
  }

  handleChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  handleSubmit(ev) {
    ev.preventDefault();
    const student = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      gpa: this.state.gpa*1,
      schoolId: this.state.schoolId || null,
    };
    this.props.student ? student.id = this.props.student.id : null;
    const { type, createStudent, updateStudent } = this.props;
    type === 'create' ? createStudent(student) : null;
    type === 'update' ? updateStudent(student) : null;
  }

  render() {
    const { handleChange, handleSubmit, toggleEditing } = this;
    const { firstName, lastName, gpa, schoolId, editing } = this.state;
    const { schools } = this.props;
    const isEmpty = firstName && lastName ? false : true;

    return (
      <div>
        <Button onClick={toggleEditing}>open dialog</Button>
        <Dialog open={editing}>
          <DialogTitle>Edit Dialog</DialogTitle>
          <DialogContent>
            <DialogContentText>
              This is the content text.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={toggleEditing}>Cancel</Button>
            <Button>Save</Button>
          </DialogActions>
        </Dialog>
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
        


      </div>
    );
  }
}

const mapStateToProps = ({ schools })=> {
  return {
    schools
  };
};

const mapDispatchToProps = (dispatch, { history })=> {
  return {
    createStudent: (student)=> {
      dispatch(createStudent_thunk(student));
      history.push('/students');
    },
    updateStudent: (student)=> {
      dispatch(updateStudent_thunk(student));
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(StudentForm);