import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import Nav from './Nav';

import { withStyles, Fade, Typography, ButtonBase, Grid } from '@material-ui/core';

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
          <Fragment>
            <ButtonBase>
              <Typography variant='display2' className={classes.title} component={Link} to='/' gutterBottoms>
                Acme Schools and Students
              </Typography>
            </ButtonBase>
            <Nav />
          </Fragment>
        </Fade>
      </Grid>
    </Fragment>
  );
};

export default withStyles(styles)(Header);