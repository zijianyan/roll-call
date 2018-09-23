import { LOAD_SCHOOLS } from './actionTypes';

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
    default:
      return students;
  }
}
