import { LOAD_SCHOOLS, DELETE_SCHOOL } from './actionTypes';
import { LOAD_STUDENTS } from './actionTypes';

export const _loadSchools = (schools)=> {
  return {
    type: LOAD_SCHOOLS,
    payload: schools
  }
}

export const _deleteSchool = (school) => {
  return {
    type: DELETE_SCHOOL,
    payload: school
  }
}

export const _loadStudents = (students)=> {
  return {
    type: LOAD_STUDENTS,
    payload: students
  }
}