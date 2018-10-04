import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { reset_thunk } from '../store/thunks';

import { withStyles, Button, Divider, Fade } from '@material-ui/core';
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
      open: false
    };
    this.toggleDialog = this.toggleDialog.bind(this);
    this.reset = this.reset.bind(this);
  }

  toggleDialog() {
    this.setState({ open: !this.state.open });
  }

  reset() {
    this.props.dispatchResetThunk();
    this.toggleDialog(); 
    this.props.history.push('/');
  }

  render() {
    const { classes } = this.props;
    const { resetButton } = classes;
    const { toggleDialog, reset } = this;
    const { open } = this.state;
    return (
      <Fragment>
      
        <Fade in>
          <Fragment className={classes.footer}>
            <Divider />
            <Button align='right' className={resetButton} onClick={toggleDialog}>
              Reset Server
            </Button>
          </Fragment>
        </Fade>
        
        <Dialog open={open}>
          <DialogTitle>
            Reset the server?
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              This will re-sync the database and generate new random Schools and Students.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={toggleDialog}>
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