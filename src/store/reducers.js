import { LOAD_SCHOOLS, DELETE_SCHOOL, CREATE_SCHOOL, UPDATE_SCHOOL } from './actionTypes';
import { LOAD_STUDENTS, DELETE_STUDENT, CREATE_STUDENT, UPDATE_STUDENT, UNENROLL_STUDENT } from './actionTypes';

import { getSchool, findSchoolByStudent } from '../utils';

export const schoolsReducer = (schools=[], action)=> {
  switch(action.type) {
    case LOAD_SCHOOLS:
      return action.payload;

    case DELETE_SCHOOL:
      return schools.filter( school => school.id !== action.payload.id );

    case CREATE_SCHOOL:
      return [...schools, action.payload]

    case UPDATE_SCHOOL:
      // console.log('UPDATE_SCHOOL, action.payload:', action.payload);
      if (action.payload) {
        const updated = action.payload;
        return schools.map( school => school.id === updated.id ? updated : school );
      }
      

    case DELETE_STUDENT:
      if (!action.payload.schoolId) { //if the deleted student wasn't enrolled in a school, then schools are unaffected
        return schools;
      } else {
        const studentId = action.payload.id;
        const { schoolId } = action.payload;
        const updatedSchool = schools.find(school => school.id === schoolId);
        updatedSchool.students = updatedSchool.students.filter( student => {
          student.id !== studentId
        } );
        return schools.map( school => school.id === updatedSchool.id ? updatedSchool : school );
      }



    case CREATE_STUDENT:
      return schools.map( school => {
        const student = action.payload;
        if (student.schoolId === school.id) {
          return {...school, students: [...school.students, student]}
        }
        return school;
      })

    case UPDATE_STUDENT:
      if (action.payload.schoolId) {
        const student = action.payload;
        return schools.map(school => {
          console.log('UPDATE_STUDENT, school:', school);
          if (school.id === student.schoolId) {
            return {...school, students: [...school.students, student]}
          } else {
            return school;
          }
        })
      }
      return schools;


    
    case UNENROLL_STUDENT:
      console.log('UNENROLL STUDENT, action:', action);
      if (action) {
        const student = action.student;
        const school = action.school;

        console.log('UNENROLL_STUDENT, action.school:', action.school);

        const updatedSchool = {
          ...school,
          students: school.students.filter(_student => _student.id !== student.id)
        }

        console.log('UNENROLL_STUDENT, updatedSchool:', updatedSchool);

        return schools.map(school => school.id === updatedSchool.id ? updatedSchool : school)
      }
      // if (action.payload) {
      //     const student = action.payload;

      //   // const student = action.payload;
      //   // const updatedSchool = findSchoolByStudent(schools, student);
      //   // updatedSchool.students = updatedSchool.students.filter(_student => _student.id !== student.id);
      //   // return schools.map(school => school.id === updatedSchool.id ? updatedSchool : school)
      // }
      return schools;

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
          // delete student.school;
          student.school = null;
          return student;
        }
        return student;
      })

    
    default:
      return students;
  }
}
