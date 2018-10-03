import React, { Component } from 'react';

// class studentDeleteDialog extends Component {
//   constructor() {
//     super();
//     this.state = {

//     }
//   }
// }
import { withStyles, Typography, Button, IconButton, Tooltip, Card, CardContent, CardActions, CardActionArea, CardMedia, CardHeader, Avatar, LinearProgress, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, } from '@material-ui/core';

const StudentDeleteDialog = ({ open, deleteStudent, toggleDeleteDialog, student })=> {
  return (
    <Dialog open={open}>
      <DialogTitle>
        Delete Student?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          They'll be homeschooled forever.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleDeleteDialog}>
          Cancel
        </Button>
        <Button onClick={()=> deleteStudent(student)}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default StudentDeleteDialog;
       
       
