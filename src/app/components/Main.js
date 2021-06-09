import React, {Component} from "react";
import Signin from "./Signin";

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {user: null}
    }

    render() {
        return <>
            <Signin user={this.state.user} setUser={(user) => this.setState({user: user})}>
            </Signin>
            {/*<DataPage></DataPage>*/}
        </>
    }
}