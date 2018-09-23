import { createStore, combineReducers, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';

import { schoolsReducer, studentsReducer } from './reducers';

const reducer = combineReducers({
  schools: schoolsReducer,
  students: studentsReducer
})

const store = createStore(reducer, applyMiddleware(logger, thunk));

export default store;