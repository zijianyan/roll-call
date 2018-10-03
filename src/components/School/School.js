import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { deleteSchool_thunk } from '../../store/thunks';
import { getSchool } from '../../utils';

import SchoolForm from '../SchoolForm';
import SchoolInfo from './SchoolInfo';
import EnrolledStudentsList from './EnrolledStudentsList';
import OtherStudentsList from './OtherStudentsList';

import { withStyles, Typography, Divider, Button, IconButton, Tooltip } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

import SchoolFormDialog from '../SchoolFormDialog';
import SchoolDeleteDialog from '../SchoolDeleteDialog';

const styles = {
  divider: {
    margin: '20px 0 20px 0px'
  }
}


class School extends Component {
  constructor() {
    super();
    this.state = {
      deleteDialog: false
    };
    this.toggleDeleteDialog = this.toggleDeleteDialog.bind(this);
  }

  componentDidMount() {
    window.scroll(0,0);
  }

  toggleDeleteDialog() {
    this.setState({ deleteDialog: !this.state.deleteDialog });
  }

  render() {
    const { school, history, deleteSchool, classes } = this.props;
    const { toggleDeleteDialog } = this;
    const { deleteDialog } = this.state;
    if (!school) {
      return (
        <div>
          <Typography variant='display1'>School Not Found</Typography>
          <Link to='/schools'>See Schools</Link>
        </div>
      );
    }
    return (
      <Fragment> 

        <SchoolInfo school={school}/>

        <SchoolForm type='update' history={history} school={school}/>

        <Tooltip title='Delete School'><IconButton onClick={toggleDeleteDialog}><Delete /></IconButton></Tooltip>
        
        <Divider />

        <EnrolledStudentsList schoolId={school.id}/>

        <OtherStudentsList schoolId={school.id}/>

        <SchoolDeleteDialog deleteDialog={deleteDialog} toggleDeleteDialog={toggleDeleteDialog} deleteSchool={deleteSchool} school={school}/>

      </Fragment>
    );
  }
}

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