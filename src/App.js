import {TodoList} from "./TodoList";
import {useEffect, useRef, useState} from "react";

const {v4: uuidv4} = require('uuid');
const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {

    const [todos, setTodos] = useState([])
    const todoNameRef = useRef()

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if (storedTodos) setTodos(storedTodos)
    }, [])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    }, [todos])

    function toggleTodo(id) {
        const newTodos = [...todos]
        const todo = newTodos.find(todo => todo.id === id)
        todo.complete = !todo.complete
        setTodos(newTodos)
    }

    return (
        <>
            <TodoList todos={todos} toggleTodo={toggleTodo}/>
            <input ref={todoNameRef} type="text"/>
            <button onClick={handleAddTodo}>Add todo</button>
            <button onClick={handleClearTodos}>Clear Completed Todos todo</button>
            <div>0 left to do</div>
        </>
    )

    function handleClearTodos() {
        setTodos(todos.filter(todo => !todo.complete))
    }


    function handleAddTodo(e) {
        const name = todoNameRef.current.value
        if (name === '') return
        setTodos(prevTools => {
            return [...prevTools, {id: uuidv4(), name: name, complete: false}]
        })
        todoNameRef.current.value = null
        console.log(name)
    }
}

export default App;
