import React, {Component} from "react";
import MaterialTable from "material-table";
import {listCreateCourseRequests, listDepartments, listSchoolUsers} from "../../graphql/queries";
import {graphqlOperation} from "@aws-amplify/api-graphql";
import {API} from "@aws-amplify/api";
import {toast} from "react-toastify";
import {ActionIcon} from "./ActionIcon";
import {
    createCreateCourseRequest,
    createDepartment,
    createSchoolUser,
    deleteDepartment,
    deleteSchoolUser, updateDepartment,
    updateSchoolUser
} from "../../graphql/mutations";
import {displayError, getRandomInt, userType} from "../Utilities";
import Popup from "reactjs-popup";


//Enums for different views (like showing classes, previous course reports, blah blah blah)
const StudentOptions = {
    SHOW_CLASSES: 0,
    SHOW_COURSE_REPORTS: 1,
}
const InstructorOptions = {
    DEFAULT_OPTION: 0,
    CREATE_COURSE_STEP_1: 1,
    CREATE_COURSE_STEP_2: 2,
}
const RegistrarOptions = {
    EDIT_USERS: 0,
    VIEW_DEPARTMENTS: 1,
    ASSIGN_HEAD_STEP_1: 2,
    ASSIGN_HEAD_STEP_2: 3,
}

