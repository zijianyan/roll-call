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
      it('gets a school by id', ()=> {
        return app.get('/api/schools/2')
          .expect(200)
          .then(response => {
            const school = response.body;
            expect(school).to.be.ok;
            expect(school.id).to.equal(2);
          });
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
          });
      });
      it('deletes a student by id', ()=> {
        return app.delete('/api/students/2')
          .expect(204)
          .then( async ()=> {
            const deleted = await Student.findById(2);
            const stillHere = await Student.findById(1);
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
      it('creates a student that belongs to a school', ()=> {
        return app.post('/api/students')
          .send({ firstName: 'moe', lastName: 'moeson', gpa: 4, schoolId: 2 })
          .expect(201)
          .then(res => res.body)
          .then(student => {
            expect(student.schoolId).to.equal(2);
          });
      });
    });

    describe('PUT routes', ()=> {
      it('edits a school', async ()=> {
        const oldSchool = await School.findById(2);
        return app.put('/api/schools/2')
          .send({ name: 'New School', address: 'Manhattan', description: 'it is new' })
          .expect(200)
          .then(res => res.body)
          .then(newSchool => {
            expect(newSchool.id).to.equal(oldSchool.id);
            expect(newSchool).to.not.equal(oldSchool);
            expect(newSchool.name).to.equal('New School');
          });
      });
      it('edits a student', async ()=> {
        const oldStudent = await Student.findById(2);
        return app.put('/api/students/2')
          .send({ firstName: 'Moe', lastName: 'Moeson', gpa: 1 })
          .expect(200)
          .then(res => res.body)
          .then(student => {
            expect(student.id).to.equal(oldStudent.id);
            expect(student.firstName).to.equal('Moe');
          })
          .then( async ()=> {
            const newStudent = await Student.findById(2);
            expect(newStudent.firstName).to.equal('Moe');
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

  describe('mapper and utility functions', ()=> {

    describe('findStudents', ()=> {
      it('finds the students enrolled in a school', ()=> {}); // don't think i actually need this one, students are eagerloaded with school
    });

    describe('findUnenrolledStudents', ()=> {
      it('returns an array of students who do not have a school', ()=> {}); //filter for those without schoolId
    });

    describe('findEnrolledStudents', ()=> {
      it('returns an array of students who have a school', ()=> {}); //filter for those with schoolId
    });

  });


});



//disable save button if forms are empty

//use actual college directory data?

//use unsplash photo API
//or lightweight version: https://source.unsplash.com/random?water

//use faker, chance, or similar api to generate random adjectives that will most likely retrieve relevant photos
//account for edge case in which an adjective search term may return no results

//some ideas for adjectives: color, state or city, 

//create an array of synonyms for 'college', 'school', 'university' etc.

//use random user API for students: https://github.com/RandomAPI/Randomuser.me-Node



//Color University seems like the best option right now

//maybe a newsfeed

//maybe use GUUID for student id's



//TODO: 2018-09-30: add form to edit school in School.js, add link to "add new student" in School.js, which will go to students/create with the schoolId prepopulated.







 //maybe use an undo button as a feature?