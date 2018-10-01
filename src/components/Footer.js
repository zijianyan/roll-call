import React from 'react';
import { connect } from 'react-redux';
import { reset_thunk } from '../store/thunks';

const Footer = ({ reset })=> {
  return (
    <div>
      <hr/>
      <button onClick={reset}>Reset Server</button>
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