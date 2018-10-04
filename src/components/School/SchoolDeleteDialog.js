import React from 'react';

import { Button } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@material-ui/core';

const SchoolDeleteDialog = ({ deleteDialog, deleteSchool, toggleDeleteDialog, school })=> {
  return (
    <Dialog open={deleteDialog}>
      <DialogTitle>
        Delete School?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Their students will have to fend for themselves.
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
       
       
