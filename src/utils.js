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

export const findSchoolByStudentId = (schools, student)=> {
  console.log('findSchoolByStudentId running...');
  const found = schools.find( school => {
    console.log('examining school...');
    school.students.forEach(_student => {
      console.log('examining student...');
      if (_student.id === student.id) {
        return school;
      }
    })


  })

  console.log('findSchoolByStudentId, found:', found);
  return found;
}