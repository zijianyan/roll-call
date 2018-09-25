import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

const School = (ownProps)=> {
  // console.log('School, props:', props)
  // console.log('id:', id);
  console.log('School, ownProps:', ownProps);
  const id = ownProps.match.params.id
  return (
    <div>
      School id: {id}
    </div>
  )
}


const mapStateToProps = (state, ownProps)=> {
  return {
    // props: ownProps,
    // id: ownProps.match.params.id
    ownProps
  }
}

export default connect(mapStateToProps)(School);