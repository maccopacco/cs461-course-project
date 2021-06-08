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
export const getSchoolUser = /* GraphQL */ `
  query GetSchoolUser($id: ID!) {
    getSchoolUser(id: $id) {
      id
      first_name
      last_name
      email
      passwrd
      createdAt
      updatedAt
    }
  }
`;
export const listSchoolUsers = /* GraphQL */ `
  query ListSchoolUsers(
    $filter: ModelSchoolUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSchoolUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        first_name
        last_name
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
        last_name
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
        last_name
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
        last_name
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
export const getCourseReport = /* GraphQL */ `
  query GetCourseReport($id: ID!) {
    getCourseReport(id: $id) {
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
export const listCourseReports = /* GraphQL */ `
  query ListCourseReports(
    $filter: ModelCourseReportFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCourseReports(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
export const getEnrollRequest = /* GraphQL */ `
  query GetEnrollRequest($id: ID!) {
    getEnrollRequest(id: $id) {
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
        last_name
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
export const listEnrollRequests = /* GraphQL */ `
  query ListEnrollRequests(
    $filter: ModelEnrollRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEnrollRequests(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
export const getDeleteCourseRequest = /* GraphQL */ `
  query GetDeleteCourseRequest($id: ID!) {
    getDeleteCourseRequest(id: $id) {
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
export const listDeleteCourseRequests = /* GraphQL */ `
  query ListDeleteCourseRequests(
    $filter: ModelDeleteCourseRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDeleteCourseRequests(
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
export const getCreateCourseRequest = /* GraphQL */ `
  query GetCreateCourseRequest($id: ID!) {
    getCreateCourseRequest(id: $id) {
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
export const listCreateCourseRequests = /* GraphQL */ `
  query ListCreateCourseRequests(
    $filter: ModelCreateCourseRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCreateCourseRequests(
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
