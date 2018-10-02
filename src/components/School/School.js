import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { deleteSchool_thunk } from '../../store/thunks';
import { getSchool } from '../../utils';

import SchoolForm from '../SchoolForm';
import SchoolInfo from './SchoolInfo';
import EnrolledStudentsList from './EnrolledStudentsList';
import OtherStudentsList from './OtherStudentsList';

import { withStyles, Typography, Divider, Button } from '@material-ui/core';


const styles = {
  divider: {
    margin: '20px 0 20px 0px'
  }
}

const School = ({ school, history, deleteSchool, classes })=> {
  if (!school) {
    return (
      <div>
        <Typography variant='display1'>School Not Found</Typography>
        <Link to='/schools'>See Schools</Link>
      </div>
    );
  }
  return (
    <div> 

      <SchoolInfo school={school}/>


      <SchoolForm type='update' history={history} school={school}/>

      <EnrolledStudentsList schoolId={school.id}/>
      
      <Divider className={classes.divider}/>
      <Button onClick={()=> deleteSchool(school)}>Delete School</Button>
      <Divider />

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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(School));