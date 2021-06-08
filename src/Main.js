import React, {Component} from "react";
import Signin from "./Signin";

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {todos: []}
    }


    render() {
        return <>
            <Signin>
            </Signin>
        </>
    }
}