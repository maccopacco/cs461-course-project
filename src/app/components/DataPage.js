import React, {Component} from "react";
import MaterialTable from "material-table";
import {ActionIcon} from "./ActionIcon";
import {displayError, popupHelper, userType} from "../Utilities";
import {InstructorOptions, RegistrarOptions, StudentOptions} from "../Options"
import {createNewPassword, createUserPopup, deleteUser, registrarShowUsers} from "../RegistrarUsers";
import {
    assignDepartmentHead,
    createDepartmentPopup,
    deleteDepartment,
    registrarAssignDepartmentHead,
    registrarShowDepartments
} from "../RegistrarDepartments";
import {createCoursePopup, instructorCreateCourseRequest} from "../InstructorCreateCourseRequest";
import {
    registrarApproveCreateCourseRequest,
    registrarDeleteCreateCourseRequest,
    registrarShowCreateCourseRequests
} from "../RegistrarCreateCourse";
import {instructorViewCreateCourseRequest} from "../InstructorViewCreateCourseRequest";
import {loadCourses} from "../Course";
import {
    instructorAttemptDeleteCourse,
    registarShowDeleteCourseRequests, registrarApproveDeleteCourseRequest,
    registrarDeleteDeleteCourseRequest
} from "../DeleteCourse";


export default class DataPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            studentOption: StudentOptions.SHOW_COURSES,
            instructorOptions: InstructorOptions.SHOW_COURSES,
            registrarOptions: RegistrarOptions.EDIT_USERS,
            department_to_head: null,
            department_to_create_course_in: null,
            my_departments: null,
        }
    }

    /**
     * Coverts usertype and current option to list of column values
     * @returns {{field: string, title: string}[]|*[]}
     */
    getColumnsForType(userType = this.userType(),
                      studentOption = this.state.studentOption,
                      registrarOption = this.state.registrarOptions,
                      instructorOption = this.state.instructorOptions) {
        let opt
        switch (userType) {
            case "Student":
                opt = studentOption
                break;
            case "Registrar":
                opt = registrarOption
                break;
            case "Instructor":
                opt = instructorOption
                break;
        }

        if (opt === 0) {
            return [{title: 'Course', field: 'combined_name'},
                {title: 'Section', field: 'section'},
                {title: 'Credit hours', field: 'credit_hours'},
                {title: 'Instructor', field: 'instructor_name'}]
        }

        switch (userType) {
            case "Student": {
                switch (studentOption) {
                }
                break;
            }
            case "Registrar": {
                switch (registrarOption) {
                    case RegistrarOptions.ASSIGN_HEAD_STEP_2:
                    case RegistrarOptions.EDIT_USERS: {
                        return [{title: 'User Type', field: 'user_type'},
                            {title: 'ID', field: 'id'},
                            {title: 'Email', field: 'email'},
                            {title: 'First Name', field: 'first_name'},
                            {title: 'Last Name', field: 'last_name'},
                            // {title: 'Password', field: 'passwrd'}
                        ]
                    }
                    case RegistrarOptions.ASSIGN_HEAD_STEP_1: //intended fall through
                    case RegistrarOptions.VIEW_DEPARTMENTS: {
                        return [{title: 'Department name', field: 'name'},
                            {title: "Head instructor", field: 'head_name'}]
                    }
                    case RegistrarOptions.VIEW_DELETE_COURSE_REQUESTS:
                    case RegistrarOptions.VIEW_CREATE_COURSE_REQUESTS: {
                        return [{title: 'Department', field: 'department'},
                            {title: 'Name', field: 'course_name'},
                            {title: 'Section', field: 'course_section'},
                            {title: 'Requestee', field: 'instructor_name'},
                            {title: 'CH', field: 'credit_hours'}]
                    }
                }
                break;
            }
            case "Instructor": {
                switch (instructorOption) {
                    case InstructorOptions.CREATE_COURSE_STEP_1: {
                        return this.getColumnsForType("Registrar", null, RegistrarOptions.VIEW_DEPARTMENTS)
                    }
                    case InstructorOptions.VIEW_CREATE_COURSE_REQUESTS: {
                        return this.getColumnsForType("Registrar", null, RegistrarOptions.VIEW_CREATE_COURSE_REQUESTS)
                    }
                }
            }
        }
        return []
    }

    /**
     * Converts usertype and current option to list of actions that can be clicked for each row
     * @returns {{onClick: (function(*, *): void), icon: (function()), tooltip: string}[]|*[]}
     */
    getActionsForType() {
        const here = this
        switch (this.userType()) {
            case "Student": {
                switch (this.state.studentOption) {
                    case StudentOptions.SHOW_COURSES:
                        return []
                }
                break;
            }
            case "Registrar": {
                switch (this.state.registrarOptions) {
                    case RegistrarOptions.EDIT_USERS:
                        return [{
                            icon: () => <ActionIcon text="Rst Pswd"/>,
                            tooltip: "Reset password",
                            onClick: (event, rowData) => createNewPassword(rowData, this)
                        }, {
                            icon: () => <ActionIcon text="Del"/>,
                            tooltip: "Delete user",
                            onClick: (event, rowData) => deleteUser(rowData, this)
                        }]
                    case RegistrarOptions.VIEW_DEPARTMENTS: {
                        return [{
                            icon: () => <ActionIcon text="Del"/>,
                            tooltip: "Delete department",
                            onClick: (event, rowData) => deleteDepartment(rowData, this)
                        }]
                    }
                    case RegistrarOptions.ASSIGN_HEAD_STEP_1: {
                        return [{
                            icon: () => <ActionIcon text="Select"/>,
                            tooltip: "Select department",
                            onClick: function (e, row) {
                                registrarShowUsers(here, false)
                                here.setState({
                                    registrarOptions: RegistrarOptions.ASSIGN_HEAD_STEP_2,
                                    department_to_head: row
                                })
                            }
                        }]
                    }
                    case RegistrarOptions.ASSIGN_HEAD_STEP_2: {
                        return [{
                            icon: () => <ActionIcon text="Select"/>,
                            tooltip: "Select instructor",
                            onClick: (e, row) => assignDepartmentHead(here, here.state.department_to_head, row)
                        }]
                    }
                    case RegistrarOptions.VIEW_CREATE_COURSE_REQUESTS: {
                        return [{
                            icon: () => <ActionIcon text="Delete"/>,
                            tooltip: "Delete request",
                            onClick: (e, row) => registrarDeleteCreateCourseRequest(here, row)
                        }, {
                            icon: () => <ActionIcon text="Approve"/>,
                            tooltip: "Approve request",
                            onClick: (e, row) => registrarApproveCreateCourseRequest(here, row)
                        }]
                    }
                    case RegistrarOptions.VIEW_DELETE_COURSE_REQUESTS: {
                        return [{
                            icon: () => <ActionIcon text="Delete"/>,
                            tooltip: "Delete request",
                            onClick: (e, row) => registrarDeleteDeleteCourseRequest(here, row)
                        }, {
                            icon: () => <ActionIcon text="Approve"/>,
                            tooltip: "Approve request",
                            onClick: (e, row) => registrarApproveDeleteCourseRequest(here, row)
                        }]
                    }

                }
                break;
            }
            case "Instructor": {
                switch (this.state.instructorOptions) {
                    case InstructorOptions.SHOW_COURSES: {
                        return [{
                            icon: () => <ActionIcon text='Rq Del'/>,
                            tooltip: "Delete course",
                            onClick: (e, row) => instructorAttemptDeleteCourse(here, row)
                        }]
                    }
                    case InstructorOptions.CREATE_COURSE_STEP_1:
                        return [{
                            icon: () => <ActionIcon text='Select'/>,
                            tooltip: "Select department to create course in",
                            onClick: function (e, row) {
                                const myDepartments = here.state.my_departments.map((v) => v.id)
                                const thisDepartment = row.id
                                if (myDepartments.includes(thisDepartment)) {
                                    here.setState({
                                        department_to_create_course_in: row,
                                        instructorOptions: InstructorOptions.CREATE_COURSE_STEP_2
                                    })
                                } else {
                                    displayError("You can't create a class in a department you're not a head of")
                                    here.setState({instructorOptions: null})
                                }
                            }
                        }]
                }
            }

        }
        return []
    }

    /**
     * Gets buttons that are shown for each user type
     */
    buttonsForType() {
        const here = this
        let buttons = []
        if (this.userType() != null) {
            buttons.push({title: "Show classes", onClick: () => loadCourses(here)})
        }
        switch (this.userType()) {
            case "Student": {
                buttons.push({
                    title: "Show course reports", onClick: () => this.studentShowCourseReports(here)
                })
                break;
            }
            case "Registrar": {
                buttons.push(
                    {title: "Show users", onClick: () => registrarShowUsers(here)},
                    {
                        popup: popupHelper('createUserPopup',
                            'Create user',
                            (ref) => createUserPopup(here, ref))
                    },
                    {
                        popup: popupHelper('createDepartmentPopup',
                            'Create department',
                            (ref) => createDepartmentPopup(here, ref))
                    },
                    {title: "Show departments", onClick: () => registrarShowDepartments(here)},
                    {title: "Assign department head", onClick: () => registrarAssignDepartmentHead(here)},
                    {title: "View create course requests", onClick: () => registrarShowCreateCourseRequests(here)},
                    {title: "View delete course requests", onClick: () => registarShowDeleteCourseRequests(here)}
                )
                if (this.state.registrarOptions === RegistrarOptions.ASSIGN_HEAD_STEP_2) {
                    buttons.push({
                        title: 'Clear head professor',
                        onClick: () => this.assignDepartmentHead(here, this.state.department_to_head, null)
                    })
                }
                break;
            }
            case "Instructor" : {
                buttons.push(
                    {title: 'Create course', onClick: () => instructorCreateCourseRequest(here)},
                    {title: 'View create course requests', onClick: () => instructorViewCreateCourseRequest(here)})
                if (this.state.instructorOptions === InstructorOptions.CREATE_COURSE_STEP_2) {
                    buttons.push({
                        popup: popupHelper(
                            'createCoursePopup', 'Define section',
                            (ref) => createCoursePopup(ref, here)
                        )
                    })
                }
                break;
            }
        }
        return buttons.map(function (item, index) {
            if ('popup' in item) {
                return item.popup
            }
            return <button key={index} onClick={() => item.onClick()}>{item.title}</button>
        })
    }

    /**
     * Get user_type from user property as string
     * @returns {string|null}
     */
    userType() {
        const u = this.props.user
        return userType(u)
    }

    studentShowCourseReports(context) {
        context.setState({studentOption: StudentOptions.SHOW_COURSE_REPORTS})
    }

    studentShowClasses(context) {
        context.setState({studentOption: StudentOptions.SHOW_COURSES})
    }


    render() {
        return <>
            <div className='sideBySide'>
                <div className='verticalGroup'>
                    <p>Options {this.userType() != null ? ("for " + this.userType()) : ""}</p>
                    {this.buttonsForType()}
                </div>
                <div className='datapage'>
                    <MaterialTable
                        columns={this.getColumnsForType()}
                        data={this.state.data}
                        actions={this.getActionsForType()}
                        title="Results"
                    />
                </div>
            </div>
        </>
    }
}