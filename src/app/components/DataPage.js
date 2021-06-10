import React, {Component} from "react";
import MaterialTable from "material-table";
import {listDepartments, listSchoolUsers} from "../../graphql/queries";
import {graphqlOperation} from "@aws-amplify/api-graphql";
import {API} from "@aws-amplify/api";
import {toast} from "react-toastify";
import {ActionIcon} from "./ActionIcon";
import {
    createDepartment,
    createSchoolUser,
    deleteDepartment,
    deleteSchoolUser,
    updateSchoolUser
} from "../../graphql/mutations";
import {getRandomInt} from "../Utilities";
import Popup from "reactjs-popup";


//Enums for different views (like showing classes, previous course reports, blah blah blah)
const StudentOptions = {
    SHOW_CLASSES: 0,
    SHOW_COURSE_REPORTS: 1,
}
const InstructorOptions = {
    DEFAULT_OPTION: 0
}
const RegistrarOptions = {
    EDIT_USERS: 0,
    VIEW_DEPARTMENTS: 1
}

export default class DataPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [{value: "yes"}],
            studentOption: StudentOptions.SHOW_CLASSES,
            instructorOptions: InstructorOptions.DEFAULT_OPTION,
            registrarOptions: RegistrarOptions.EDIT_USERS
        }
    }

    /**
     * Coverts usertype and current option to list of column values
     * @returns {{field: string, title: string}[]|*[]}
     */
    getColumnsForType() {
        switch (this.userType()) {
            case "Student": {
                switch (this.state.studentOption) {
                    case StudentOptions.SHOW_CLASSES:
                }
                break;
            }
            case "Registrar": {
                switch (this.state.registrarOptions) {
                    case RegistrarOptions.EDIT_USERS: {
                        return [{title: 'User Type', field: 'user_type'},
                            {title: 'ID', field: 'id'},
                            {title: 'Email', field: 'email'},
                            {title: 'First Name', field: 'first_name'},
                            {title: 'Last Name', field: 'last_name'},
                            // {title: 'Password', field: 'passwrd'}
                        ]
                    }
                    case RegistrarOptions.VIEW_DEPARTMENTS: {
                        return [{title: 'Department name', field: 'name'}]
                    }
                }
                break;
            }
        }
        return []
    }

    /**
     * Converts usertype and current option to list of actions that can be clicked for each row
     * @returns {{onClick: (function(*, *): void), icon: (function()), tooltip: string}[]|*[]}
     */
    getActionsForType() {
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

                }
                break;
            }
            case "Instructor": {
                switch (this.state.instructorOptions) {

                }
            }

        }
        return []
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
            const m = "Could not delete department"
            toast.error(m)
            console.error(m, error)
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
            const m = "Could not delete user"
            toast.error(m)
            console.error(m, error)
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
            let m = 'Cannot update password';
            toast.error(m)
            console.error(m, error)
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
        if (u == null)
            return null
        const t = u.user_type
        let s = t.toLocaleLowerCase()
        s = s[0].toUpperCase() + s.slice(1)
        return s
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
                    title: "Create user",
                    popup: this.popupHelper('createUserPopup',
                        'Create user',
                        // here.createUserPopup
                        (ref) => here.createUserPopup(here, ref)
                    )
                },
                    {
                        title: "Create department",
                        popup: this.popupHelper('createDepartmentPopup',
                            'Create department',
                            (ref) => this.createDepartmentPopup(here, ref))
                    },
                    {
                        title: "Show departments", onClick: () => this.registrarShowDepartments(here)
                    }]
                break;
            }
            case "Instructor" : {
                buttons = []
                break;
            }
        }
        return buttons.map(this.makeButton)
    }

    popupHelper(key, text, method) {
        const ref = React.createRef()
        return <Popup ref={ref} className='vertical'
                      key={key} trigger={
            <button>{text}</button>
        } position="right center">
            {
                method(ref)
            }
        </Popup>
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
                toast.error("Department name cannot be empty!")
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
                toast.error("Department already exists with that name")
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
            const m = "Could not create department"
            toast.error(m)
            console.error(m, error)
            return false
        }
        return false
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
                toast.error("Field(s) too short!")
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
                toast.error("User already exists with that email!")
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
            const m = "Could not generate user"
            console.error(m, error)
            toast.error(m)
        }
        return false
    }

    registrarShowUsers(context) {
        context.setState({registrarOptions: RegistrarOptions.EDIT_USERS, data: []})
        API.graphql(graphqlOperation(listSchoolUsers))
            .then(function (data) {
                const users = data.data.listSchoolUsers.items
                context.setState({data: users})
            })
            .catch(function (error) {
                let m = "Cannot load users";
                toast.error(m)
                console.error(m, error)
            })
    }

    registrarShowDepartments(context) {
        context.setState({registrarOptions: RegistrarOptions.VIEW_DEPARTMENTS, data: []})

        API.graphql(graphqlOperation(listDepartments))
            .then(function (data) {
                const departments = data.data.listDepartments.items
                context.setState({data: departments})
            })
            .catch(function (error) {
                const m = "Cannot load departments"
                toast.error(m)
                console.error(m, error)
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