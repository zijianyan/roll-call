import { LOAD_SCHOOLS, DELETE_SCHOOL, CREATE_SCHOOL, UPDATE_SCHOOL } from './actionTypes';
import { LOAD_STUDENTS, DELETE_STUDENT, CREATE_STUDENT, UPDATE_STUDENT } from './actionTypes';

/*SCHOOLS*/
export const _loadSchools = schools => ({
  type: LOAD_SCHOOLS,
  payload: schools
});
export const _deleteSchool = school => ({
  type: DELETE_SCHOOL,
  payload: school
});
export const _createSchool = school => ({
  type: CREATE_SCHOOL,
  payload: school
});
export const _updateSchool = school => ({
  type: UPDATE_SCHOOL,
  payload: school
});

/*STUDENTS*/
export const _loadStudents = students => ({
  type: LOAD_STUDENTS,
  payload: students
});

export const _deleteStudent = student => ({
  type: DELETE_STUDENT,
  payload: student
});
export const _createStudent = student => ({
  type: CREATE_STUDENT,
  payload: student
});
export const _updateStudent = student => ({
  type: UPDATE_STUDENT,
  payload: student
});