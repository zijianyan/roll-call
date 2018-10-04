import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { getSchool } from '../../utils';
import { createStudent_thunk, updateStudent_thunk, createStudentRandom_thunk } from '../../store/thunks';

import { withStyles, Dialog, Button, DialogTitle, DialogContent, DialogContentText, DialogActions, IconButton, Tooltip, TextField, Select, Typography, MenuItem, FormGroup, FormControl, InputLabel } from '@material-ui/core';
import { Edit, Toys } from '@material-ui/icons';
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
    this.saveStudent = this.saveStudent.bind(this);
    this.handleSlider = this.handleSlider.bind(this);
    this.createStudentRandom = this.createStudentRandom.bind(this);
  }

  componentDidMount() {
    this.props.schoolId ? this.setState({ schoolId: this.props.schoolId }) : null; // when creating, prefill schoolId
    this.props.student ? this.setState(this.props.student) : null; // when updating, prefill student
  }

  handleChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  handleSlider(ev, gpa) {
    this.setState({ gpa });
  }

  saveStudent() {
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
    !type ? console.log('StudentFormDialog needs a "type" prop with value "create" or "update"') : null;
    this.props.toggleFormDialog();
  }

  createStudentRandom() {
    this.props.dispatchCreateStudentRandom();
    this.props.toggleFormDialog();
  }


  render() {
    const { handleChange, handleSubmit, saveStudent, handleSlider, createStudentRandom } = this;
    const { firstName, lastName, gpa, schoolId, editing } = this.state;
    const { type, school, schools, formDialog, toggleFormDialog, updateStudent, createStudent, student, classes } = this.props;
    const isEmpty = firstName && lastName ? false : true;
    return (
      <Dialog open={formDialog}>
        <DialogTitle>{ type === 'create' ? 'Create Student' : 'Edit Student'}</DialogTitle>
        <DialogContent>

          <FormControl>
            <div>
              <TextField name='firstName' value={firstName} label="First Name" onChange={handleChange} required autoFocus/>
            </div>

            <div>
              <TextField name='lastName' value={lastName} label="Last Name" required onChange={handleChange}/>
            </div>

            <div>
              <Typography id='slider' variant='caption'>GPA: {gpa.toFixed(2)}</Typography>
              <Slider name='gpa' value={gpa} aria-labelledby='slider' min={0} max={4} step={0.01} onChange={handleSlider}/>
            </div>

            {
              school ? (
                <div>
                  <Typography variant='caption'>
                    Add this student to {school.name}
                  </Typography>
                </div>
              ) : (
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
              )
            }


          </FormControl>

        </DialogContent>

        <DialogActions>
          {
            type === 'create' && !school ? (
              <Fragment>
                <Tooltip title='Create Random Student'>
                  <IconButton onClick={createStudentRandom}>
                    <Toys />
                  </IconButton>
                </Tooltip>
              </Fragment>
            ) : null
          }
          <Button onClick={toggleFormDialog}>
            Cancel
          </Button>
          <Button onClick={saveStudent} disabled={isEmpty}>
            Save
          </Button>
        </DialogActions>

      </Dialog>
    );
  }
}

const mapStateToProps = ({ schools }, { schoolId })=> {
  return {
    schools,
    school: getSchool(schools, schoolId)
  };
};

const mapDispatchToProps = (dispatch, { history })=> {
  return {
    createStudent: (student)=> {
      dispatch(createStudent_thunk(student));
    },
    updateStudent: (student)=> {
      dispatch(updateStudent_thunk(student));
    },
    dispatchCreateStudentRandom: ()=> {
      dispatch(createStudentRandom_thunk());
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StudentFormDialog));


