import React, { Component } from 'react';

import { Button } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@material-ui/core'; 

const StudentDeleteDialog = ({ deleteDialog, deleteStudent, toggleDeleteDialog, student })=> {
  return (
    <Dialog open={deleteDialog}>
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
  );
};

export default StudentDeleteDialog;
       
       