export default class DataPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [{value: "yes"}],
            studentOption: StudentOptions.SHOW_CLASSES,
            instructorOptions: InstructorOptions.DEFAULT_OPTION,
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
        switch (userType) {
            case "Student": {
                switch (studentOption) {
                    case StudentOptions.SHOW_CLASSES:
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
                }
                break;
            }
            case "Instructor": {
                switch (instructorOption) {
                    case InstructorOptions.CREATE_COURSE_STEP_1: {
                        return this.getColumnsForType("Registrar", null, RegistrarOptions.VIEW_DEPARTMENTS)
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
                    case StudentOptions.SHOW_CLASSES:
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
                            onClick: (event, rowData) => this.createNewPassword(rowData, this)
                        }, {
                            icon: () => <ActionIcon text="Del"/>,
                            tooltip: "Delete user",
                            onClick: (event, rowData) => this.deleteUser(rowData, this)
                        }]
                    case RegistrarOptions.VIEW_DEPARTMENTS: {
                        return [{
                            icon: () => <ActionIcon text="Del"/>,
                            tooltip: "Delete department",
                            onClick: (event, rowData) => this.deleteDepartment(rowData, this)
                        }]
                    }
                    case RegistrarOptions.ASSIGN_HEAD_STEP_1: {
                        return [{
                            icon: () => <ActionIcon text="Select"/>,
                            tooltip: "Select department",
                            onClick: function (e, row) {
                                here.registrarShowUsers(here, false)
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
                            onClick: (e, row) => here.assignDepartmentHead(here, here.state.department_to_head, row)
                        }]
                    }

                }
                break;
            }
            case "Instructor": {
                switch (this.state.instructorOptions) {
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

    assignDepartmentHead(context, department, user) {
        const userPresent = user != null
        if (!userPresent || user.user_type === 'INSTRUCTOR') {
            API.graphql(graphqlOperation(updateDepartment, {
                input: {
                    id: department.id,
                    departmentHeadId: userPresent ? user.id : null
                }
            })).then(function () {
                toast.info("Updated")
                context.registrarAssignDepartmentHead(context)
            }).catch(function (error) {
                displayError("Cannot update head instructor", error)
            })
        } else {
            displayError(`You can't make a ${userType(user)} a head instructor!`)
        }
    }


    deleteDepartment(rowData, context) {
        API.graphql(graphqlOperation(deleteDepartment, {
            input: {
                id: rowData.id
            }
        })).then(function () {
            toast.info("Department deleted")
            context.registrarShowDepartments(context)
        }).catch(function (error) {
            displayError("Could not delete department", error)
        })
    }

    deleteUser(rowData, context) {
        API.graphql(graphqlOperation(deleteSchoolUser, {
            input: {
                id: rowData.id
            }
        })).then(function () {
            toast.info("User deleted")
            context.registrarShowUsers(context)
        }).catch(function (error) {
            displayError("Could not delete user", error)
        })
    }


    createNewPassword(rowData, context) {
        const randomPassword = this.createPassword()
        API.graphql(graphqlOperation(updateSchoolUser, {
            input: {
                id: rowData.id,
                passwrd: randomPassword
            }
        })).then(function () {
            context.registrarShowUsers(context)
            alert(`Password updated: ${randomPassword}`)
        }).catch(function (error) {
            displayError('Cannot update password', error)
        })
    }

    createPassword() {
        return getRandomInt(100_000_000).toString();
    }

    /**
     * Get user_type from user property as string
     * @returns {string|null}
     */
    userType() {
        const u = this.props.user
        return userType(u)
    }

    /**
     * Gets buttons that are shown for each user type
     */
    buttonsForType() {
        let buttons = []
        const here = this
        switch (this.userType()) {
            case "Student": {
                buttons = [{
                    title: "Show classes", onClick: () => this.studentShowClasses(here)
                }, {
                    title: "Show course reports", onClick: () => this.studentShowCourseReports(here)
                }]
                break;
            }
            case "Registrar": {
                buttons = [{
                    title: "Show users", onClick: () => this.registrarShowUsers(here)
                }, {
                    popup: this.popupHelper('createUserPopup',
                        'Create user',
                        // here.createUserPopup
                        (ref) => here.createUserPopup(here, ref)
                    )
                },
                    {
                        popup: this.popupHelper('createDepartmentPopup',
                            'Create department',
                            (ref) => this.createDepartmentPopup(here, ref))
                    },
                    {
                        title: "Show departments", onClick: () => this.registrarShowDepartments(here)
                    },
                    {title: "Assign department head", onClick: () => this.registrarAssignDepartmentHead(here)},
                ]
                if (this.state.registrarOptions === RegistrarOptions.ASSIGN_HEAD_STEP_2) {
                    buttons.push({
                        title: 'Clear head professor',
                        onClick: () => this.assignDepartmentHead(here, this.state.department_to_head, null)
                    })
                }
                break;
            }
            case "Instructor" : {
                buttons = [{
                    title: 'Create course',
                    onClick: () => here.instructorCreateCourse(here)
                }]
                if (this.state.instructorOptions === InstructorOptions.CREATE_COURSE_STEP_2) {
                    buttons.push({
                        popup: this.popupHelper(
                            'createCoursePopup', 'Define section',
                            (ref) => here.createCoursePopup(ref, here)
                        )
                    })
                }
                break;
            }
        }
        return buttons.map(this.makeButton)
    }

    createCoursePopup(popupRef, context) {
        const section = React.createRef()
        return <div>
            <p>{`Course name: ${context.state.department_to_create_course_in.name}`}</p>

            <label htmlFor="section">Section: </label>
            <input ref={section} id="section" type='number'/>
            <button onClick={async function () {
                const current = popupRef.current
                if (await context.createCourseRequest(context, parseInt(section.current.value))) {
                    current.close()
                    context.setState({instructorOptions: InstructorOptions.DEFAULT_OPTION, data: null})
                }
            }}>
                Submit
            </button>
        </div>
    }

    async createCourseRequest(context, section) {
        if (section === '') {
            displayError("Must choose a section to continue")
            return false
        }
        try {
            let courseName = context.state.department_to_create_course_in.name;

            const alreadyExisting = await API.graphql(graphqlOperation(listCreateCourseRequests, {
                filter: {
                    course_name: {
                        eq: courseName
                    },
                    course_section: {
                        eq: section
                    }
                }
            }))
            if (alreadyExisting.data.listCreateCourseRequests.items.length > 0){
                displayError("Already exists")
                return false
            }

            await API.graphql(graphqlOperation(createCreateCourseRequest, {
                input: {
                    course_name: courseName,
                    course_section: section,
                    createCourseRequestHead_instructorId: context.props.user.id
                }
            }))
            toast.info("Course request saved")
            return true
        } catch (e) {
            displayError("Could not save course request", e)
            return false
        }
    }

    instructorCreateCourse(context) {
        API.graphql(graphqlOperation(listDepartments))
            .then(function (data) {
                const departments = data.data.listDepartments.items
                const myDepartments = departments.filter(function (value) {
                    const head = value.head
                    if (head == null) return false
                    return head.id === context.props.user.id
                })
                if (myDepartments.length > 0) {
                    context.setState({my_departments: myDepartments})
                    context.setState({instructorOptions: InstructorOptions.CREATE_COURSE_STEP_1})
                    context.registrarShowDepartments(context, false)
                } else {
                    displayError("You're not the head of any department, no can do")
                }
            })
            .catch(function (error) {
                displayError("Could not check if you were the department head", error)
            })
    }

    popupHelper(key, text, producePopup, onClick = function () {
    }) {
        const ref = React.createRef()
        return <Popup ref={ref} className='vertical'
                      key={key} trigger={
            <button>{text}</button>
        } onOpen={(e) => onClick(ref)} position="right center">
            {
                producePopup(ref)
            }
        </Popup>
    }

    registrarAssignDepartmentHead(context) {
        context.setState({registrarOptions: RegistrarOptions.ASSIGN_HEAD_STEP_1})
        context.registrarShowDepartments(context, false)
    }


    createDepartmentPopup(context, popupRef) {
        const name = React.createRef()
        return <div>
            <label htmlFor="name">Department name: </label>
            <input ref={name} id="name"/>
            <button onClick={async function () {
                const current = popupRef.current
                if (await context.createDepartment(context, name.current.value) === true) {
                    current.close()
                }
            }}
            >Submit
            </button>
        </div>
    }

    async createDepartment(context, name) {
        try {
            if (name === '') {
                displayError("Department name cannot be empty!")
                return false
            }
            const response = await API.graphql(graphqlOperation(listDepartments, {
                filter: {
                    name: {
                        eq: name
                    }
                }
            }))
            console.log('response', response)

            if (response.data.listDepartments.items.length > 0) {
                displayError("Department already exists with that name")
                return false
            }
            await API.graphql(graphqlOperation(createDepartment, {
                input: {
                    name: name
                }
            }))
            toast.info(`${name} department created`)
            context.registrarShowDepartments(context)
            return true
        } catch (error) {
            displayError("Could not create department", error)
            return false
        }
    }

    createUserPopup(context, popupRef) {
        const email = React.createRef()
        const fname = React.createRef()
        const lname = React.createRef()
        const user_type = React.createRef()
        return <>
            <div>
                <label htmlFor="email">Email: </label>
                <input ref={email} id="email"/>

                <label htmlFor="fname">First name: </label>
                <input ref={fname} id="fname"/>


                <label htmlFor="lname">Last name: </label>
                <input ref={lname} id="lname"/>

                <label htmlFor="user_type">User type: </label>
                <select ref={user_type} id="user_type">
                    <option value="REGISTRAR">Registrar</option>
                    <option value="STUDENT">Student</option>
                    <option value="INSTRUCTOR">Instructor</option>
                </select>

            </div>
            <button onClick={function () {
                const current = popupRef.current
                context.createUser(context, email.current.value,
                    fname.current.value,
                    lname.current.value,
                    user_type.current.value).then(function (result) {
                    if (result === true) {
                        //for whatever reason, popup null in here
                        current.close()
                    }
                })
            }
            }
            >Submit
            </button>
        </>
    }

    async createUser(context, email, first, last, user_type) {
        try {
            if (email === '' || first === '' || last === '') {
                displayError("Field(s) too short!")
                return false
            }
            const response = await API.graphql(graphqlOperation(listSchoolUsers, {
                filter: {
                    email: {
                        eq: email
                    }
                }
            }))
            if (response.data.listSchoolUsers.items.length > 0) {
                displayError("User already exists with that email!")
                return false
            }
            const data = await API.graphql(graphqlOperation(createSchoolUser, {
                input: {
                    email: email,
                    first_name: first,
                    last_name: last,
                    user_type: user_type,
                    passwrd: this.createPassword()
                }
            }))
            const user = data.data.createSchoolUser
            console.log('New user:', user)
            context.registrarShowUsers(context)
            alert(`Password is ${user.passwrd}`)
            return true
        } catch (error) {
            displayError("Could not generate user", error)
        }
        return false
    }

    registrarShowUsers(context, setOption = true) {
        if (setOption)
            context.setState({registrarOptions: RegistrarOptions.EDIT_USERS, data: []})
        API.graphql(graphqlOperation(listSchoolUsers))
            .then(function (data) {
                const users = data.data.listSchoolUsers.items
                context.setState({data: users})
            })
            .catch(function (error) {
                displayError("Cannot load users", error)
            })
    }

    registrarShowDepartments(context, setOption = true) {
        if (setOption)
            context.setState({registrarOptions: RegistrarOptions.VIEW_DEPARTMENTS, data: []})

        API.graphql(graphqlOperation(listDepartments))
            .then(function (data) {
                let departments = data.data.listDepartments.items
                departments = departments.map(function (value) {
                    let head = value.head;
                    if (head != null) {
                        value.head_name = `${head.first_name} ${head.last_name}`
                    }
                    return value
                })
                console.log('departments', departments)
                context.setState({data: departments})
            })
            .catch(function (error) {
                displayError("Cannot load departments", error)
            })
    }

    studentShowCourseReports(context) {
        context.setState({studentOption: StudentOptions.SHOW_COURSE_REPORTS})
    }

    studentShowClasses(context) {
        context.setState({studentOption: StudentOptions.SHOW_CLASSES})
    }

    makeButton(item, index) {
        if ('popup' in item) {
            return item.popup
        }
        return <button key={index} onClick={() => item.onClick()}>{item.title}</button>
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