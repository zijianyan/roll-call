const expect = require('chai').expect;

const { syncAndSeed } = require('../server/db');
const { School, Student } = require('../server/db').models;

const app = require('supertest')(require('../server/app.js'));


describe('senior enrichment project', ()=> {

  beforeEach(()=> syncAndSeed());

  describe('models', ()=> {

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

    describe('GET routes', ()=> {
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
      it('gets a school by id', ()=> {
        return app.get('/api/schools/2')
          .expect(200)
          .then(response => {
            const school = response.body;
            expect(school).to.be.ok;
            expect(school.id).to.equal(2);
          })
      });
      it('gets a student by id', ()=> {
        return app.get('/api/students/2')
          .expect(200)
          .then(response => {
            const student = response.body
            expect(student).to.be.ok;
            expect(student.id).to.equal(2);
          });
      });
    });

    describe('DELETE routes', ()=> {

      it('deletes a school by id', ()=> {
        return app.delete('/api/schools/2')
          .expect(204)
          .then( async ()=> {
            const deleted = await School.findById(2);
            const stillHere = await School.findById(1);
            expect(deleted).to.equal(null);
            expect(stillHere).to.be.ok;
          })
      });

      it('deletes a student by id', ()=> {
        return app.delete('/api/students/2')
          .expect(204)
          .then( async ()=> {
            const deleted = await Student.findById(2);
            const stillHere = await Student.findById(1);
            expect(deleted).to.equal(null);
            expect(stillHere).to.be.ok;
          })
      });

    });

  }); 
});

