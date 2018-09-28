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