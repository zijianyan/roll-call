import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createSchool_thunk, updateSchool_thunk } from '../store/thunks';

class SchoolForm extends Component {
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

  componentDidMount() {
    //pass school in as a property and setstate with it, if there is a school property
    this.props.school ? this.setState(this.props.school) : null;
  }

  // componentDidUpdate() {

  // }

  handleChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  handleSubmit(ev) {
    ev.preventDefault();

  

    const school = this.props.school
      ? { ...this.state, id: this.props.school }
      : { ...this.state };
    const { type, createSchool, updateSchool } = this.props;
    type === 'create' ? createSchool(school, this.props.history) : null;
    type === 'update' ? updateSchool(school) : null;
  }

  render() {
    const { handleChange, handleSubmit } = this;
    const { name, address, description } = this.state;

    const isEmpty = name || address || description ? false : true;

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='school-name'>Name</label>
            <input id='school-name' name='name' placeholder='School Name' value={name} onChange={handleChange}/>
          </div>
          <div>
            <label htmlFor='school-address'>Address</label>
            <input id='school-address' name='address' placeholder='Address' value={address} onChange={handleChange}/>
          </div>
          <div>
            <label htmlFor='school-description'>Description</label>
            <textarea id='school-description' name='description' placeholder='Description' value={description} onChange={handleChange}>
            </textarea>
          </div>
          <button disabled={isEmpty}>Save</button>
        </form>
      </div>
    );
  }
}



const mapStateToProps = ({ schools, students }, { match })=> {
  return {
    // schools,
    // school: getSchool(schools, match.params.id), //remove *1 typecoercion if using UUID for all match.params.id's
  };
};


const mapDispatchToProps = (dispatch, ownProps)=> {
  // console.log('SchoolForm, ownProps:', ownProps);
  return {
    createSchool: (school, history)=> {
      dispatch(createSchool_thunk(school));
      history.push('/schools');
    },
    updateSchool: (school)=> {
      dispatch(updateSchool_thunk(school));
    }
  };
};





export default connect(mapStateToProps, mapDispatchToProps)(SchoolForm);