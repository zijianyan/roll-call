import { _loadSchools } from './actionCreators';
import axios from 'axios';

export const loadSchools_thunk = ()=> {
  return (dispatch)=> {
    axios.get('/api/schools')
      .then(res => res.data)
      .then(schools => dispatch(_loadSchools(schools)))
  }
}