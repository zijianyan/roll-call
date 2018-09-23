import { LOAD_SCHOOLS, DELETE_SCHOOL } from './actionTypes';
import { LOAD_STUDENTS } from './actionTypes';

export const schoolsReducer = (schools=[], action)=> {
  switch(action.type) {
    case LOAD_SCHOOLS:
      return action.payload;
    case DELETE_SCHOOL:
      return schools.filter( school => school.id !== action.payload.id );
    default:
      return schools;
  }
}

export const studentsReducer = (students=[], action)=> {
  switch(action.type) {
    case LOAD_STUDENTS:
      return action.payload;
    default:
      return students;
  }
}
