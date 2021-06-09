import React, {Component} from "react";
import Signin from "./Signin";
import DataPage from "./DataPage";

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {user: null}
    }

    render() {
        return <>
            <div className='mainItem'>
                <div className='signinBox'>
                    <Signin user={this.state.user} setUser={(user) => this.setState({user: user})}>
                    </Signin>
                </div>
                <div>
                    <DataPage user={this.state.user} className='datapage'/>
                </div>
            </div>
        </>
    }
}