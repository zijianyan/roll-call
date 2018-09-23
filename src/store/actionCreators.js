import { LOAD_SCHOOLS } from './actionTypes';

export const _loadSchools = (schools)=> {
  return {
    type: LOAD_SCHOOLS,
    payload: schools
  }
}