import React, { Component } from 'react';

import { withStyles, Typography, Button, IconButton, Tooltip, Card, CardContent, CardActions, CardActionArea, CardMedia, CardHeader, Avatar, LinearProgress, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, } from '@material-ui/core';

const SchoolDeleteDialog = ({ deleteDialog, toggleDeleteDialog, school, deleteSchool })=> {
  return (
    <Dialog open={deleteDialog}>
      <DialogTitle>
        Delete School?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          All of its students will leave the school.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleDeleteDialog}>
          Cancel
        </Button>
        <Button onClick={()=> deleteSchool(school)}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SchoolDeleteDialog;
       
       
