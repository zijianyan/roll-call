export const getSchool = (schools, id)=> schools.find(school => school.id === id);

export const getStudent = (students, id)=> students.find(student => student.id === id);

export const findEnrolled = (students, id)=> students.filter(student => student.schoolId === id);

export const findOtherStudents = (students, id)=> students.filter(student => student.schoolId !== id);

export const gpaPercentage = gpa => (gpa/4).toFixed(2);