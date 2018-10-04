import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import uuidv4 from 'uuid/v4';

import { deleteSchool_thunk } from '../../store/thunks';
import { getSchool } from '../../utils';

import EnrolledStudentsList from './EnrolledStudentsList';
import OtherStudentsList from './OtherStudentsList';
import SchoolFormDialog from './SchoolFormDialog';
import SchoolDeleteDialog from './SchoolDeleteDialog';

import { withStyles, Typography, Button, IconButton, Tooltip, Avatar, Fade } from '@material-ui/core';
import { Card, CardContent, CardActions, CardActionArea, CardMedia, CardHeader } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@material-ui/core';
import { Eject, MoreVertIcon, Edit, Delete } from '@material-ui/icons';

const styles = {
  card: {
    maxWidth: 1000,
    minWidth: 400,
  },
  cardMedia: {
    height: 300,
  },
  cardContent: {
    margin: '20 30 0 30'
  },
  cardActions: {
    margin: '0 30 20 30'  
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
  },
  title: {
    fontWeight: 200
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
    const { card, cardMedia, avatar, cardContent, cardActions } = classes;
    
    if (!school) {
      return (
        <Typography>
          School not found
        </Typography>
      );
    }

    const { imageUrl, name, address, description } = school;

    const schoolAvatar = <Avatar className={avatar} src={imageUrl} />
    const editButton = (
      <Tooltip title='Edit'>
        <IconButton onClick={toggleFormDialog}><Edit /></IconButton>
      </Tooltip>
    );
    
    return (
      <Fragment>

        <Fade in timeout={1000}>
          <Card className={card}>

            <CardHeader
              avatar={schoolAvatar}
              action={editButton}
              title={<Typography variant='display1' className={classes.title}>{name}</Typography>}
            />

            <Fade in timeout={200}>
              <CardMedia 
                image={`http://source.unsplash.com/random?city&forceRefresh=${uuidv4()}`}
                className={cardMedia}
              />
            </Fade> 

            <CardContent className={cardContent}>
              <Typography variant='subheading'>
                Address
              </Typography>
              <Typography>
                {address}
              </Typography>
              <Typography variant='subheading'>
                Description
              </Typography>
              <Typography>
                {description}
              </Typography>
            </CardContent>

            <CardActions className={cardActions}>
              <Fragment>
                <Tooltip title='Delete'>
                  <IconButton onClick={toggleDeleteDialog}>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </Fragment>
            </CardActions>

          </Card>
        </Fade>

        <SchoolFormDialog
          type='update'
          formDialog={formDialog}
          toggleFormDialog={toggleFormDialog}
          school={school}
        />

        <SchoolDeleteDialog
          deleteDialog={deleteDialog}
          toggleDeleteDialog={toggleDeleteDialog}
          deleteSchool={deleteSchool}
          school={school}
        />

        <EnrolledStudentsList schoolId={school.id}/>

        <OtherStudentsList schoolId={school.id}/>

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
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SchoolInfo));