import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

const School = ({ id, school })=> {
  return (
    <div>
      <p>School id: {id}</p>
      <p>{ school ? school.name : null }</p>
      <p>Students:</p>
      <ul>
        { school ? school.students.map( student => 
            <li key={student.id}>{student.firstName} {student.lastName} - GPA: {student.gpa}</li>
          ) : null }      
      </ul>
    </div>
  )
}


const getSchool = (schools, id)=> {
  return schools.find(school => {
    if (school.id) {
      return school.id === id;
    }
  })
}

School.propTypes = {
  id: PropTypes.number,
  school: PropTypes.object
}

const mapStateToProps = ({ schools }, { match })=> {

  return {
    id: match.params.id*1,
    school: getSchool(schools, match.params.id*1),
    // students: getSchool(schools, match.params.id*1)
  }
}

export default connect(mapStateToProps)(School);