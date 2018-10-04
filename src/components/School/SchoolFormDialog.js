import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { createSchool_thunk, updateSchool_thunk, createSchoolRandom_thunk } from '../../store/thunks';

import { Button, IconButton, Tooltip, Typography } from '@material-ui/core';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { FormControl, TextField } from '@material-ui/core';
import { Toys } from '@material-ui/icons';

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
    this.createSchoolRandom = this.createSchoolRandom.bind(this);
  }

  componentDidMount() {
    this.props.school ? this.setState(this.props.school) : null;
  }

  handleChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  saveSchool() {
    const empty = {
      name: '',
      address: '',
      description: ''
    };
    const school = {
      name: this.state.name,
      address: this.state.address,
      description: this.state.description,
    };
    this.props.school ? school.id = this.props.school.id : null;
    const { type, createSchool, updateSchool } = this.props;
    if (type === 'create') {
      createSchool(school);
      this.setState(empty);
    } else if (type === 'update') {
      updateSchool(school);
    }
    this.props.toggleFormDialog();
  }

  createSchoolRandom() {
    this.props.dispatchCreateSchoolRandom();
    this.props.toggleFormDialog();
  }

  render() {
    const { handleChange, saveSchool, createSchoolRandom } = this;
    const { name, address, description } = this.state;
    const { type, formDialog, toggleFormDialog } = this.props;
    const isEmpty = name && address ? false : true;
    return (
      <Dialog open={formDialog}>

        <DialogTitle>{ type === 'create' ? 'Create School' : 'Edit School'}</DialogTitle>

        <DialogContent>
          <FormControl>
            <div>
              <TextField name='name' value={name} label="School Name" onChange={handleChange} required autoFocus/>
            </div>
            <div>
              <TextField name='address' value={address} label="Address" onChange={handleChange} required/>
            </div>
            <div>
              <TextField name='description' value={description} label="Description" onChange={handleChange}/>
            </div>
          </FormControl>
        </DialogContent>

        <DialogActions>
          {
            type === 'create' ? (
              <Fragment>
                <Tooltip title='Create Random School' >
                  <IconButton onClick={createSchoolRandom}>
                    <Toys />
                  </IconButton>
                </Tooltip>
              </Fragment>
            ) : null

          }
          <Button onClick={toggleFormDialog}>
            Cancel
          </Button>
          <Button onClick={saveSchool} disabled={isEmpty}>
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

const mapDispatchToProps = (dispatch)=> {
  return {
    createSchool: (school)=> {
      dispatch(createSchool_thunk(school));
    },
    updateSchool: (school)=> {
      dispatch(updateSchool_thunk(school));
    },
    dispatchCreateSchoolRandom: ()=> {
      dispatch(createSchoolRandom_thunk());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SchoolFormDialog);


