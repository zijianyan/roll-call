const expect = require('chai').expect;

const { syncAndSeed } = require('../server/db');
const { School, Student } = require('../server/db').models;

const app = require('supertest')(require('../server/app.js'));

describe('models', ()=> {

  beforeEach(()=> syncAndSeed());

  describe('School model', ()=> {
    it('has three schools', async ()=> {
      const schools = await School.findAll();
      expect(schools.length).to.equal(3);
    });
    it('schools have their correct students', async ()=> {
      const [ NYU, BU, USC ] = await Promise.all([
        School.findOne({ where: { name: 'NYU' }, include: [ Student ]}),
        School.findOne({ where: { name: 'BU' }, include: [ Student ]}),
        School.findOne({ where: { name: 'USC' }, include: [ Student ]})
      ])
      expect(NYU.students.length).to.equal(2);
      expect(BU.students.length).to.equal(1);
      expect(USC.students.length).to.equal(1);
    });
  });

  describe('Student model', async ()=> {
    it('has five students', async ()=> {
      const students = await Student.findAll();
      console.log('students:', students);
      expect(students.length).to.equal(5);
    });
    it('students belong to their correct schools', async ()=> {
      const [ jane, avery, sam, leo, nadia ] = await Promise.all([
        Student.findOne({ where: { firstName: 'Jane' }, include: [ School ]}),
        Student.findOne({ where: { firstName: 'Avery' }, include: [ School ]}),
        Student.findOne({ where: { firstName: 'Sam' }, include: [ School ]}),
        Student.findOne({ where: { firstName: 'Leo' }, include: [ School ]}),
        Student.findOne({ where: { firstName: 'Nadia' }, include: [ School ]})
      ])
      expect(jane.school.name).to.equal('NYU');
      expect(avery.school.name).to.equal('USC');
      expect(sam.school.name).to.equal('BU');
      expect(leo.school.name).to.equal('NYU');
      expect(nadia.school).to.equal(null);
    })

  });


});


describe('server', ()=> {

  it('serves a homepage with a root div', ()=> {
    return app.get('/')
      .expect(200)
      .then(response => {
        expect(response.text).to.contain('<div id="root"></div>')
      })
  });

  it('/api/schools serves all the schools and eager loads their students', ()=> {
    return app.get('/api/schools')
      .expect(200)
      .then(response => {
        const schools = response.body;
        const NYU = schools.find(school => school.name === 'NYU')
        expect(schools.length).to.equal(3);
        expect(NYU.students.length).to.equal(2); 
      })
  });

  it('/api/students serves all the students', ()=> {
    return app.get('/api/students')
      .expect(200)
      .then(response => {
        const students = response.body;
        const jane = students.find(student => student.firstName === 'Jane');
        const nadia = students.find(student => student.firstName === 'Nadia');
        expect(students.length).to.equal(5);
        expect(jane.school.name).to.equal('NYU');
        expect(nadia.school).to.equal(null);
      })
  });

});