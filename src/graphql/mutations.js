/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createItem = /* GraphQL */ `
  mutation CreateItem(
    $input: CreateItemInput!
    $condition: ModelItemConditionInput
  ) {
    createItem(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const updateItem = /* GraphQL */ `
  mutation UpdateItem(
    $input: UpdateItemInput!
    $condition: ModelItemConditionInput
  ) {
    updateItem(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const deleteItem = /* GraphQL */ `
  mutation DeleteItem(
    $input: DeleteItemInput!
    $condition: ModelItemConditionInput
  ) {
    deleteItem(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const createSchool_User = /* GraphQL */ `
  mutation CreateSchool_User(
    $input: CreateSchool_UserInput!
    $condition: ModelSchool_UserConditionInput
  ) {
    createSchool_User(input: $input, condition: $condition) {
      id
      first_name
      last_anme
      email
      passwrd
      createdAt
      updatedAt
    }
  }
`;
export const updateSchool_User = /* GraphQL */ `
  mutation UpdateSchool_User(
    $input: UpdateSchool_UserInput!
    $condition: ModelSchool_UserConditionInput
  ) {
    updateSchool_User(input: $input, condition: $condition) {
      id
      first_name
      last_anme
      email
      passwrd
      createdAt
      updatedAt
    }
  }
`;
export const deleteSchool_User = /* GraphQL */ `
  mutation DeleteSchool_User(
    $input: DeleteSchool_UserInput!
    $condition: ModelSchool_UserConditionInput
  ) {
    deleteSchool_User(input: $input, condition: $condition) {
      id
      first_name
      last_anme
      email
      passwrd
      createdAt
      updatedAt
    }
  }
`;
export const createStudent = /* GraphQL */ `
  mutation CreateStudent(
    $input: CreateStudentInput!
    $condition: ModelStudentConditionInput
  ) {
    createStudent(input: $input, condition: $condition) {
      school_user {
        id
        first_name
        last_anme
        email
        passwrd
        createdAt
        updatedAt
      }
      id
      createdAt
      updatedAt
    }
  }
`;
export const updateStudent = /* GraphQL */ `
  mutation UpdateStudent(
    $input: UpdateStudentInput!
    $condition: ModelStudentConditionInput
  ) {
    updateStudent(input: $input, condition: $condition) {
      school_user {
        id
        first_name
        last_anme
        email
        passwrd
        createdAt
        updatedAt
      }
      id
      createdAt
      updatedAt
    }
  }
`;
export const deleteStudent = /* GraphQL */ `
  mutation DeleteStudent(
    $input: DeleteStudentInput!
    $condition: ModelStudentConditionInput
  ) {
    deleteStudent(input: $input, condition: $condition) {
      school_user {
        id
        first_name
        last_anme
        email
        passwrd
        createdAt
        updatedAt
      }
      id
      createdAt
      updatedAt
    }
  }
`;
export const createInstructor = /* GraphQL */ `
  mutation CreateInstructor(
    $input: CreateInstructorInput!
    $condition: ModelInstructorConditionInput
  ) {
    createInstructor(input: $input, condition: $condition) {
      school_user {
        id
        first_name
        last_anme
        email
        passwrd
        createdAt
        updatedAt
      }
      id
      createdAt
      updatedAt
    }
  }
`;
export const updateInstructor = /* GraphQL */ `
  mutation UpdateInstructor(
    $input: UpdateInstructorInput!
    $condition: ModelInstructorConditionInput
  ) {
    updateInstructor(input: $input, condition: $condition) {
      school_user {
        id
        first_name
        last_anme
        email
        passwrd
        createdAt
        updatedAt
      }
      id
      createdAt
      updatedAt
    }
  }
`;
export const deleteInstructor = /* GraphQL */ `
  mutation DeleteInstructor(
    $input: DeleteInstructorInput!
    $condition: ModelInstructorConditionInput
  ) {
    deleteInstructor(input: $input, condition: $condition) {
      school_user {
        id
        first_name
        last_anme
        email
        passwrd
        createdAt
        updatedAt
      }
      id
      createdAt
      updatedAt
    }
  }
`;
export const createRegistrar = /* GraphQL */ `
  mutation CreateRegistrar(
    $input: CreateRegistrarInput!
    $condition: ModelRegistrarConditionInput
  ) {
    createRegistrar(input: $input, condition: $condition) {
      school_user {
        id
        first_name
        last_anme
        email
        passwrd
        createdAt
        updatedAt
      }
      id
      createdAt
      updatedAt
    }
  }
`;
export const updateRegistrar = /* GraphQL */ `
  mutation UpdateRegistrar(
    $input: UpdateRegistrarInput!
    $condition: ModelRegistrarConditionInput
  ) {
    updateRegistrar(input: $input, condition: $condition) {
      school_user {
        id
        first_name
        last_anme
        email
        passwrd
        createdAt
        updatedAt
      }
      id
      createdAt
      updatedAt
    }
  }
`;
export const deleteRegistrar = /* GraphQL */ `
  mutation DeleteRegistrar(
    $input: DeleteRegistrarInput!
    $condition: ModelRegistrarConditionInput
  ) {
    deleteRegistrar(input: $input, condition: $condition) {
      school_user {
        id
        first_name
        last_anme
        email
        passwrd
        createdAt
        updatedAt
      }
      id
      createdAt
      updatedAt
    }
  }
`;
export const createDepartment = /* GraphQL */ `
  mutation CreateDepartment(
    $input: CreateDepartmentInput!
    $condition: ModelDepartmentConditionInput
  ) {
    createDepartment(input: $input, condition: $condition) {
      id
      name
      department_head {
        id
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateDepartment = /* GraphQL */ `
  mutation UpdateDepartment(
    $input: UpdateDepartmentInput!
    $condition: ModelDepartmentConditionInput
  ) {
    updateDepartment(input: $input, condition: $condition) {
      id
      name
      department_head {
        id
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteDepartment = /* GraphQL */ `
  mutation DeleteDepartment(
    $input: DeleteDepartmentInput!
    $condition: ModelDepartmentConditionInput
  ) {
    deleteDepartment(input: $input, condition: $condition) {
      id
      name
      department_head {
        id
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createCourse = /* GraphQL */ `
  mutation CreateCourse(
    $input: CreateCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    createCourse(input: $input, condition: $condition) {
      id
      section
      name
      credit_hours
      department {
        id
        name
        createdAt
        updatedAt
      }
      instructor {
        id
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateCourse = /* GraphQL */ `
  mutation UpdateCourse(
    $input: UpdateCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    updateCourse(input: $input, condition: $condition) {
      id
      section
      name
      credit_hours
      department {
        id
        name
        createdAt
        updatedAt
      }
      instructor {
        id
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteCourse = /* GraphQL */ `
  mutation DeleteCourse(
    $input: DeleteCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    deleteCourse(input: $input, condition: $condition) {
      id
      section
      name
      credit_hours
      department {
        id
        name
        createdAt
        updatedAt
      }
      instructor {
        id
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createCourse_Report = /* GraphQL */ `
  mutation CreateCourse_Report(
    $input: CreateCourse_ReportInput!
    $condition: ModelCourse_ReportConditionInput
  ) {
    createCourse_Report(input: $input, condition: $condition) {
      id
      student {
        id
        createdAt
        updatedAt
      }
      course_name
      course_section
      instructor {
        id
        createdAt
        updatedAt
      }
      year
      attempts
      final_grade
      createdAt
      updatedAt
    }
  }
`;
export const updateCourse_Report = /* GraphQL */ `
  mutation UpdateCourse_Report(
    $input: UpdateCourse_ReportInput!
    $condition: ModelCourse_ReportConditionInput
  ) {
    updateCourse_Report(input: $input, condition: $condition) {
      id
      student {
        id
        createdAt
        updatedAt
      }
      course_name
      course_section
      instructor {
        id
        createdAt
        updatedAt
      }
      year
      attempts
      final_grade
      createdAt
      updatedAt
    }
  }
`;
export const deleteCourse_Report = /* GraphQL */ `
  mutation DeleteCourse_Report(
    $input: DeleteCourse_ReportInput!
    $condition: ModelCourse_ReportConditionInput
  ) {
    deleteCourse_Report(input: $input, condition: $condition) {
      id
      student {
        id
        createdAt
        updatedAt
      }
      course_name
      course_section
      instructor {
        id
        createdAt
        updatedAt
      }
      year
      attempts
      final_grade
      createdAt
      updatedAt
    }
  }
`;
export const createEnroll_Request = /* GraphQL */ `
  mutation CreateEnroll_Request(
    $input: CreateEnroll_RequestInput!
    $condition: ModelEnroll_RequestConditionInput
  ) {
    createEnroll_Request(input: $input, condition: $condition) {
      id
      course {
        id
        section
        name
        credit_hours
        createdAt
        updatedAt
      }
      school_user {
        id
        first_name
        last_anme
        email
        passwrd
        createdAt
        updatedAt
      }
      is_enrolling
      createdAt
      updatedAt
    }
  }
`;
export const updateEnroll_Request = /* GraphQL */ `
  mutation UpdateEnroll_Request(
    $input: UpdateEnroll_RequestInput!
    $condition: ModelEnroll_RequestConditionInput
  ) {
    updateEnroll_Request(input: $input, condition: $condition) {
      id
      course {
        id
        section
        name
        credit_hours
        createdAt
        updatedAt
      }
      school_user {
        id
        first_name
        last_anme
        email
        passwrd
        createdAt
        updatedAt
      }
      is_enrolling
      createdAt
      updatedAt
    }
  }
`;
export const deleteEnroll_Request = /* GraphQL */ `
  mutation DeleteEnroll_Request(
    $input: DeleteEnroll_RequestInput!
    $condition: ModelEnroll_RequestConditionInput
  ) {
    deleteEnroll_Request(input: $input, condition: $condition) {
      id
      course {
        id
        section
        name
        credit_hours
        createdAt
        updatedAt
      }
      school_user {
        id
        first_name
        last_anme
        email
        passwrd
        createdAt
        updatedAt
      }
      is_enrolling
      createdAt
      updatedAt
    }
  }
`;
export const createDelete_Course_Request = /* GraphQL */ `
  mutation CreateDelete_Course_Request(
    $input: CreateDelete_Course_RequestInput!
    $condition: ModelDelete_Course_RequestConditionInput
  ) {
    createDelete_Course_Request(input: $input, condition: $condition) {
      id
      course {
        id
        section
        name
        credit_hours
        createdAt
        updatedAt
      }
      head_instructor {
        id
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateDelete_Course_Request = /* GraphQL */ `
  mutation UpdateDelete_Course_Request(
    $input: UpdateDelete_Course_RequestInput!
    $condition: ModelDelete_Course_RequestConditionInput
  ) {
    updateDelete_Course_Request(input: $input, condition: $condition) {
      id
      course {
        id
        section
        name
        credit_hours
        createdAt
        updatedAt
      }
      head_instructor {
        id
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteDelete_Course_Request = /* GraphQL */ `
  mutation DeleteDelete_Course_Request(
    $input: DeleteDelete_Course_RequestInput!
    $condition: ModelDelete_Course_RequestConditionInput
  ) {
    deleteDelete_Course_Request(input: $input, condition: $condition) {
      id
      course {
        id
        section
        name
        credit_hours
        createdAt
        updatedAt
      }
      head_instructor {
        id
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createCreate_Course_Request = /* GraphQL */ `
  mutation CreateCreate_Course_Request(
    $input: CreateCreate_Course_RequestInput!
    $condition: ModelCreate_Course_RequestConditionInput
  ) {
    createCreate_Course_Request(input: $input, condition: $condition) {
      id
      course_name
      course_section
      head_instructor {
        id
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateCreate_Course_Request = /* GraphQL */ `
  mutation UpdateCreate_Course_Request(
    $input: UpdateCreate_Course_RequestInput!
    $condition: ModelCreate_Course_RequestConditionInput
  ) {
    updateCreate_Course_Request(input: $input, condition: $condition) {
      id
      course_name
      course_section
      head_instructor {
        id
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteCreate_Course_Request = /* GraphQL */ `
  mutation DeleteCreate_Course_Request(
    $input: DeleteCreate_Course_RequestInput!
    $condition: ModelCreate_Course_RequestConditionInput
  ) {
    deleteCreate_Course_Request(input: $input, condition: $condition) {
      id
      course_name
      course_section
      head_instructor {
        id
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
