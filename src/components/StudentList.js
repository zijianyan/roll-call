import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const StudentList = ({ students })=> {
  return (
    <Fragment>
      <h2>Students</h2>
      <ul>
        {
          students.map( student => (
            <li key={student.id}>
              {student.firstName} {student.lastName}
            </li>
          ))
        }
      </ul>
    </Fragment>
  )
}

StudentList.propTypes = {
  students: PropTypes.array
}

StudentList.defaultProps = {
  students: []
}

const mapStateToProps = ({ students })=> {
  return {
    students
  }
}

export default connect(mapStateToProps)(StudentList);