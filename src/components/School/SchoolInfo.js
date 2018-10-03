import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';

import uuidv4 from 'uuid/v4';

import { deleteSchool_thunk } from '../../store/thunks';

import { withStyles, Typography, Button, IconButton, Tooltip, Card, CardContent, CardActions, CardActionArea, CardMedia, CardHeader, Avatar, LinearProgress, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, } from '@material-ui/core';
import { Eject, MoreVertIcon, Edit, Delete } from '@material-ui/icons';


import SchoolFormDialog from '../SchoolFormDialog';
import SchoolDeleteDialog from '../SchoolDeleteDialog';

const styles = {
  card: {
    maxWidth: 800,
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
    const { imageUrl, name, address, description } = school;
    return (
      <div>
        <div>
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

        </div>

        

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { history })=> {
  return {
    deleteSchool: (school)=> {
      dispatch(deleteSchool_thunk(school));
      history.push('/schools');
    },
    deleteStudent: (student)=> {
      dispatch(deleteStudent_thunk(student));
      history.push('/students');
    },
    unenroll: (student)=> {
      dispatch(updateStudent_thunk({...student, schoolId: null}))
    }
  };
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(SchoolInfo));