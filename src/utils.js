export const getSchool = (schools, id)=> {
  return schools.find(school => {
    if (school.id) {
      return school.id === id;
    }
  })
}

export const getStudent = (students, id)=> {
  return students.find(student => student.id === id)
}

export const findSchoolByStudentSchoolId = (schools, student)=> {
  return schools.find( school => school.id === student.schoolId )
}

export const findSchoolByStudent = (schools, student)=> {

  const result = schools.find( school => {
    let found = false;
    school.students.forEach(_student => {
      if (_student.id === student.id) {
        found = true;
      }
    })

    if (found) {
      return school;
    }


  })

  console.log('findSchoolByStudentId, result:', result);
  return result;
}