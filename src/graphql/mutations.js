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
export const createSchoolUser = /* GraphQL */ `
  mutation CreateSchoolUser(
    $input: CreateSchoolUserInput!
    $condition: ModelSchoolUserConditionInput
  ) {
    createSchoolUser(input: $input, condition: $condition) {
      id
      first_name
      last_name
      email
      passwrd
      user_type
      createdAt
      updatedAt
    }
  }
`;
export const updateSchoolUser = /* GraphQL */ `
  mutation UpdateSchoolUser(
    $input: UpdateSchoolUserInput!
    $condition: ModelSchoolUserConditionInput
  ) {
    updateSchoolUser(input: $input, condition: $condition) {
      id
      first_name
      last_name
      email
      passwrd
      user_type
      createdAt
      updatedAt
    }
  }
`;
export const deleteSchoolUser = /* GraphQL */ `
  mutation DeleteSchoolUser(
    $input: DeleteSchoolUserInput!
    $condition: ModelSchoolUserConditionInput
  ) {
    deleteSchoolUser(input: $input, condition: $condition) {
      id
      first_name
      last_name
      email
      passwrd
      user_type
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
      head {
        id
        first_name
        last_name
        email
        passwrd
        user_type
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
      head {
        id
        first_name
        last_name
        email
        passwrd
        user_type
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
      head {
        id
        first_name
        last_name
        email
        passwrd
        user_type
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
        head {
          id
          first_name
          last_name
          email
          passwrd
          user_type
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      instructor {
        id
        first_name
        last_name
        email
        passwrd
        user_type
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
        head {
          id
          first_name
          last_name
          email
          passwrd
          user_type
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      instructor {
        id
        first_name
        last_name
        email
        passwrd
        user_type
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
        head {
          id
          first_name
          last_name
          email
          passwrd
          user_type
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      instructor {
        id
        first_name
        last_name
        email
        passwrd
        user_type
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createCourseReport = /* GraphQL */ `
  mutation CreateCourseReport(
    $input: CreateCourseReportInput!
    $condition: ModelCourseReportConditionInput
  ) {
    createCourseReport(input: $input, condition: $condition) {
      id
      student {
        id
        first_name
        last_name
        email
        passwrd
        user_type
        createdAt
        updatedAt
      }
      course_name
      course_section
      instructor {
        id
        first_name
        last_name
        email
        passwrd
        user_type
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
export const updateCourseReport = /* GraphQL */ `
  mutation UpdateCourseReport(
    $input: UpdateCourseReportInput!
    $condition: ModelCourseReportConditionInput
  ) {
    updateCourseReport(input: $input, condition: $condition) {
      id
      student {
        id
        first_name
        last_name
        email
        passwrd
        user_type
        createdAt
        updatedAt
      }
      course_name
      course_section
      instructor {
        id
        first_name
        last_name
        email
        passwrd
        user_type
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
export const deleteCourseReport = /* GraphQL */ `
  mutation DeleteCourseReport(
    $input: DeleteCourseReportInput!
    $condition: ModelCourseReportConditionInput
  ) {
    deleteCourseReport(input: $input, condition: $condition) {
      id
      student {
        id
        first_name
        last_name
        email
        passwrd
        user_type
        createdAt
        updatedAt
      }
      course_name
      course_section
      instructor {
        id
        first_name
        last_name
        email
        passwrd
        user_type
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
export const createEnrollRequest = /* GraphQL */ `
  mutation CreateEnrollRequest(
    $input: CreateEnrollRequestInput!
    $condition: ModelEnrollRequestConditionInput
  ) {
    createEnrollRequest(input: $input, condition: $condition) {
      id
      course {
        id
        section
        name
        credit_hours
        department {
          id
          name
          head {
            id
            first_name
            last_name
            email
            passwrd
            user_type
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        instructor {
          id
          first_name
          last_name
          email
          passwrd
          user_type
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      school_user {
        id
        first_name
        last_name
        email
        passwrd
        user_type
        createdAt
        updatedAt
      }
      is_enrolling
      createdAt
      updatedAt
    }
  }
`;
export const updateEnrollRequest = /* GraphQL */ `
  mutation UpdateEnrollRequest(
    $input: UpdateEnrollRequestInput!
    $condition: ModelEnrollRequestConditionInput
  ) {
    updateEnrollRequest(input: $input, condition: $condition) {
      id
      course {
        id
        section
        name
        credit_hours
        department {
          id
          name
          head {
            id
            first_name
            last_name
            email
            passwrd
            user_type
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        instructor {
          id
          first_name
          last_name
          email
          passwrd
          user_type
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      school_user {
        id
        first_name
        last_name
        email
        passwrd
        user_type
        createdAt
        updatedAt
      }
      is_enrolling
      createdAt
      updatedAt
    }
  }
`;
export const deleteEnrollRequest = /* GraphQL */ `
  mutation DeleteEnrollRequest(
    $input: DeleteEnrollRequestInput!
    $condition: ModelEnrollRequestConditionInput
  ) {
    deleteEnrollRequest(input: $input, condition: $condition) {
      id
      course {
        id
        section
        name
        credit_hours
        department {
          id
          name
          head {
            id
            first_name
            last_name
            email
            passwrd
            user_type
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        instructor {
          id
          first_name
          last_name
          email
          passwrd
          user_type
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      school_user {
        id
        first_name
        last_name
        email
        passwrd
        user_type
        createdAt
        updatedAt
      }
      is_enrolling
      createdAt
      updatedAt
    }
  }
`;
export const createDeleteCourseRequest = /* GraphQL */ `
  mutation CreateDeleteCourseRequest(
    $input: CreateDeleteCourseRequestInput!
    $condition: ModelDeleteCourseRequestConditionInput
  ) {
    createDeleteCourseRequest(input: $input, condition: $condition) {
      id
      course {
        id
        section
        name
        credit_hours
        department {
          id
          name
          head {
            id
            first_name
            last_name
            email
            passwrd
            user_type
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        instructor {
          id
          first_name
          last_name
          email
          passwrd
          user_type
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      head_instructor {
        id
        first_name
        last_name
        email
        passwrd
        user_type
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateDeleteCourseRequest = /* GraphQL */ `
  mutation UpdateDeleteCourseRequest(
    $input: UpdateDeleteCourseRequestInput!
    $condition: ModelDeleteCourseRequestConditionInput
  ) {
    updateDeleteCourseRequest(input: $input, condition: $condition) {
      id
      course {
        id
        section
        name
        credit_hours
        department {
          id
          name
          head {
            id
            first_name
            last_name
            email
            passwrd
            user_type
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        instructor {
          id
          first_name
          last_name
          email
          passwrd
          user_type
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      head_instructor {
        id
        first_name
        last_name
        email
        passwrd
        user_type
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteDeleteCourseRequest = /* GraphQL */ `
  mutation DeleteDeleteCourseRequest(
    $input: DeleteDeleteCourseRequestInput!
    $condition: ModelDeleteCourseRequestConditionInput
  ) {
    deleteDeleteCourseRequest(input: $input, condition: $condition) {
      id
      course {
        id
        section
        name
        credit_hours
        department {
          id
          name
          head {
            id
            first_name
            last_name
            email
            passwrd
            user_type
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        instructor {
          id
          first_name
          last_name
          email
          passwrd
          user_type
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      head_instructor {
        id
        first_name
        last_name
        email
        passwrd
        user_type
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createCreateCourseRequest = /* GraphQL */ `
  mutation CreateCreateCourseRequest(
    $input: CreateCreateCourseRequestInput!
    $condition: ModelCreateCourseRequestConditionInput
  ) {
    createCreateCourseRequest(input: $input, condition: $condition) {
      id
      course_department {
        id
        name
        head {
          id
          first_name
          last_name
          email
          passwrd
          user_type
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      course_section
      head_instructor {
        id
        first_name
        last_name
        email
        passwrd
        user_type
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateCreateCourseRequest = /* GraphQL */ `
  mutation UpdateCreateCourseRequest(
    $input: UpdateCreateCourseRequestInput!
    $condition: ModelCreateCourseRequestConditionInput
  ) {
    updateCreateCourseRequest(input: $input, condition: $condition) {
      id
      course_department {
        id
        name
        head {
          id
          first_name
          last_name
          email
          passwrd
          user_type
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      course_section
      head_instructor {
        id
        first_name
        last_name
        email
        passwrd
        user_type
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteCreateCourseRequest = /* GraphQL */ `
  mutation DeleteCreateCourseRequest(
    $input: DeleteCreateCourseRequestInput!
    $condition: ModelCreateCourseRequestConditionInput
  ) {
    deleteCreateCourseRequest(input: $input, condition: $condition) {
      id
      course_department {
        id
        name
        head {
          id
          first_name
          last_name
          email
          passwrd
          user_type
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      course_section
      head_instructor {
        id
        first_name
        last_name
        email
        passwrd
        user_type
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
