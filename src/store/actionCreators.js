import { LOAD_SCHOOLS, DELETE_SCHOOL, CREATE_SCHOOL, UPDATE_SCHOOL } from './actionTypes';
import { LOAD_STUDENTS, DELETE_STUDENT, CREATE_STUDENT, UPDATE_STUDENT, UNENROLL_STUDENT } from './actionTypes';

export const _loadSchools = (schools)=> {
  return {
    type: LOAD_SCHOOLS,
    payload: schools
  }
}

export const _deleteSchool = (school)=> {
  return {
    type: DELETE_SCHOOL,
    payload: school
  }
}

export const _createSchool = (school)=> {
  return {
    type: CREATE_SCHOOL,
    payload: school
  }
}

export const _updateSchool = (school)=> {
  return {
    type: UPDATE_SCHOOL,
    payload: school
  }
}




/*STUDENTS*/

export const _loadStudents = (students)=> {
  return {
    type: LOAD_STUDENTS,
    payload: students
  }
}

export const _deleteStudent = (student)=> {
  return {
    type: DELETE_STUDENT,
    payload: student
  }
}

export const _createStudent = (student)=> {
  return {
    type: CREATE_STUDENT,
    payload: student
  }
}

export const _updateStudent = (student)=> {
  return {
    type: UPDATE_STUDENT,
    payload: student
  }
}

export const _unenrollStudent = (school, student)=> {
  return {
    type: UNENROLL_STUDENT,
    school,
    student
  }
}