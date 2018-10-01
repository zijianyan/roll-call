
export const getSchool = (schools, id)=> schools.find(school => school.id === id);
  
  // {
  //   // return school.id ? school.id === id : false;
  //   // if (school.id) {
  //   //   return school.id === id;
  //   // }
  // });



// export const getSchool = (schools, id)=> {
//   return schools.find(school => school.id && school.id === id);
  
//   // {
//   //   // return school.id ? school.id === id : false;
//   //   // if (school.id) {
//   //   //   return school.id === id;
//   //   // }
//   // });
// };

export const getStudent = (students, id)=> students.find(student => student.id === id);

export const findEnrolled = (students, id)=> students.filter(student => student.schoolId === id);

export const findOtherStudents = (students, id)=> students.filter(student => student.schoolId !== id);

// export const stateAbbreviations = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];