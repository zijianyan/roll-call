import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { reset_thunk } from '../store/thunks';

import { withStyles, Button, Divider, Fade, Snackbar } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@material-ui/core';

const styles = {
  footer: {
    marginTop: 30
  },
  resetButton: {
    marginTop: 20
  }
};

class Footer extends Component {
  constructor() {
    super();
    this.state = {
      resetDialog: false,

    };
    this.toggleResetDialog = this.toggleResetDialog.bind(this);
    this.reset = this.reset.bind(this);
  }

  toggleResetDialog() {
    this.setState({ resetDialog: !this.state.resetDialog });
  }

  reset() {
    this.props.dispatchResetThunk();
    this.toggleResetDialog(); 
    this.props.history.push('/');
  }

  render() {
    const { classes } = this.props;
    const { resetButton } = classes;
    const { toggleResetDialog, reset } = this;
    const { resetDialog } = this.state;
    return (
      <Fragment>

        <Fade in>
          <div className={classes.footer}>
            <Divider />
            <Button align='right' className={resetButton} onClick={toggleResetDialog}>
              Reset Server
            </Button>
          </div>
        </Fade>
        
        <Dialog open={resetDialog}>
          <DialogTitle>
            Reset the server?
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              This will re-sync the database and generate new random Schools and Students.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={toggleResetDialog}>
              Cancel
            </Button>
            <Button onClick={reset}>
              Reset
            </Button>
          </DialogActions>
        </Dialog>
        
      </Fragment>
    );
  }

}

const mapDispatchToProps = (dispatch)=> {
  return {
    dispatchResetThunk: ()=> {
      dispatch(reset_thunk());
    }
  };
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Footer));