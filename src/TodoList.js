import {Component} from "react";

import Todo from './Todo.js'

export class TodoList extends Component {

    render() {
        const {todos, toggleTodo} = this.props
        return (
            todos.map(todo => {
                return <Todo key={todo.id} todo={todo} toggleTodo = {toggleTodo}/>
            })
        )
    }
}