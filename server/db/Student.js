const conn = require('./conn');
const { Sequelize } = conn;

const axios = require('axios');

const Student = conn.define('student', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  gpa: {
    type: Sequelize.FLOAT
  },
  imageUrl: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  }
}, {
  hooks: {
    beforeCreate: (student)=> {
      student.firstName = student.firstName.slice(0,1).toUpperCase() + student.firstName.slice(1, student.firstName.length);
      student.lastName = student.lastName.slice(0,1).toUpperCase() + student.lastName.slice(1, student.lastName.length);
      !student.imageUrl ? student.imageUrl = 'http://source.unsplash.com/random?animal' : null
    },
    beforeUpdate: (student)=> {
      student.firstName = student.firstName.slice(0,1).toUpperCase() + student.firstName.slice(1, student.firstName.length);
      student.lastName = student.lastName.slice(0,1).toUpperCase() + student.lastName.slice(1, student.lastName.length);
    }
  }
});


Student.createRandom = function() {
  const female = Math.floor(Math.random()*2);
  return axios.get( female 
    ? 'https://randomuser.me/api/?results=1&nat=US&gender=female'
    : 'https://randomuser.me/api/?results=1&nat=US&gender=male'
  )
    .then(res => res.data)
    .then(data => data.results[0])
    .then(student => Student.create({ firstName: student.name.first, lastName: student.name.last, gpa: (Math.random()*(4-2.7)+2.7).toFixed(2), imageUrl: student.picture.large }))
    .catch(ex => {
      // console.log(ex);
      // return Student.create({ firstName: 'Internetless', lastName: 'Student', gpa: 0 }) // if no internet connection, create this student
    });
};

module.exports = Student;