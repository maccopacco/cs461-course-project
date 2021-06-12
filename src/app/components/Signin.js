import React, {Component} from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {graphqlOperation} from "@aws-amplify/api-graphql";
import {API} from "@aws-amplify/api";
import {dataToUsers, displayError, userFullName} from "../Utilities";
import {toast} from "react-toastify";
import {createSchoolUser, deleteSchoolUser, updateSchoolUser} from "../../graphql/mutations";
import {getSchoolUser, listSchoolUsers} from "../../graphql/queries";


export default class Signin extends Component {

    constructor(props) {
        super(props);
        this.onSignin = this.onSignin.bind(this)
        this.closePopup = React.createRef()
    }

    hasUser() {
        return this.props.user != null
    }

    render() {
        return <>
            <p>{this.hasUser() ? (userFullName(this.props.user)) : "Noone signed in"}</p>
            <p>{this.hasUser() ? this.props.user.email : ""}</p>
            <div className='verticalGroup'>
                <Popup className='vertical'
                       ref={this.closePopup} trigger={
                    <button>
                        {"Sign " + (this.hasUser() ? "out" : "in")}
                    </button>
                } position="right center"
                       onOpen={e => this.onSigninClick()}>
                    {this.getSignInDialog()}
                </Popup>

                <Popup classname='passChange' ref={this.closePopup} trigger={
                    <button>Reset Password</button>
                } position="right center"
                       onOpen={e => this.onPassChange()}>
                    {this.getPassChange()}
                </Popup>


                <div>
                    {this.hasUser() ? <div>
                        <button onClick={() => this.props.toggleHelp()}>Show help</button>
                        <button onClick={() => this.refreshUsers()}>[DEBUG] Regenerate base users</button>
                    </div> : null}
                </div>

            </div>
        </>
    }

    onPassChange() {
        if (!this.hasUser()) {
            this.closePopup.current.close()
        }
    }

    getPassChange() {
        if (this.hasUser()) {
            const npass = React.createRef()
            return <>
                <label>New Password</label>
                <input ref={npass} id="npass"/>

                <button onClick={() =>
                    this.resetPass(npass.current.value)}>Change
                </button>
            </>
        } else {
            return null
        }
    }

    async resetPass(newp) {
        try {
            await API.graphql(graphqlOperation(updateSchoolUser, {
                input: {
                    id: this.props.user.id,
                    passwrd: newp
                }
            }))
            toast.info("Password changed")
            this.closePopup.current.close()
        } catch (err) {
            displayError("Password change unsuccessful", err)
        }
    }

    onSigninClick() {
        console.log('onSigninClick')
        if (this.hasUser()) {
            console.log(`Signing out`)
            this.onSignin(null)
            return true
        }
    }

    getSignInDialog() {
        if (this.hasUser()) {
            return null
        }
        const email = React.createRef()
        const passwordRef = React.createRef()
        return <div>
            <label htmlFor="email">Email: </label>
            <input ref={email} id="email"/>

            <label htmlFor="password">Password: </label>
            <input ref={passwordRef} id="password"/>

            <button onClick={() =>
                this.onTrySignin(email.current.value, passwordRef.current.value, this.onSignin)}>
                Sign in
            </button>
        </div>
    }

    onTrySignin(email, password, onSignin) {
        console.log('Calling onTrySignin')

        const bad = (error) => displayError("Cannot get users right now... try again later", error)

        //listSchoolUsersNoPassword
        API.graphql(graphqlOperation(listSchoolUsers, {
            filter: {
                email: {
                    eq: email
                }
            }
        })).then(function (data) {
            const users = dataToUsers(data)
            const l = users.length
            console.log(`Amount of users with email: ${l}`)
            if (l <= 0) {
                displayError("Invalid email")
            } else if (l === 1) {
                API.graphql(graphqlOperation(listSchoolUsers, {
                    filter: {
                        email: {
                            eq: email
                        },
                        passwrd: {
                            eq: password
                        }
                    }
                })).then(function (data) {
                    const user = dataToUsers(data)[0]
                    if (user) {
                        onSignin(user)
                    } else {
                        displayError("Invalid password")
                    }
                }).catch(function (error) {
                    bad(error)
                })
            } else if (l > 1) {
                displayError("Too many users for email")
            }
        }).catch(function (err) {
            bad(err)
        })

    }

    onSignin(user) {
        this.props.setUser(user)
        this.closePopup.current.close()
    }

    async refreshUsers() {
        try {
            const response = await API.graphql(graphqlOperation(listSchoolUsers))
            const users = dataToUsers(response)
            for (let user of users) {
                await API.graphql(graphqlOperation(deleteSchoolUser, {
                    input: {
                        id: user.id
                    }
                }))
            }
        } catch (error) {
            displayError("Could not delete all users", error)
            return
        }

        const users = [
            {
                first_name: "John",
                last_name: "Smith",
                email: "smit1234@kettering.edu",
                passwrd: "password",
                user_type: "REGISTRAR"
            },
            {
                first_name: "Max",
                last_name: "Dreher",
                email: "dreh4899@kettering.edu",
                passwrd: "password",
                user_type: "STUDENT"
            },
            {
                first_name: "Prof",
                last_name: "SQL",
                email: "prof@kettering.edu",
                passwrd: "password",
                user_type: "INSTRUCTOR"
            }
        ]
        try {
            for (let user of users)
                await API.graphql(graphqlOperation(createSchoolUser, {
                    input: user
                }))
        } catch (error) {
            displayError("Could not create new users", error)
        }
        toast.success("Users regenerated")
    }
}