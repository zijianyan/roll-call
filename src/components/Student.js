import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

const Student = ({ id, student })=> {
  return (
    <div>
      <p>Student id: {id}</p>
      <p>{student ? `${student.firstName} ${student.lastName}` : null }</p>
    </div>
  )
}


const getStudent = (students, id)=> {
  return students.find(student => student.id === id)
}

const mapStateToProps = ({ students }, { match })=> {
  return {
    id: match.params.id*1,
    student: getStudent(students, match.params.id*1)
  }
}

export default connect(mapStateToProps)(Student);