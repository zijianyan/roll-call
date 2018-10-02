import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { deleteStudent_thunk, updateStudent_thunk } from '../store/thunks';
import { getSchool, getStudent } from '../utils';
import { Link } from 'react-router-dom';

import { withStyles, Typography, Button, IconButton, Tooltip, Card, CardContent, CardActions, CardActionArea, CardMedia, CardHeader } from '@material-ui/core';
import { Eject } from '@material-ui/icons';

import StudentForm from './StudentForm';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
};


const Student = ({ student, deleteStudent, school, unenroll, history, classes })=> {
  window.scroll(0,0);
  if (!student) {
    return (
      <div>
        Student not found
      </div>
    );
  }
  return (
    <div>
      

      <Card className={classes.card}>
        <CardActionArea>
          <div id='student-image-container'>
            <img src={student.imageUrl} id='student-image'/>
          </div>

          <CardContent>
            <Typography variant='display1'>{student ? `${student.firstName} ${student.lastName} - GPA: ${student.gpa}` : null }</Typography>
            {
              school
                ? (<Fragment><Typography variant='subheading'>Enrolled in <Link to={`/schools/${school.id}`}>{school.name}</Link></Typography>
                
                  <Tooltip title='Unenroll'>
                    <IconButton onClick={()=> unenroll(student)}><Eject/>
                    </IconButton>
                  </Tooltip></Fragment>)
                : <Typography variant='subheading'>Not enrolled</Typography>
            }
          </CardContent>
          <CardActions>
            <StudentForm type='update' student={student}/>
          </CardActions>
        </CardActionArea>
      </Card>

      
      
      
      <hr/>
      <button onClick={()=> deleteStudent(student)}>Delete Student</button>
    </div>
  );
};

const mapStateToProps = ({ students, schools }, { match })=> {
  const student = getStudent(students, match.params.id);
  return {
    student,
    school: student ? getSchool(schools, student.schoolId) : null
  };
};

const mapDispatchToProps = (dispatch, { history })=> {
  return {
    deleteStudent: (student)=> {
      dispatch(deleteStudent_thunk(student));
      history.push('/students');
    },
    unenroll: (student)=> {
      dispatch(updateStudent_thunk({...student, schoolId: null}))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Student));
