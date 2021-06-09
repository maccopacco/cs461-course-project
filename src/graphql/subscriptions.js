/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateItem = /* GraphQL */ `
  subscription OnCreateItem {
    onCreateItem {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateItem = /* GraphQL */ `
  subscription OnUpdateItem {
    onUpdateItem {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteItem = /* GraphQL */ `
  subscription OnDeleteItem {
    onDeleteItem {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onCreateSchoolUser = /* GraphQL */ `
  subscription OnCreateSchoolUser {
    onCreateSchoolUser {
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
export const onUpdateSchoolUser = /* GraphQL */ `
  subscription OnUpdateSchoolUser {
    onUpdateSchoolUser {
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
export const onDeleteSchoolUser = /* GraphQL */ `
  subscription OnDeleteSchoolUser {
    onDeleteSchoolUser {
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
export const onCreateDepartment = /* GraphQL */ `
  subscription OnCreateDepartment {
    onCreateDepartment {
      id
      name
      department_head {
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
export const onUpdateDepartment = /* GraphQL */ `
  subscription OnUpdateDepartment {
    onUpdateDepartment {
      id
      name
      department_head {
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
export const onDeleteDepartment = /* GraphQL */ `
  subscription OnDeleteDepartment {
    onDeleteDepartment {
      id
      name
      department_head {
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
export const onCreateCourse = /* GraphQL */ `
  subscription OnCreateCourse {
    onCreateCourse {
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
export const onUpdateCourse = /* GraphQL */ `
  subscription OnUpdateCourse {
    onUpdateCourse {
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
export const onDeleteCourse = /* GraphQL */ `
  subscription OnDeleteCourse {
    onDeleteCourse {
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
export const onCreateCourseReport = /* GraphQL */ `
  subscription OnCreateCourseReport {
    onCreateCourseReport {
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
export const onUpdateCourseReport = /* GraphQL */ `
  subscription OnUpdateCourseReport {
    onUpdateCourseReport {
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
export const onDeleteCourseReport = /* GraphQL */ `
  subscription OnDeleteCourseReport {
    onDeleteCourseReport {
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
export const onCreateEnrollRequest = /* GraphQL */ `
  subscription OnCreateEnrollRequest {
    onCreateEnrollRequest {
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
export const onUpdateEnrollRequest = /* GraphQL */ `
  subscription OnUpdateEnrollRequest {
    onUpdateEnrollRequest {
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
export const onDeleteEnrollRequest = /* GraphQL */ `
  subscription OnDeleteEnrollRequest {
    onDeleteEnrollRequest {
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
export const onCreateDeleteCourseRequest = /* GraphQL */ `
  subscription OnCreateDeleteCourseRequest {
    onCreateDeleteCourseRequest {
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
export const onUpdateDeleteCourseRequest = /* GraphQL */ `
  subscription OnUpdateDeleteCourseRequest {
    onUpdateDeleteCourseRequest {
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
export const onDeleteDeleteCourseRequest = /* GraphQL */ `
  subscription OnDeleteDeleteCourseRequest {
    onDeleteDeleteCourseRequest {
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
export const onCreateCreateCourseRequest = /* GraphQL */ `
  subscription OnCreateCreateCourseRequest {
    onCreateCreateCourseRequest {
      id
      course_name
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
export const onUpdateCreateCourseRequest = /* GraphQL */ `
  subscription OnUpdateCreateCourseRequest {
    onUpdateCreateCourseRequest {
      id
      course_name
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
export const onDeleteCreateCourseRequest = /* GraphQL */ `
  subscription OnDeleteCreateCourseRequest {
    onDeleteCreateCourseRequest {
      id
      course_name
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
