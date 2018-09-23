import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

const SchoolList = ({ schools })=> {
  return (
    <div>
      <h2>Schools</h2>
      {schools.length}
    </div>
  )
}

const mapStateToProps = ({ schools })=> {
  return {
    schools
  }
}

export default connect(mapStateToProps)(SchoolList);