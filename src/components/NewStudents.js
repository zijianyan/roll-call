import React from 'react';
import { connect } from 'react-redux';

import { getSchool } from '../utils';

const NewStudents = ({ newStudents, schools })=> {
  return (
    <div>
      <h2>New Students</h2>
      <ul>
        {
          newStudents.map(student => {
            const { id, imageUrl, firstName, lastName, schoolId } = student;
            const school = getSchool(schools, schoolId);
            return (
              <li key={id}>
                <div id='student-image-container'>
                  <img src={imageUrl} id='student-image'/>
                </div>
                <h4>{firstName} {lastName}</h4>
                { school ? <p>{school.name}</p> : null }
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

const mapStateToProps = ({ students, schools })=> {
  return {
    newStudents: students.length >= 3 ? students.slice(students.length-3, students.length) : students,
    schools
  };
};

export default connect(mapStateToProps)(NewStudents);