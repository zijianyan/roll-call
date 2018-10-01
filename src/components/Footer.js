import React from 'react';
import { connect } from 'react-redux';
import { reset_thunk } from '../store/thunks';


import { Button } from '@material-ui/core'



const Footer = ({ reset })=> {
  return (
    <div>
      <hr/>
      <Button onClick={reset} align='right'>Reset Server</Button>
    </div>
  );
};

const mapDispatchToProps = (dispatch, { history })=> {
  return {
    reset: ()=> {
      dispatch(reset_thunk());
      history.push('/');
    }
  };
};

export default connect(null, mapDispatchToProps)(Footer);