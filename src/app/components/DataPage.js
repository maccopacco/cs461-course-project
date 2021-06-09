import React, {Component} from "react";
import MaterialTable from "material-table";
import {listSchoolUsers} from "../../graphql/queries";
import {graphqlOperation} from "@aws-amplify/api-graphql";
import {API} from "@aws-amplify/api";
import {toast} from "react-toastify";
import {ActionIcon} from "./ActionIcon";
import {createSchoolUser, updateSchoolUser} from "../../graphql/mutations";
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
    EDIT_USERS: 0
}

export default class DataPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [{value: "yes"}],
            studentOption: StudentOptions.SHOW_CLASSES,
            instructorOption: InstructorOptions.DEFAULT_OPTION,
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
                    case RegistrarOptions.EDIT_USERS:
                        return [{title: 'User Type', field: 'user_type'},
                            {title: 'ID', field: 'id'},
                            {title: 'Email', field: 'email'},
                            {title: 'First Name', field: 'first_name'},
                            {title: 'Last Name', field: 'last_name'},
                            // {title: 'Password', field: 'passwrd'}
                        ]
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
                            tooltip: "Save user",
                            onClick: (event, rowData) => this.createNewPassword(rowData, this)
                        }]
                }
                break;
            }

        }
        return []
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
            toast.info('updated')
            console.log('updated')
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
            }
            case "Registrar": {
                buttons = [{
                    title: "Show users", onClick: () => this.registrarShowUsers(here)
                }, {title: "Create user", popup: this.registarCreateUserPopup()}]
            }
        }
        return buttons.map(this.makeButton)
    }

    registarCreateUserPopup() {
        const ref = React.createRef()
        return <Popup ref={ref} className='vertical'
                      key='createUserPopup' trigger={
            <button>Create user</button>
        } position="right center">
            {this.getPopup(ref)}
        </Popup>
    }

    getPopup(popupRef) {
        const here = this
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
                popupRef.current.close()
                here.createUser(here, email.current.value,
                    fname.current.value,
                    lname.current.value,
                    user_type.current.value)
            }}
            >Submit
            </button>
        </>
    }

    createUser(context, email, first, last, user_type) {
        API.graphql(graphqlOperation(createSchoolUser, {
            input: {
                email: email,
                first_name: first,
                last_name: last,
                user_type: user_type,
                passwrd: this.createPassword()
            }
        })).then(function(data) {
            const user = data.data.createSchoolUser
            console.log('New user:', user)
            context.registrarShowUsers(context)
            alert(`Password is ${user.passwrd}`)
        }).catch(function(error) {
            const m = "Could not generate user"
            console.error(m,error)
            toast.error(m)
        })
    }

    registrarShowUsers(context) {
        context.setState({registrarOptions: RegistrarOptions.EDIT_USERS, data: null})
        API.graphql(graphqlOperation(listSchoolUsers))
            .then(function (data) {
                const users = data.data.listSchoolUsers.items
                context.setState({data: users})
            })
            .catch(function (error) {
                let m = "Can not load users";
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