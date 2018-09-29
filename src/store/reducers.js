import { LOAD_SCHOOLS, DELETE_SCHOOL, CREATE_SCHOOL, UPDATE_SCHOOL } from './actionTypes';
import { LOAD_STUDENTS, DELETE_STUDENT, CREATE_STUDENT, UPDATE_STUDENT } from './actionTypes';

import { getSchool, findSchoolByStudentId } from '../utils';

export const schoolsReducer = (schools=[], action)=> {
  switch(action.type) {
    case LOAD_SCHOOLS:
      return action.payload;

    case DELETE_SCHOOL:
      return schools.filter( school => school.id !== action.payload.id );

    case CREATE_SCHOOL:
      return [...schools, action.payload]



    case UPDATE_SCHOOL:
      const updated = action.payload;
      return schools.map( school => school.id === updated.id ? updated : school );



    case DELETE_STUDENT:
      if (!action.payload.schoolId) { //if the deleted student wasn't enrolled in a school, then schools are unaffected
        return schools;
      }
      const studentId = action.payload.id;
      const { schoolId } = action.payload;
      const updatedSchool = schools.find(school => school.id === schoolId);
      updatedSchool.students = updatedSchool.students.filter( student => {
        student.id !== studentId
      } );
      return schools.map( school => school.id === updatedSchool.id ? updatedSchool : school );

    case CREATE_STUDENT:

      return schools.map( school => {
        const student = action.payload;
        if (student.schoolId === school.id) {
          return {...school, students: [...school.students, student]}
        }
        return school;
      })

    // case UPDATE_STUDENT:
    //   const student = action.payload;
    //   console.log('UPDATE_STUDENT, student/action.payload:', student);
    //   const previousSchool = findSchoolByStudentId(schools, student); 
    //   console.log('UPDATE_STUDENT, previousSchool:', previousSchool);
    //   console.log('UPDATE_STUDENT, student.schoolId:', student.schoolId);


    //   //ENROLLING
    //   if (!previousSchool && student.schoolId) {
    //     return schools.map( school => {
    //       if (school.id === student.schoolId) {
    //         return {...school, students: [...school.students, student]}
    //       }
    //       return school;
    //     })
    //   }

    //   //UNEROLLING
    //   if (previousSchool && !student.schoolId) {
    //     return schools.map( school => {
    //       if (school.id === previousSchool.id) {
    //         return {...school, students: school.students.filter(_student => _student.id !== action.payload.id)}
    //       }
    //       return school;
    //     })
    //   }

    //   //TRANSFERING
    //   if (previousSchool && student.schoolId) {
    //     return schools.map(school => {
    //       if (school.id === previousSchool.id) {
    //         return {...school, students: school.students.filter(_student => _student.id !== action.payload.id)}
    //       }
    //       if (school.id === schoolId) {
    //         return {...school, students: [...school.students, student]}
    //       }
    //       return school;
    //     })
    //   }

    default:
      return schools;
  }
}

export const studentsReducer = (students=[], action)=> {
  switch(action.type) {

    case LOAD_STUDENTS:
      return action.payload;

    case DELETE_STUDENT:
      return students.filter( student => student.id !== action.payload.id );

    case CREATE_STUDENT:
      return [...students, action.payload]
      
    case UPDATE_STUDENT:
      const updated = action.payload;
      return students.map( student => student.id === updated.id ? updated : student )
    
    case DELETE_SCHOOL:
      return students.map( student => {
        if (student.schoolId === action.payload.id) {
          student.schoolId = null;
          delete student.school;
          return student;
        }
        return student;
      })

    
    default:
      return students;
  }
}
