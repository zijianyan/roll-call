import { LOAD_SCHOOLS, DELETE_SCHOOL, CREATE_SCHOOL } from './actionTypes';
import { LOAD_STUDENTS, DELETE_STUDENT } from './actionTypes';

export const schoolsReducer = (schools=[], action)=> {
  switch(action.type) {
    case LOAD_SCHOOLS:
      return action.payload;
    case DELETE_SCHOOL:
      return schools.filter( school => school.id !== action.payload.id );
    case CREATE_SCHOOL:
      return [...schools, action.payload]
    default:
      return schools;
  }
}

export const studentsReducer = (students=[], action)=> {
  switch(action.type) {
    case LOAD_STUDENTS:
      return action.payload;
    case DELETE_STUDENT:
      return students.filter( student => student.id !== action.payload.id )
    default:
      return students;
  }
}
