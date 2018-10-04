import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import Nav from './Nav';

import { withStyles, Fade, Typography, ButtonBase, Grid } from '@material-ui/core';

import styles from './Header.styles';

const Header = ({ classes, location })=> {
  return (
    <Fragment>
      <Grid container justify='center'>
        <Fade in>
          <Fragment>
            <ButtonBase>
              <Typography variant='display2' className={classes.title} component={Link} to='/' gutterBottom>
                Acme Schools and Students
              </Typography>
            </ButtonBase>
            <Nav path={location.pathname}/>
          </Fragment>
        </Fade>
      </Grid>
    </Fragment>
  );
};

export default withStyles(styles)(Header);