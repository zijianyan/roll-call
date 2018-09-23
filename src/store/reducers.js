import { LOAD_SCHOOLS, LOAD_STUDENTS } from './actionTypes';

export const schoolsReducer = (schools=[], action)=> {
  switch(action.type) {
    case LOAD_SCHOOLS:
      return action.payload;
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
