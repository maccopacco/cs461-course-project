/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getItem = /* GraphQL */ `
  query GetItem($id: ID!) {
    getItem(id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const listItems = /* GraphQL */ `
  query ListItems(
    $filter: ModelItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSchool_User = /* GraphQL */ `
  query GetSchool_User($id: ID!) {
    getSchool_User(id: $id) {
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
export const listSchool_Users = /* GraphQL */ `
  query ListSchool_Users(
    $filter: ModelSchool_UserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSchool_Users(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        first_name
        last_anme
        email
        passwrd
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getStudent = /* GraphQL */ `
  query GetStudent($id: ID!) {
    getStudent(id: $id) {
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
export const listStudents = /* GraphQL */ `
  query ListStudents(
    $filter: ModelStudentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStudents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getInstructor = /* GraphQL */ `
  query GetInstructor($id: ID!) {
    getInstructor(id: $id) {
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
export const listInstructors = /* GraphQL */ `
  query ListInstructors(
    $filter: ModelInstructorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInstructors(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getRegistrar = /* GraphQL */ `
  query GetRegistrar($id: ID!) {
    getRegistrar(id: $id) {
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
export const listRegistrars = /* GraphQL */ `
  query ListRegistrars(
    $filter: ModelRegistrarFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRegistrars(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getDepartment = /* GraphQL */ `
  query GetDepartment($id: ID!) {
    getDepartment(id: $id) {
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
export const listDepartments = /* GraphQL */ `
  query ListDepartments(
    $filter: ModelDepartmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDepartments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCourse = /* GraphQL */ `
  query GetCourse($id: ID!) {
    getCourse(id: $id) {
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
export const listCourses = /* GraphQL */ `
  query ListCourses(
    $filter: ModelCourseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCourses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        section
        name
        credit_hours
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCourse_Report = /* GraphQL */ `
  query GetCourse_Report($id: ID!) {
    getCourse_Report(id: $id) {
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
export const listCourse_Reports = /* GraphQL */ `
  query ListCourse_Reports(
    $filter: ModelCourse_ReportFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCourse_Reports(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        course_name
        course_section
        year
        attempts
        final_grade
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getEnroll_Request = /* GraphQL */ `
  query GetEnroll_Request($id: ID!) {
    getEnroll_Request(id: $id) {
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
export const listEnroll_Requests = /* GraphQL */ `
  query ListEnroll_Requests(
    $filter: ModelEnroll_RequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEnroll_Requests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        is_enrolling
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getDelete_Course_Request = /* GraphQL */ `
  query GetDelete_Course_Request($id: ID!) {
    getDelete_Course_Request(id: $id) {
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
export const listDelete_Course_Requests = /* GraphQL */ `
  query ListDelete_Course_Requests(
    $filter: ModelDelete_Course_RequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDelete_Course_Requests(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCreate_Course_Request = /* GraphQL */ `
  query GetCreate_Course_Request($id: ID!) {
    getCreate_Course_Request(id: $id) {
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
export const listCreate_Course_Requests = /* GraphQL */ `
  query ListCreate_Course_Requests(
    $filter: ModelCreate_Course_RequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCreate_Course_Requests(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        course_name
        course_section
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
