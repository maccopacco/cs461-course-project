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
export const onCreateSchool_User = /* GraphQL */ `
  subscription OnCreateSchool_User {
    onCreateSchool_User {
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
export const onUpdateSchool_User = /* GraphQL */ `
  subscription OnUpdateSchool_User {
    onUpdateSchool_User {
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
export const onDeleteSchool_User = /* GraphQL */ `
  subscription OnDeleteSchool_User {
    onDeleteSchool_User {
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
export const onCreateStudent = /* GraphQL */ `
  subscription OnCreateStudent {
    onCreateStudent {
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
export const onUpdateStudent = /* GraphQL */ `
  subscription OnUpdateStudent {
    onUpdateStudent {
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
export const onDeleteStudent = /* GraphQL */ `
  subscription OnDeleteStudent {
    onDeleteStudent {
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
export const onCreateInstructor = /* GraphQL */ `
  subscription OnCreateInstructor {
    onCreateInstructor {
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
export const onUpdateInstructor = /* GraphQL */ `
  subscription OnUpdateInstructor {
    onUpdateInstructor {
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
export const onDeleteInstructor = /* GraphQL */ `
  subscription OnDeleteInstructor {
    onDeleteInstructor {
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
export const onCreateRegistrar = /* GraphQL */ `
  subscription OnCreateRegistrar {
    onCreateRegistrar {
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
export const onUpdateRegistrar = /* GraphQL */ `
  subscription OnUpdateRegistrar {
    onUpdateRegistrar {
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
export const onDeleteRegistrar = /* GraphQL */ `
  subscription OnDeleteRegistrar {
    onDeleteRegistrar {
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
export const onCreateDepartment = /* GraphQL */ `
  subscription OnCreateDepartment {
    onCreateDepartment {
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
export const onUpdateDepartment = /* GraphQL */ `
  subscription OnUpdateDepartment {
    onUpdateDepartment {
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
export const onDeleteDepartment = /* GraphQL */ `
  subscription OnDeleteDepartment {
    onDeleteDepartment {
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
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCourse_Report = /* GraphQL */ `
  subscription OnCreateCourse_Report {
    onCreateCourse_Report {
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
export const onUpdateCourse_Report = /* GraphQL */ `
  subscription OnUpdateCourse_Report {
    onUpdateCourse_Report {
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
export const onDeleteCourse_Report = /* GraphQL */ `
  subscription OnDeleteCourse_Report {
    onDeleteCourse_Report {
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
export const onCreateEnroll_Request = /* GraphQL */ `
  subscription OnCreateEnroll_Request {
    onCreateEnroll_Request {
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
export const onUpdateEnroll_Request = /* GraphQL */ `
  subscription OnUpdateEnroll_Request {
    onUpdateEnroll_Request {
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
export const onDeleteEnroll_Request = /* GraphQL */ `
  subscription OnDeleteEnroll_Request {
    onDeleteEnroll_Request {
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
export const onCreateDelete_Course_Request = /* GraphQL */ `
  subscription OnCreateDelete_Course_Request {
    onCreateDelete_Course_Request {
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
export const onUpdateDelete_Course_Request = /* GraphQL */ `
  subscription OnUpdateDelete_Course_Request {
    onUpdateDelete_Course_Request {
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
export const onDeleteDelete_Course_Request = /* GraphQL */ `
  subscription OnDeleteDelete_Course_Request {
    onDeleteDelete_Course_Request {
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
export const onCreateCreate_Course_Request = /* GraphQL */ `
  subscription OnCreateCreate_Course_Request {
    onCreateCreate_Course_Request {
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
export const onUpdateCreate_Course_Request = /* GraphQL */ `
  subscription OnUpdateCreate_Course_Request {
    onUpdateCreate_Course_Request {
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
export const onDeleteCreate_Course_Request = /* GraphQL */ `
  subscription OnDeleteCreate_Course_Request {
    onDeleteCreate_Course_Request {
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
