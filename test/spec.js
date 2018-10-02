const expect = require('chai').expect;

const { syncAndSeedTest } = require('../server/db');
const { School, Student } = require('../server/db').models;

const app = require('supertest')(require('../server/app.js'));

describe('senior enrichment project', ()=> {

  beforeEach(()=> syncAndSeedTest());

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
        ]);
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
        ]);
        expect(jane.school.name).to.equal('NYU');
        expect(avery.school.name).to.equal('USC');
        expect(sam.school.name).to.equal('BU');
        expect(leo.school.name).to.equal('NYU'); //why is this breaking?
        expect(nadia.school).to.equal(null);
      });
    });
  });

  describe('server', ()=> {
    describe('static routes', ()=> {
      it('serves a homepage with a root div', ()=> {
        return app.get('/')
          .expect(200)
          .then(response => {
            expect(response.text).to.contain('<div id="root"></div>')
          });
      });
      it('has a static route that serves /dist/main.js', ()=> {
        return app.get('/dist/main.js')
          .expect(200);
      });
    });
    describe('GET routes', ()=> {
      it('/api/schools serves all the schools', ()=> {
        return app.get('/api/schools')
          .expect(200)
          .then(response => {
            const schools = response.body;
            const NYU = schools.find(school => school.name === 'NYU')
            expect(schools.length).to.equal(3);
            expect(NYU).to.be.ok;
          });
      });
      it('/api/students serves all the students', ()=> {
        return app.get('/api/students')
          .expect(200)
          .then(response => {
            const students = response.body;
            const jane = students.find(student => student.firstName === 'Jane');
            const nadia = students.find(student => student.firstName === 'Nadia');
            expect(students.length).to.equal(5);
          });
      });
      it('gets a school by id', async ()=> {
        const NYU = await School.findOne({ where: { name: 'NYU' }});
        const id = NYU.id;
        return app.get(`/api/schools/${id}`)
          .expect(200)
          .then(response => {
            const school = response.body;
            expect(school).to.be.ok;
            expect(school.id).to.equal(id);
          });
      });
      it('gets a student by id', async ()=> {
        const jane = await Student.findOne({ where: { firstName: 'Jane', lastName: 'Jackson'}});
        const id = jane.id
        return app.get(`/api/students/${id}`)
          .expect(200)
          .then(response => {
            const student = response.body;
            expect(student).to.be.ok;
            expect(student.id).to.equal(id);
          });
      });
    });
    describe('DELETE routes', ()=> {
      it('deletes a school by id', async ()=> {
        const NYU = await School.findOne({ where: { name: 'NYU' }});
        const USC = await School.findOne({ where: { name: 'USC' }});
        return app.delete(`/api/schools/${NYU.id}`)
          .expect(204)
          .then( async ()=> {
            const deleted = await School.findById(NYU.id);
            const stillHere = await School.findById(USC.id);
            expect(deleted).to.equal(null);
            expect(stillHere).to.be.ok;
          });
      });
      it('deletes a student by id', async ()=> {
        const jane = await Student.findOne({ where: { firstName: 'Jane', lastName: 'Jackson' }});
        const sam = await Student.findOne({ where: { firstName: 'Sam', lastName: 'Smith' }});
        return app.delete(`/api/students/${jane.id}`)
          .expect(204)
          .then( async ()=> {
            const deleted = await Student.findById(jane.id);
            const stillHere = await Student.findById(sam.id);
            expect(deleted).to.equal(null);
            expect(stillHere).to.be.ok;
          });
      });
    });

    describe('POST routes', ()=> {
      it('creates a school', ()=> {
        return app.post('/api/schools')
          .send({ name: 'Columbia', address: 'uptown', description: 'ivy league' })
          .expect(201)
          .then(res => res.body)
          .then(school => expect(school.name).to.equal('Columbia'))
          .then( async ()=> { //double-checking that it's created
            const columbia = await School.findOne({ where: { name: 'Columbia' }});
            expect(columbia).to.be.ok;
            expect(columbia.name).to.equal('Columbia');
          });
      });
      it('creates a student with no school', ()=> {
        return app.post('/api/students')
          .send({ firstName: 'Zi', lastName: 'Yan', gpa: 4 })
          .expect(201)
          .then(res => res.body)
          .then(student => {
            expect(student.firstName).to.equal('Zi');
            expect(student.schoolId).to.equal(null);
          });
      });
      it('creates a student that belongs to a school', async ()=> {
        const NYU = await School.findOne({ where: { name: 'NYU' }});
        return app.post('/api/students')
          .send({ firstName: 'moe', lastName: 'moeson', gpa: 4, schoolId: NYU.id })
          .expect(201)
          .then(res => res.body)
          .then(student => {
            expect(student.schoolId).to.equal(NYU.id);
          });
      });
    });

    describe('PUT routes', ()=> {
      it('edits a school', async ()=> {
        const NYU = await School.findOne({ where: { name: 'NYU' }});
        return app.put(`/api/schools/${NYU.id}`)
          .send({ name: 'New School', address: 'Manhattan', description: 'it is new' })
          .expect(200)
          .then(res => res.body)
          .then(newSchool => {
            expect(newSchool.id).to.equal(NYU.id);
            expect(newSchool).to.not.equal(NYU);
            expect(newSchool.name).to.equal('New School');
          });
      });
      it('edits a student', async ()=> {
        const sam = await Student.findOne({ where: { firstName: 'Sam', lastName: 'Smith' }});
        return app.put(`/api/students/${sam.id}`)
          .send({ firstName: 'Samuel', lastName: 'Smithsonian', gpa: 1 })
          .expect(200)
          .then(res => res.body)
          .then(samuel => {
            expect(samuel.id).to.equal(sam.id);
            expect(samuel.firstName).to.equal('Samuel');
          })
          .then( async ()=> {
            const samuel = await Student.findById(sam.id);
            expect(samuel.firstName).to.equal('Samuel');
          });
      });
      it('assigns a student to a new school', async ()=> {
        const NYU = await School.findOne({ where: { name: 'NYU' }});
        const USC = await School.findOne({ where: { name: 'USC' }});
        const NYUstudent = await Student.findOne({ where: { schoolId: NYU.id }});
        return app.put(`/api/students/${NYUstudent.id}`)
          .send({ schoolId: USC.id })
          .expect(200)
          .then(res => res.body)
          .then(student => {
            expect(student.schoolId).to.equal(USC.id);
            expect(student.firstName).to.equal(NYUstudent.firstName);
          });
      });
      it('enrolls an unenrolled student', async ()=> {
        const unenrolled = await Student.findOne({ where: { schoolId: null } });
        const NYU = await School.findOne({ where: { name: 'NYU' }});
        return app.put(`/api/students/${unenrolled.id}`)
          .send({ schoolId: NYU.id })
          .expect(200)
          .then(res => res.body)
          .then( async (student) => {
            expect(student.schoolId).to.equal(NYU.id);
            const enrolled = await Student.findById(unenrolled.id, { include: [ School ]});
            expect(enrolled.school.name).to.equal('NYU');
          });
      });
      it('unenrolls a student', async ()=> {
        const NYU = await School.findOne({ where: { name: 'NYU' }, include: [ Student ]});
        const NYUstudent = await Student.findOne({ where: { schoolId: NYU.id }});
        expect(NYU.students.length).to.equal(2);
        return app.put(`/api/students/${NYUstudent.id}`)
          .send({ schoolId: null })
          .expect(200)
          .then(res => res.body)
          .then( async (student) => {
            const updatedNYU = await School.findById(NYU.id, { include: [ Student ]});
            const updatedStudent = await Student.findById(NYUstudent.id)
            expect(student.schoolId).to.equal(null);
            expect(updatedStudent.schoolId).to.equal(null);
            expect(updatedNYU.students.length).to.equal(1);
          });
      });
    });
  });

});






//Student form

//Revise School to emulate Student MUI
//data list in School for students


//separate db file into conn and models
//full Address, City, State, Zipcode fields for School
//error handling/validation
//proptypes