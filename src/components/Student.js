import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

const Student = ({ id })=> {
  return (
    <div>
      Student id: {id}
    </div>
  )
}

const mapStateToProps = (state, ownProps)=> {
  return {
    id: ownProps.match.params.id
  }
}

export default connect(mapStateToProps)(Student);