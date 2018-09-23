import { LOAD_SCHOOLS, LOAD_STUDENTS } from './actionTypes';

export const _loadSchools = (schools)=> {
  return {
    type: LOAD_SCHOOLS,
    payload: schools
  }
}

export const _loadStudents = (students)=> {
  return {
    type: LOAD_STUDENTS,
    payload: students
  }
}