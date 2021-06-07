import {Component} from "react";

import Todo from './Todo.js'

export class TodoList extends Component {

    render() {
        const {todos, onToggleTodo} = this.props
        return todos.map(singleTodo => {
            return <Todo key={singleTodo.id} todo={singleTodo} onToggleTodo= {onToggleTodo}/>
        })
    }

}