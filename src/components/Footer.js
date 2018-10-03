import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { reset_thunk } from '../store/thunks';


import { withStyles, Button, Divider, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Snackbar, Fade } from '@material-ui/core'

const styles = {
  footer: {
    marginTop: 30
  },
  reset: {
    marginTop: 20
  }
}

class Footer extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
    this.toggleDialog = this.toggleDialog.bind(this);
  }

  toggleDialog() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { reset, classes } = this.props;
    const { toggleDialog } = this;
    const { open } = this.state;
    return (
      <Fragment>
      
        <Fade in>
          <div className={classes.footer}>
            <Divider />
            <Button align='right' className={classes.reset} onClick={toggleDialog}>Reset Server</Button>
          </div>
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
            <Button onClick={()=> reset(toggleDialog)}>
              Reset
            </Button>
          </DialogActions>
        </Dialog>
        
      </Fragment>
    );
  }

}

const mapDispatchToProps = (dispatch, { history })=> {
  return {
    reset: (toggleDialog)=> {
      dispatch(reset_thunk());
      history.push('/');
      toggleDialog();
    }
  };
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Footer));