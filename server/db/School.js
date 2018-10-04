const conn = require('./conn');
const { Sequelize } = conn;

const faker = require('faker');

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

const randomSchoolNoun = ()=> {
  const schoolNouns = ['School', 'College', 'University', 'Institute', 'Academy', 'Guild', 'League', 'Division', 'Camp', 'Society', 'Foundation', 'Conservatory'];
  const index = Math.floor(Math.random() * schoolNouns.length);
  return schoolNouns[index];
};

School.createRandom = function() {
  return School.create({
    name: `${faker.address.city()} ${randomSchoolNoun()}`,
    address: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.countryCode()}`,
    description: faker.lorem.paragraphs(3),
    imageUrl: `http://source.unsplash.com/random?`
  });
};

module.exports = School;