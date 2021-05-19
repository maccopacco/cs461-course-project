import {Component} from "react";

export default class Todo extends Component {


    render() {
        const {todo, toggleTodo} = this.props

        function onCheckBoxChange() {
            toggleTodo(todo.id)
        }

        return <div>
            <input type="checkbox" checked={todo.complete} onChange={onCheckBoxChange}/>
            <label>
                {todo.name}
            </label>
        </div>
    }

}
