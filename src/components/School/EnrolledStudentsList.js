import React from 'react';
import { connect } from 'react-redux';

import { findEnrolled } from '../../utils';
import { updateStudent_thunk } from '../../store/thunks';
import { Link } from 'react-router-dom';

const EnrolledStudentsList = ({ enrolledStudents, unenrollStudent, schoolId })=> {
  return (
    <div>
      <h3>{enrolledStudents.length ? 'Enrolled Students' : 'No Students'}</h3>
      <ul>
        {
          enrolledStudents ? enrolledStudents.map( student =>
            <li key={student.id}>
              <Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link> - GPA: {student.gpa}
              <button onClick={()=> unenrollStudent(student)}>Unenroll</button>
            </li>
          ) : null
        }
        <li><Link to={`/students/create/${schoolId}`}><button>Add New Student</button></Link></li>      
      </ul>

    </div>
  );
};

const mapStateToProps = ({ students }, { schoolId })=> {
  return {
    enrolledStudents: findEnrolled(students, schoolId)
  };
};

const mapDispatchToProps = (dispatch)=> {
  return {
    unenrollStudent: (student)=> {
      const _student = {...student, schoolId: null};
      dispatch(updateStudent_thunk(_student));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EnrolledStudentsList);