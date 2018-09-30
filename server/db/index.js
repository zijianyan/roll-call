const Sequelize = require('sequelize');

const conn = new Sequelize(process.env.DATABASE_URL, {
  logging: false  
});

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
});


Student.belongsTo(School);
School.hasMany(Student);

const syncAndSeed = async ()=> {

  await conn.sync({
    force: true
  });

  const [ NYU, USC, BU ] = await Promise.all([
    School.create({ name: 'NYU', address: 'new york', description: 'the big apple'}),
    School.create({ name: 'USC', address: 'los angeles', description: 'sunny weather'}),
    School.create({ name: 'BU', address: 'boston', description: 'not to be confused with BC'})
  ]);

  const [ jane, avery, sam, leo, nadia ] = await Promise.all([
    Student.create({ firstName: 'Jane', lastName: 'Jackson', gpa: 4 }),
    Student.create({ firstName: 'Avery', lastName: 'Alvarez', gpa: 3 }),
    Student.create({ firstName: 'Sam', lastName: 'Smith', gpa: 4 }),
    Student.create({ firstName: 'Leo', lastName: 'Lee', gpa: 2 }),
    Student.create({ firstName: 'Nadia', lastName: 'Newson', gpa: 3 })
  ]);

  await Promise.all([
    jane.setSchool(NYU),
    avery.setSchool(USC),
    sam.setSchool(BU),
    leo.setSchool(NYU)
  ]);

};

module.exports = {
  syncAndSeed,
  models: {
    Student,
    School
  }
};