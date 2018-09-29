import { LOAD_SCHOOLS, DELETE_SCHOOL, CREATE_SCHOOL, UPDATE_SCHOOL } from './actionTypes';
import { LOAD_STUDENTS, DELETE_STUDENT, CREATE_STUDENT, UPDATE_STUDENT } from './actionTypes';

export const schoolsReducer = (schools=[], action)=> {
  switch(action.type) {
    case LOAD_SCHOOLS:
      return action.payload;
    case DELETE_SCHOOL:
      return schools.filter( school => school.id !== action.payload.id );
    case CREATE_SCHOOL:
      return [...schools, action.payload]
    case DELETE_STUDENT:
      if (!action.payload.schoolId) { //if the deleted student wasn't enrolled in a school, then schools are unaffected
        return schools;
      }
      const studentId = action.payload.id;
      const { schoolId } = action.payload;
      const updatedSchool = schools.find(school => school.id === schoolId);
      updatedSchool.students = updatedSchool.students.filter( student => {
        console.log('updatedSchool, student:', student);
        console.log('updatedSchool, student.id:', student.id);
        console.log('updatedSchool, studentId:', studentId);
        student.id !== studentId
      } );
      return schools.map( school => school.id === updatedSchool.id ? updatedSchool : school );
    case UPDATE_SCHOOL:
      const updated = action.payload;
      return schools.map( school => school.id === updated.id ? updated : school );
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
      // console.log('studentsReducer, action.payload', action.payload);
      // const school = getSchool(schools, action.payload.schoolId)


      // if () {

      // }

      return students.map( student => student.id === action.payload.id ? action.payload : student )

      //if student.id exists in school's students, return a new students array with student filtered out


    
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
