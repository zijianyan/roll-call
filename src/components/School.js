import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { deleteSchool_thunk, updateStudent_thunk, updateSchool_thunk } from '../store/thunks';

import { getSchool, findEnrolled } from '../utils';

import SchoolForm from './SchoolForm';

class School extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      address: '',
      description: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState(this.props.school);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.school !== this.props.school) {
      this.setState(this.props.school);
    }
  }

  handleChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  handleSubmit(ev) {
    ev.preventDefault();
    const school = {
      id: this.props.school.id,
      name: this.state.name,
      address: this.state.address,
      description: this.state.description
    };
    this.props.updateSchool(school);
  }



  render() {
    const { handleChange, handleSubmit } = this;
    const { name, address, description } = this.state;

    const { school, schools, deleteSchool, otherStudents, unenrollStudent, enrollStudent, enrolledStudents, history } = this.props;
    
    const isEmpty = name || address || description ? false : true;

    if (!school) {
      return (
        <div>
          <h3>School Not Found</h3>
          <Link to='/schools'>See Schools</Link>
        </div>
      );
    }

    return (
      <div> 
        <h2>{school.name}</h2>
        <div id='school-image-container'>
          <img src={school.imageUrl} id='school-image'/>
        </div>
        <h3>Address</h3>
        <p>{school.address}</p>

        {
          school.description
            ? (<div><h3>Description</h3>
              <p>{school.description}</p></div>)
            : null
        }


        <h3>Update School</h3>
        <SchoolForm type='update' history={history} school={school}/>


        <h3>{enrolledStudents.length ? 'Students' : 'No Students'}</h3>
        <ul>
          {
            enrolledStudents ? enrolledStudents.map( student =>
              <li key={student.id}>
                <Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link> - GPA: {student.gpa}
                <button onClick={()=> unenrollStudent(student)}>Unenroll</button>
              </li>
            ) : null
          }
          <li><Link to={`/students/create/${school.id}`}><button>Add New Student</button></Link></li>      
        </ul>
        <hr/>
        <button onClick={()=> deleteSchool(school)}>Delete School</button>
        <hr/>

        <h3>Other Students</h3>
        <ul>
          {
            otherStudents.map( student => {
              const otherSchool = getSchool(schools, student.schoolId);
              return (
                <li key={student.id}>
                  <Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link>
                  {
                    otherSchool
                      ? (<span> - {otherSchool.name} - <button onClick={()=> enrollStudent(student)}>Transfer In</button></span>)
                      : (<span> - <button onClick={()=> enrollStudent(student)}>Enroll</button></span>)
                  }
                  <div>
                  </div>
                </li>
              );
            })
          }
        </ul>
      </div>
    ); 
  }
}

School.propTypes = {
  id: PropTypes.number,
  school: PropTypes.object
};

const mapStateToProps = ({ schools, students }, { match })=> {
  return {
    schools,
    school: getSchool(schools, match.params.id), //remove *1 typecoercion if using UUID for all match.params.id's
    otherStudents: students.filter (student => student.schoolId !== match.params.id),
    enrolledStudents: findEnrolled(students, match.params.id)
  };
};


const mapDispatchToProps = (dispatch, { match, history })=> {
  return {
    deleteSchool: (school)=> {
      dispatch(deleteSchool_thunk(school));
      history.push('/schools');
    },
    unenrollStudent: (student)=> {
      const _student = {...student, schoolId: null};
      dispatch(updateStudent_thunk(_student));
    },
    enrollStudent: (student)=> {
      const _student = {...student, schoolId: match.params.id*1};
      dispatch(updateStudent_thunk(_student));
    },
    updateSchool: (school)=> {
      dispatch(updateSchool_thunk(school));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(School);


// <form onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor='school-name'>Name</label>
//             <input id='school-name' name='name' placeholder='School Name' value={name} onChange={handleChange}/>
//           </div>
//           <div>
//             <label htmlFor='school-address'>Address</label>
//             <input id='school-address' name='address' placeholder='Address' value={address} onChange={handleChange}/>
//           </div>
//           <div>
//             <label htmlFor='school-description'>Description</label>
//             <textarea id='school-description' name='description' placeholder='Description' value={description} onChange={handleChange}>
//             </textarea>
//           </div>
//           <button disabled={isEmpty}>Save</button>
//         </form>