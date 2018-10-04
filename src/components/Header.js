import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import Nav from './Nav';

import { withStyles, Fade, Typography, Divider, ButtonBase, Grid } from '@material-ui/core';
import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple';

const styles = {
  title: {
    padding: 20,
    fontWeight: 200
  }
};

const Header = ({ classes })=> {
  return (
    <Fragment>
      <Grid container justify='center'>
        <Fade in>
          <ButtonBase>
          
            <Typography variant='display2' align='center' gutterBottom className={classes.title} component={Link} to='/'>
              Acme Schools and Students
            </Typography>

          </ButtonBase>
        </Fade>
        <Nav />
      </Grid>
    </Fragment>
  );
};

export default withStyles(styles)(Header);