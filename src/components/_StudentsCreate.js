import React, { Component } from 'react';

import { connect } from 'react-redux';

import { createStudentRandom_thunk } from '../store/thunks';


import StudentFormDialog from './StudentFormDialog';


class StudentsCreate extends Component {

  constructor() {
    super();
  }

  render() {
    const { createStudentRandom, history, schoolId } = this.props;
    return (
      <div>
        <h2>Create A Student</h2>
        <StudentForm type='create' schoolId={schoolId} history={history}/>
        <hr/>
        <button onClick={createStudentRandom}>Create Random Student</button>
      </div>
    );
  }
}

const mapStateToProps = ({ schools }, { match } )=> {
  return {
    schools,
    schoolId: match.params.schoolId,
  };
};

const mapDispatchToProps = (dispatch, { history })=> {
  return {
    createStudentRandom: ()=> {
      dispatch(createStudentRandom_thunk());
      history.push('/students');
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentsCreate);


