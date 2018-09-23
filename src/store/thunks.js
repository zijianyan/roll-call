import { _loadSchools, _loadStudents } from './actionCreators';
import axios from 'axios';

export const loadSchools_thunk = ()=> {
  return (dispatch)=> {
    axios.get('/api/schools')
      .then(res => res.data)
      .then(schools => dispatch(_loadSchools(schools)))
  }
}

export const loadStudents_thunk = ()=> {
  return (dispatch)=> {
    axios.get('/api/students/')
      .then(res => res.data)
      .then(students => dispatch(_loadStudents(students)))
  }
}