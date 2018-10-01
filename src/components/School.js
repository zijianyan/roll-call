import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { deleteSchool_thunk, updateStudent_thunk, updateSchool_thunk } from '../store/thunks';
import { getSchool, findEnrolled, findOtherStudents } from '../utils';
import SchoolForm from './SchoolForm';

import OtherStudentsList from './OtherStudentsList';
import EnrolledStudentsList from './EnrolledStudentsList';

const School = ({ school, schools, otherStudents, enrolledStudents, history, deleteSchool, unenrollStudent, enrollStudent })=> {
  if (!school) {
    return (
      <div>
        <h3>School Not Found</h3>
        <Link to='/schools'>See Schools</Link>
      </div>
    );
  }
  return (
    <div> 
      <h2>{school.name}</h2>
      <div id='school-image-container'>
        <img src={school.imageUrl} id='school-image'/>
      </div>
      <h3>Address</h3>
      <p>{school.address}</p>

      { school.description ? (<div><h3>Description</h3><p>{school.description}</p></div>) : null }

      <SchoolForm type='update' history={history} school={school}/>

      <EnrolledStudentsList schoolId={school.id}/>
      
      <hr/>
      <button onClick={()=> deleteSchool(school)}>Delete School</button>
      <hr/>

      <OtherStudentsList schoolId={school.id}/>

    </div>
  );
};

const mapStateToProps = ({ schools, students }, { match })=> {
  return {
    schools,
    school: getSchool(schools, match.params.id)
  };
};

const mapDispatchToProps = (dispatch, { history })=> {
  return {
    deleteSchool: (school)=> {
      dispatch(deleteSchool_thunk(school));
      history.push('/schools');
    },
    updateStudent: (student)=> {
      dispatch(updateStudent_thunk(student));
    },
    updateSchool: (school)=> {
      dispatch(updateSchool_thunk(school));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(School);


// <h3>{enrolledStudents.length ? 'Enrolled Students' : 'No Students'}</h3>
//       <ul>
//         {
//           enrolledStudents ? enrolledStudents.map( student =>
//             <li key={student.id}>
//               <Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link> - GPA: {student.gpa}
//               <button onClick={()=> unenrollStudent(student)}>Unenroll</button>
//             </li>
//           ) : null
//         }
//         <li><Link to={`/students/create/${school.id}`}><button>Add New Student</button></Link></li>      
//       </ul>
//       <hr/>
//       <button onClick={()=> deleteSchool(school)}>Delete School</button>
//       <hr/>