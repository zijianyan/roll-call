const Sequelize = require('sequelize');

const conn = new Sequelize(process.env.DATABASE_URL, {
  logging: false  
});

const faker = require('faker');

const axios = require('axios');


const randomSchoolNoun = ()=> {
  const schoolNouns = ['School', 'College', 'University', 'Institute', 'Academy', 'Guild', 'League', 'Division', 'Camp', 'Society', 'Foundation', 'Conservatory'];
  const index = Math.floor(Math.random() * schoolNouns.length);
  return schoolNouns[index];
};

const School = conn.define('school', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
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
    type: Sequelize.TEXT
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
      school.imageUrl = 'http://source.unsplash.com/random?city'
    },
    beforeUpdate: (school)=> {
      school.name = school.name.slice(0,1).toUpperCase() + school.name.slice(1, school.name.length);
    }
  }
});

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


Student.belongsTo(School);
School.hasMany(Student);

School.createRandom = function() {
  return School.create({
    name: `${faker.address.city()} ${randomSchoolNoun()}`,
    address: faker.address.streetAddress(),
    description: faker.lorem.paragraphs(3),
    imageUrl: `http://source.unsplash.com/random?`
  });
};

Student.createRandom = function() {
  const female = Math.floor(Math.random()*2);
  return axios.get( female 
    ? 'https://randomuser.me/api/?results=1&nat=US&gender=female'
    : 'https://randomuser.me/api/?results=1&nat=US&gender=male'
  )
    .then(res => res.data)
    .then(data => data.results[0])
    .then(student => Student.create({ firstName: student.name.first, lastName: student.name.last, gpa: (Math.random()*(4-2.7)+2.7).toFixed(2), imageUrl: student.picture.large }));
}

const createSchools = (num)=> {
  const schools = [];
  for (var i = 0; i < num; i++) { schools.push(School.createRandom())};
  return schools;
}

const createStudents = (num)=> {
  const students = [];
  for (var i = 0; i < num; i++) { students.push(Student.createRandom())};
  return students;
}

const syncAndSeed = async ()=> {
  await conn.sync({ force: true });
  const [ sch01, sch02, sch03 ] = await Promise.all(createSchools(3));
  const [ stu01, stu02, stu03, stu04, stu05 ] = await Promise.all(createStudents(10));
  await Promise.all([
    stu01.setSchool(sch01),
    stu02.setSchool(sch02),
    stu03.setSchool(sch03),
    stu04.setSchool(sch01)
  ]);
};


const syncAndSeedTest = async ()=> {
  await conn.sync({ force: true });
  const [ sch01, sch02, sch03 ] = await Promise.all([
    School.create({
      name: 'NYU',
      address: '12345 Broadway, New York, NY 12345',
      description: faker.lorem.paragraphs(3)
    }),
    School.create({
      name: 'USC',
      address: '12345 Pacific Hwy, Los Angeles, CA 12345',
      description: faker.lorem.paragraphs(3)
    }),
    School.create({
      name: 'BU',
      address: '12345 Main St, Boston, MA 12345',
      description: faker.lorem.paragraphs(3)
    })
  ]);
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
  syncAndSeedTest,
  models: {
    Student,
    School
  }
};