import React, {Component} from "react";
import {TodoList} from "./TodoList";
import {graphqlOperation} from "@aws-amplify/api-graphql";
import {API} from "@aws-amplify/api";
import {listItems} from "./graphql/queries";
import {createItem, deleteItem} from "./graphql/mutations";

const {v4: uuidv4} = require('uuid');

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {todos: []}
        this.textRef = React.createRef()

        this.handleAddTodo = this.handleAddTodo.bind(this)
        this.handleClearTodos = this.handleClearTodos.bind(this)
        this.toggleTodo = this.toggleTodo.bind(this)
        // this.fetchItems = this.fetchItems.bind(this)
        this.deleteTodos = this.deleteTodos.bind(this)
    }

    toggleTodo(id) {
        this.setState({
            todos: this.state.todos.map(function (value) {
                if (value.id === id) {
                    value.complete = !value.complete
                }
                return value
            })
        })
    }

    handleAddTodo() {
        const value = this.textRef.current.value
        if (value === '') return

        const newTodos = [...this.state.todos]
        const newItem = {id: uuidv4(), name: value, complete: false}
        newTodos.push(newItem)
        this.setState({todos: newTodos})

        this.textRef.current.value = null
        console.log(`New added item`)
        console.log(newItem)
    }

    handleClearTodos() {
        this.setState({todos: this.state.todos.filter(todo => !todo.complete)})
    }

    async fetchItems() {
        try {
            const todoData = await API.graphql(graphqlOperation(listItems))
            const todos = todoData.data.listItems.items
            console.log(todos)
            return todos
        } catch (err) {
            console.error(`error fetching todos`, err)
        }
    }

    async putTodos() {
        try {
            const newItem = {name: Math.random().toString()}
            await API.graphql(graphqlOperation(createItem, {input: newItem}))
        } catch (err) {
            console.error(`Could not add item`, err)
        }
    }

    async deleteTodos() {
        try {
            const items = await this.fetchItems()
            console.log('Got items')
            console.log(items)
            for (let toDelete of items) {
                console.log(toDelete.id)
                await API.graphql(graphqlOperation(deleteItem, {input: {id: toDelete.id}}))
            }
        } catch (err) {
            console.error(`Could not delete items`, err)
        }
    }

    render() {

        return <>
            <TodoList todos={this.state.todos} onToggleTodo={this.toggleTodo}/>
            <input ref={this.textRef} type="text"/>
            <div>
                <button onClick={this.handleAddTodo}>Add todo</button>
            </div>
            <div>
                <button onClick={this.handleClearTodos}>Clear Completed Todos todo</button>
            </div>
            <div>
                <button onClick={this.fetchItems}>Get items</button>
            </div>
            <div>
                <button onClick={this.putTodos}>Put item</button>
            </div>
            <div>
                <button onClick={this.deleteTodos}>Delete items</button>
            </div>
            <div>0 left to do</div>
        </>
    }
}