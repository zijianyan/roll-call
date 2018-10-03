import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createSchool_thunk, updateSchool_thunk } from '../store/thunks';

import { Dialog, Button, DialogTitle, DialogContent, DialogContentText, DialogActions, IconButton, Tooltip, TextField, Select, Typography, MenuItem, FormGroup, FormControl, InputLabel } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { Slider } from '@material-ui/lab';

class SchoolFormDialog extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      address: '',
      description: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveSchool = this.saveSchool.bind(this);
  }

  componentDidMount() {
    // this.props.schoolId ? this.setState({ schoolId: this.props.schoolId }) : null; // when creating, prefill schoolId
    // this.props.student ? this.setState(this.props.student) : null; // when updating, prefill student
    this.props.school ? this.setState(this.props.school) : null;
  }


  handleChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  saveSchool() {
    const school = {
      name: this.state.name,
      address: this.state.address,
      description: this.state.description,
    };
    this.props.school ? school.id = this.props.school.id : null;
    const { type, createSchool, updateSchool } = this.props;
    type === 'create' ? createSchool(school) : null;
    type === 'update' ? updateSschool(school) : null;
    !type ? console.log('FormDialog needs a "type" prop with value "create" or "update"') : null;
    this.props.toggleFormDialog();
  }

  render() {
    const { handleChange, saveSchool } = this;
    const { name, address, description } = this.state;
    const { type, schools, formDialog, toggleFormDialog, updateSchool, createSchool, school } = this.props;
    return (
      <Dialog open={formDialog}>
        <DialogTitle>{ type === 'create' ? 'Create School' : 'Edit School'}</DialogTitle>
        <DialogContent>

          <FormControl>
            <div>
              <TextField name='name' value={name} label="First Name" onChange={handleChange} autoFocus/>
            </div>

            <div>
              <TextField name='address' value={address} label="Last Name" onChange={handleChange}/>
            </div>
            
            <div>
              <TextField name='description' value={description} label="Last Name" onChange={handleChange}/>
            </div>

          </FormControl>

        
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleFormDialog}>
            Cancel
          </Button>
          <Button onClick={saveSchool}>
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
    createSchool: (school)=> {
      dispatch(createSchool_thunk(school));
      // history.push('/students');
      // window.scrollTo(0,document.body.scrollHeight);
    },
    updateSchool: (school)=> {
      dispatch(updateSchool_thunk(school));
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(SchoolFormDialog);


