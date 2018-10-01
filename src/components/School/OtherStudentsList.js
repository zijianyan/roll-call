import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { updateStudent_thunk } from '../../store/thunks';
import { getSchool, findOtherStudents } from '../../utils';

const OtherStudentsList = ({ otherStudents, enrollStudent, schools })=> {
  return (
    <div>
      <h3>Other Students</h3>
      <ul>
        {
          otherStudents.map( student => {
            const otherSchool = getSchool(schools, student.schoolId);
            return (
              <li key={student.id}>
                <Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link>
                {
                  otherSchool
                    ? (<span> - {otherSchool.name} - <button onClick={()=> enrollStudent(student)}>Transfer In</button></span>)
                    : (<span> - <button onClick={()=> enrollStudent(student)}>Enroll</button></span>)
                }
                <div>
                </div>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

const mapStateToProps = ({ students, schools }, { schoolId }) => {
  return {
    otherStudents: findOtherStudents(students, schoolId),
    schools
  };
};

const mapDispatchToProps = (dispatch, { schoolId })=> {
  return {
    enrollStudent: (student)=> {
      const _student = {...student, schoolId };
      dispatch(updateStudent_thunk(_student));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OtherStudentsList);