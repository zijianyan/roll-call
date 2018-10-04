import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';

import uuidv4 from 'uuid/v4';

import { deleteSchool_thunk } from '../../store/thunks';

import { withStyles, Typography, Button, IconButton, Tooltip, Card, CardContent, CardActions, CardActionArea, CardMedia, CardHeader, Avatar, LinearProgress, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Divider } from '@material-ui/core';
import { Eject, MoreVertIcon, Edit, Delete } from '@material-ui/icons';

import { getSchool } from '../../utils';

import SchoolFormDialog from './SchoolFormDialog';
import SchoolDeleteDialog from './SchoolDeleteDialog';

import EnrolledStudentsList from './EnrolledStudentsList';
import OtherStudentsList from './OtherStudentsList';

const styles = {
  card: {
    maxWidth: 1000,
    minWidth: 400
  },
  media: {
    height: 300,
  },
  cellButton: {
    'text-transform': 'none',
    'color': 'rgba(0, 0, 0, 0.87)',
    'font-size': '0.8125rem',
    'font-weight': '400'
  },
  progress: {
    marginTop: 5,
    marginBottom: 10
  }
};


class SchoolInfo extends Component {
  constructor() {
    super();
    this.state = {
      formDialog: false,
      deleteDialog: false
    };
    this.toggleFormDialog = this.toggleFormDialog.bind(this);
    this.toggleDeleteDialog = this.toggleDeleteDialog.bind(this);
  }

  componentDidMount() {
    window.scroll(0,0);
  }

  toggleFormDialog() {
    this.setState({ formDialog: !this.state.formDialog });
  }

  toggleDeleteDialog() {
    this.setState({ deleteDialog: !this.state.deleteDialog });
  }

  render() {
    const { school, classes, deleteSchool } = this.props;
    const { formDialog, deleteDialog } = this.state;
    const { toggleFormDialog, toggleDeleteDialog } = this;
    
    if (!school) {
      return (
        <Typography>
          School not found
        </Typography>
      );
    }

    const { imageUrl, name, address, description } = school;
    
    return (
      <Fragment>

        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar className={classes.avatar} src={imageUrl}>
              </Avatar>
            }
            action={
              <Tooltip title='Edit'>
                <IconButton onClick={toggleFormDialog}><Edit /></IconButton>
              </Tooltip>
            }
            title={name}
          />
          <CardMedia 
            image={`http://source.unsplash.com/random?city&forceRefresh=${uuidv4()}`}
            className={classes.media}
          />
          <CardContent>
            <Typography variant='subheading'>Address</Typography>
            <Typography>{address}</Typography>
            <Typography variant='subheading'>Description</Typography>
            <Typography>{description}</Typography>
          </CardContent>
          <CardActions>
            <Fragment>
              <Tooltip title='Delete'>
                <IconButton onClick={toggleDeleteDialog}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </Fragment>
          </CardActions>
        </Card>

        <SchoolFormDialog type='update' formDialog={formDialog} toggleFormDialog={toggleFormDialog} school={school}/>

        <SchoolDeleteDialog deleteDialog={deleteDialog} toggleDeleteDialog={toggleDeleteDialog} deleteSchool={deleteSchool} school={school}/>

        <EnrolledStudentsList schoolId={school.id}/>

        <OtherStudentsList schoolId={school.id}/>

      </Fragment>
    );
  }
}

const mapStateToProps = ({ schools }, { match })=> {
  return {
    school: getSchool(schools, match.params.id)
  }
  
}

const mapDispatchToProps = (dispatch, { history })=> {
  return {
    deleteSchool: (school)=> {
      dispatch(deleteSchool_thunk(school));
      history.push('/schools');
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SchoolInfo));