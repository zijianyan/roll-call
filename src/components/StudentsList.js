import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deleteStudent_thunk } from '../store/thunks';

const StudentsList = ({ students, deleteStudent })=> {
  return (
    <Fragment>
      <h2>Students</h2>
      <ul>
        {
          students.map( student => (
            <li key={student.id}>
              {student.firstName} {student.lastName}
              <button onClick={()=> deleteStudent(student)}>x</button>
            </li>
          ))
        }
      </ul>
    </Fragment>
  )
}

StudentsList.propTypes = {
  students: PropTypes.array
}

StudentsList.defaultProps = {
  students: []
}

const mapStateToProps = ({ students })=> {
  return {
    students
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    deleteStudent: (student)=> dispatch(deleteStudent_thunk(student))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentsList);