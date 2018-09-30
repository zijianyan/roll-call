import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { createSchool_thunk } from '../store/thunks';

class SchoolsCreate extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      address: '',
      description: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  handleSubmit(ev) {
    ev.preventDefault();
    const school = {
      ...this.state,
      students: []
    };
    this.props.createSchool(school);
  }

  render() {
    const { name, address, description } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <Fragment>
        <h2>Create A School</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input name='name' value={name} placeholder='Name' onChange={handleChange}/>
          </div>
          <div>
            <input name='address' value={address} placeholder='Address' onChange={handleChange}/>
          </div>
          <div>
            <input name='description' value={description} placeholder='Description' onChange={handleChange}/>
          </div>
          <button>Save</button>
        </form>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch, { history })=> {
  return {
    createSchool: (school)=> {
      dispatch(createSchool_thunk(school));
      history.push('/schools');
    }
  };
};

export default connect(null, mapDispatchToProps)(SchoolsCreate);