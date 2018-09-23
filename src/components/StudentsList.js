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
          students.map( student => {
            const { id, firstName, lastName, gpa } = student;
            return (
              <li key={id}>
                {firstName} {lastName} - GPA: {gpa}
                <div>
                  <button onClick={()=> deleteStudent(student)}>x</button>
                </div>
              </li>
            )
          })
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