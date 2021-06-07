import {Component} from "react";

export default class Todo extends Component {

    render() {
        const {todo, onToggleTodo} = this.props

        function onCheckBoxChange() {
            onToggleTodo(todo.id)
        }

        return <div>
            <input type="checkbox" checked={todo.complete} onChange={onCheckBoxChange}/>
            <label>
                {todo.name}
            </label>
        </div>
    }

}
