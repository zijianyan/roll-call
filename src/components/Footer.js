import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { reset_thunk } from '../store/thunks';

import { withStyles, Button, Divider, Fade, Snackbar, IconButton } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@material-ui/core';
import { Close } from '@material-ui/icons';

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
      resetConfirmation: false,
    };
    this.toggleResetDialog = this.toggleResetDialog.bind(this);
    this.reset = this.reset.bind(this);
    this.toggleResetConfirmation = this.toggleResetConfirmation.bind(this);
  }

  toggleResetDialog() {
    this.setState({ resetDialog: !this.state.resetDialog });
  }

  reset() {
    this.props.dispatchResetThunk();
    this.toggleResetDialog(); 
    this.toggleResetConfirmation();
    this.props.history.push('/');
  }

  toggleResetConfirmation() {
    this.setState({ resetConfirmation: !this.state.resetConfirmation });
  }

  render() {
    const { classes } = this.props;
    const { resetButton } = classes;
    const { toggleResetDialog, reset, toggleResetConfirmation } = this;
    const { resetDialog, resetConfirmation } = this.state;
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

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={resetConfirmation}
          autoHideDuration={6000}
          onClose={toggleResetConfirmation}
          message={<span id="message-id">Server reset</span>}
          action={[
            <IconButton
              // key="close"
              // aria-label="Close"
              color="inherit"
              // className={classes.close}
              onClick={toggleResetConfirmation}
            >
              <Close />
            </IconButton>,
          ]}
        />

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