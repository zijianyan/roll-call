const Sequelize = require('sequelize');

const conn = new Sequelize(process.env.DATABASE_URL, {
  logging: false  
});

const faker = require('faker');

const randomSchoolNoun = ()=> {
  const schoolNouns = ['School', 'College', 'University', 'Institute', 'Academy', 'Guild', 'Clinic', 'Association', 'League', 'Division', 'Department', 'Camp', 'Club', 'Society', 'Foundation', 'Conservatory'];
  const index = Math.floor(Math.random() * schoolNouns.length);
  return schoolNouns[index];
};




const School = conn.define('school', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  }
}, {
  hooks: {
    beforeCreate: (school)=> {
      school.name = school.name.slice(0,1).toUpperCase() + school.name.slice(1, school.name.length);
      const firstWord = school.name.split(' ')[0]
      school.imageUrl = `http://source.unsplash.com/random?${firstWord}`
    },
    beforeUpdate: (school)=> {
      school.name = school.name.slice(0,1).toUpperCase() + school.name.slice(1, school.name.length);
      const firstWord = school.name.split(' ')[0]
      school.imageUrl = `http://source.unsplash.com/random?${firstWord}`
    }
  }
});

const Student = conn.define('student', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  gpa: {
    type: Sequelize.FLOAT //will change to FLOAT or another data type later
  }
}, {
  hooks: {
    beforeCreate: (student)=> {
      student.firstName = student.firstName.slice(0,1).toUpperCase() + student.firstName.slice(1, student.firstName.length);
      student.lastName = student.lastName.slice(0,1).toUpperCase() + student.lastName.slice(1, student.lastName.length);
    },
    beforeUpdate: (student)=> {
      student.firstName = student.firstName.slice(0,1).toUpperCase() + student.firstName.slice(1, student.firstName.length);
      student.lastName = student.lastName.slice(0,1).toUpperCase() + student.lastName.slice(1, student.lastName.length);
    }
  }
});


Student.belongsTo(School);
School.hasMany(Student);

const syncAndSeed = async ()=> {

  await conn.sync({
    force: true
  });

  const [ sch01, sch02, sch03 ] = await Promise.all([
    School.create({
      name: `${faker.commerce.color()} ${randomSchoolNoun()}`,
      address: '12345 Broadway, New York, NY 12345',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      imageUrl: `http://source.unsplash.com/random?`
    }),
    School.create({
      name: `${faker.commerce.color()} ${randomSchoolNoun()}`,
      address: '12345 Pacific Hwy, Los Angeles, CA 12345',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      imageUrl: 'https://images.unsplash.com/photo-1537027277825-12f85d063e6e?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9&s=8e6e2127c107f0081c8196d1a663effc'
    }),
    School.create({
      name: `${faker.commerce.color()} ${randomSchoolNoun()}`,
      address: '12345 Main St, Boston, MA 12345',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      imageUrl: 'https://images.unsplash.com/photo-1537027277825-12f85d063e6e?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9&s=8e6e2127c107f0081c8196d1a663effc'
    })
  ]);

  /* FOR TESTING
  // const [ sch01, sch02, sch03 ] = await Promise.all([
  //   School.create({
  //     name: 'NYU',
  //     address: '12345 Broadway, New York, NY 12345',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  //   }),
  //   School.create({
  //     name: 'USC',
  //     address: '12345 Pacific Hwy, Los Angeles, CA 12345',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  //   }),
  //   School.create({
  //     name: 'BU',
  //     address: '12345 Main St, Boston, MA 12345',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  //   })
  // ]);
  */

  const [ stu01, stu02, stu03, stu04, stu05 ] = await Promise.all([
    Student.create({ firstName: 'Jane', lastName: 'Jackson', gpa: 4 }),
    Student.create({ firstName: 'Avery', lastName: 'Alvarez', gpa: 3 }),
    Student.create({ firstName: 'Sam', lastName: 'Smith', gpa: 4 }),
    Student.create({ firstName: 'Leo', lastName: 'Lee', gpa: 2 }),
    Student.create({ firstName: 'Nadia', lastName: 'Newson', gpa: 3 })
  ]);

  await Promise.all([
    stu01.setSchool(sch01),
    stu02.setSchool(sch02),
    stu03.setSchool(sch03),
    stu04.setSchool(sch01)
  ]);

};

module.exports = {
  syncAndSeed,
  models: {
    Student,
    School
  }
};