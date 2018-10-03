import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createStudent_thunk, updateStudent_thunk } from '../store/thunks';
import { withStyles, Dialog, Button, DialogTitle, DialogContent, DialogContentText, DialogActions, IconButton, Tooltip, TextField, Select, Typography, MenuItem, FormGroup, FormControl, InputLabel } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { Slider } from '@material-ui/lab';

const styles = {
  select: {
    minWidth: 200
  }

}

class StudentFormDialog extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      gpa: 0,
      schoolId: 0
    };
    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.toggleEditing = this.toggleEditing.bind(this);
    this.saveStudent = this.saveStudent.bind(this);
    this.handleSlider = this.handleSlider.bind(this);
  }

  componentDidMount() {
    this.props.schoolId ? this.setState({ schoolId: this.props.schoolId }) : null; // when creating, prefill schoolId
    this.props.student ? this.setState(this.props.student) : null; // when updating, prefill student
  }

  handleChange(ev) {
    // console.log('ev.target.name', ev.target.name);
    // console.log('ev.target.value', ev.target.value);
    this.setState({ [ev.target.name]: ev.target.value });
  }

  handleSlider(ev, gpa) {
    this.setState({ gpa });
  }

  saveStudent() {
    // ev.preventDefault();
    const student = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      gpa: this.state.gpa*1,
      schoolId: this.state.schoolId || null,
    };
    // console.log('saveStudent, student:', student);
    this.props.student ? student.id = this.props.student.id : null;
    const { type, createStudent, updateStudent } = this.props;
    type === 'create' ? createStudent(student) : null;
    type === 'update' ? updateStudent(student) : null;
    !type ? console.log('StudentFormDialog needs a "type" prop with value "create" or "update"') : null;
    // this.props.updateStudent(student);
    this.props.toggleFormDialog();
  }


  render() {
    const { handleChange, handleSubmit, saveStudent, handleSlider } = this;
    const { firstName, lastName, gpa, schoolId, editing } = this.state;
    const { type, schools, formDialog, toggleFormDialog, updateStudent, createStudent, student, classes } = this.props;
    const isEmpty = firstName && lastName ? false : true;
    return (
      <Dialog open={formDialog}>
        <DialogTitle>{ type === 'create' ? 'Create Student' : 'Edit Student'}</DialogTitle>
        <DialogContent>

          <FormControl>
            <div>
              <TextField name='firstName' value={firstName} label="First Name" onChange={handleChange} autoFocus/>
            </div>

            <div>
              <TextField name='lastName' value={lastName} label="Last Name" onChange={handleChange}/>
            </div>

            <div>
              <Typography id='slider' variant='caption'>GPA: {gpa.toFixed(2)}</Typography>
              <Slider name='gpa' value={gpa} aria-labelledby='slider' min={0} max={4} step={0.01} onChange={handleSlider}/>
            </div>

            <div>
              <Typography id='school-select' variant='caption'>School</Typography>
              <Select value={schoolId || ''} onChange={handleChange} inputProps={{
                name: 'schoolId',
                id: 'school-select',
              }} className={classes.select}>
                <MenuItem value=''  ><em>None</em></MenuItem>
                {
                  schools.map( school => 
                    <MenuItem key={school.id} value={school.id}>{school.name}</MenuItem>
                  )
                }
              </Select>
            </div>
          </FormControl>

        



        </DialogContent>
        <DialogActions>
          <Button onClick={toggleFormDialog}>
            Cancel
          </Button>
          <Button onClick={saveStudent}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
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
      // history.push('/students');
      // window.scrollTo(0,document.body.scrollHeight);
    },
    updateStudent: (student)=> {
      dispatch(updateStudent_thunk(student));
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StudentFormDialog));


