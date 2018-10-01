import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { deleteSchool_thunk } from '../../store/thunks';
import { getSchool } from '../../utils';

import SchoolForm from '../SchoolForm';
import SchoolInfo from './SchoolInfo';
import EnrolledStudentsList from './EnrolledStudentsList';
import OtherStudentsList from './OtherStudentsList';

const School = ({ school, history, deleteSchool })=> {
  if (!school) {
    return (
      <div>
        <h3>School Not Found</h3>
        <Link to='/schools'>See Schools</Link>
      </div>
    );
  }
  return (
    <div> 

      <SchoolInfo school={school}/>


      <SchoolForm type='update' history={history} school={school}/>

      <EnrolledStudentsList schoolId={school.id}/>
      
      <hr/>
      <button onClick={()=> deleteSchool(school)}>Delete School</button>
      <hr/>

      <OtherStudentsList schoolId={school.id}/>

    </div>
  );
};

const mapStateToProps = ({ schools }, { match })=> {
  return {
    school: getSchool(schools, match.params.id)
  };
};

const mapDispatchToProps = (dispatch, { history })=> {
  return {
    deleteSchool: (school)=> {
      dispatch(deleteSchool_thunk(school));
      history.push('/schools');
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(School);