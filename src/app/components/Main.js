import React, {Component} from "react";
import Signin from "./Signin";
import DataPage from "./DataPage";
import Popup from "reactjs-popup";

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {user: null, help: false}
    }


    async setUser(newUser) {
        this.setState({user: newUser})
    }

    toggleHelp() {
        this.setState({help: !this.state.help})
    }

    render() {
        return <>
            <div className='mainItem'>
                <div className='signinBox'>
                    <Signin user={this.state.user} setUser={(user) => this.setUser(user)}
                            toggleHelp={() => this.toggleHelp()}>
                    </Signin>
                </div>
                {/*{this.help()}*/}
                {this.state.help ? this.help() : null}
                <div>
                    <DataPage user={this.state.user}/>
                </div>

            </div>
        </>
    }


    help() {
        return <div className='centeringDiv'>
            <div className='helpDiv'>
                <p>Try 'smit1234@kettering.edu' and 'password' to login</p>
                <p>If you mess up the users, use the 'Regenerate base users' button</p>
                <p>To try out being an Instructor / student, get the emails from Registrar/Show users</p>
                <p>and get the passwords either by resetting the desired users password in Registrar/Show
                    users</p>
                <p>or by knowing they are all 'password' by default</p>
            </div>
            <div className='helpDiv'>
                <p>Create a department, then assign a head to that department with Registrar/assign department head</p>
                <p>Once an instructor is a Head instructor, they can create 'Create class requests'</p>
                <p>Click Instructor/Create course, the department you desire, then 'Define section'</p>
                <p>Instructors can cancel this is too much move it to the readme and link itex</p>
            </div>
        </div>
    }
}