import {Component} from "react";

export class ActionIcon extends Component {
    render(){
        return <p className='actionTextSize'>{this.props.text}</p>
    }
}