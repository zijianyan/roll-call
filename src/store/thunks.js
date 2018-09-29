import { _loadSchools, _deleteSchool, _createSchool, _updateSchool } from './actionCreators';
import { _loadStudents, _deleteStudent, _createStudent, _updateStudent } from './actionCreators';

import axios from 'axios';

export const loadSchools_thunk = ()=> {
  return (dispatch)=> {
    axios.get('/api/schools')
      .then(res => res.data)
      .then(schools => dispatch(_loadSchools(schools)))
  }
}

export const deleteSchool_thunk = (school)=> {
  return (dispatch)=> {
    axios.delete(`/api/schools/${school.id}`)
      .then(()=> dispatch(_deleteSchool(school)))
  }
}

export const createSchool_thunk = (school)=> {
  return (dispatch)=> {
    axios.post('/api/schools', school)
      .then(res => res.data)
      .then(school => dispatch(_createSchool(school)))
  }
}

export const updateSchool_thunk = (school)=> {
  return (dispatch)=> {
    axios.put(`/api/schools/${school.id}`, school)
      .then(res => res.data)
      .then(school => dispatch(_updateSchool(school)))
  }
}

/*STUDENTS*/


export const loadStudents_thunk = ()=> {
  return (dispatch)=> {
    axios.get('/api/students/')
      .then(res => {
        console.log('thunks, loadStudents_thunk, res.data:', res.data);
        return res.data
      })
      .then(students => dispatch(_loadStudents(students)))
  }
}

export const deleteStudent_thunk = (student)=> {
  return (dispatch)=> {
    axios.delete(`/api/students/${student.id}`)
      .then(()=> dispatch(_deleteStudent(student)))
  }
}

export const createStudent_thunk = (student)=> {
  return (dispatch)=> {
    axios.post('/api/students', student)
      .then(res => res.data)
      .then(student => dispatch(_createStudent(student)))
  }
}

export const updateStudent_thunk = (student)=> {
  return (dispatch)=> {
    axios.put(`/api/students/${student.id}`, student)
      .then(res => {
        // console.log('updateStudent_thunk, res.data:', res.data);
        return res.data;
      })
      .then(student => dispatch(_updateStudent(student)))
  }
}