import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { createSchool_thunk, createSchoolRandom_thunk } from '../store/thunks';

import SchoolForm from './SchoolForm';

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
      name: this.state.name,
      address: this.state.address,
      description: this.state.description
    };
    this.props.createSchool(school);
  }

  render() {
    const { handleChange, handleSubmit } = this;
    const { name, address, description } = this.state;
    
    const { createSchoolRandom, history } = this.props;
    const isEmpty = name || address || description ? false : true;
    return (
      <Fragment>
        <h2>Create A School</h2>


        
        <SchoolForm type='create' history={history}/>



   
        <hr/>
        <button onClick={createSchoolRandom}>Create Random School</button>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch, { history })=> {
  return {
    createSchoolRandom: ()=> {
      dispatch(createSchoolRandom_thunk())
      history.push('/schools');
    }
  };
};

export default connect(null, mapDispatchToProps)(SchoolsCreate);


