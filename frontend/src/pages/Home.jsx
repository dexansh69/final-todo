
import axios from "axios";
import { useState } from "react"
import { DeleteTodoApi, GetTodosApi, UpdateTodoApi } from "../apicalls/fetchtodo";


export function Home() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const [displayMessage, setDisplayMessage] = useState("");
    const [todos, setTodo] = useState([])
    const token = localStorage.getItem("token");
    async function postTodo() {
        try {
            const result = await axios.post("http://localhost:3000/todos/todo", {
                title, description
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setTitle("")
            setDescription("")
            setDisplayMessage(result.data.message);



        } catch (error) {
            if (error.response && error.response.data) {
                // Tumhara backend wala custom message yahan milega
                setDisplayMessage(error.response.data.message);
            } else {
                // Agar server tak request pahunchi hi nahi (Network Error)
                setDisplayMessage(error.message);
            }

        }


    }
    // function for list of todo api call and setting them 
    async function FetchTodos() {
        try {
            const data = await GetTodosApi();
            setTodo(data.list)
        } catch (error) {
            if (error.response && error.response.data) {
                // Tumhara backend wala custom message yahan milega
                setDisplayMessage(error.response.data.message);
            } else {
                // Agar server tak request pahunchi hi nahi (Network Error)
                setDisplayMessage(error.message);
            }
        }
    }
    async function deleteTodo(todoId) {
        try {
            const result = await DeleteTodoApi(todoId);
            setDisplayMessage(result.message);
            await FetchTodos();
        } catch (error) {
            if (error.response && error.response.data) {
                // Tumhara backend wala custom message yahan milega
                setDisplayMessage(error.response.data.message);
            } else {
                // Agar server tak request pahunchi hi nahi (Network Error)
                setDisplayMessage(error.message);
            }

        }

    }
    async function UpdateTodo(todoId) {
        try { 
            const result = await UpdateTodoApi(todoId);
            setDisplayMessage(result.message)
        } catch (error) {
            if (error.response && error.response.data) {
                // Tumhara backend wala custom message yahan milega
                setDisplayMessage(error.response.data.message);
            } else {
                // Agar server tak request pahunchi hi nahi (Network Error)
                setDisplayMessage(error.message);
            }

        }

    }

    return (<div >
        <input value={title} onChange={(e) => { setTitle(e.target.value) }} placeholder="title" className="block w-half rounded-lg border border-slate-300 pl-10 pr-4 py-2.5 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"></input>
        <br></br>
        <input value={description} onChange={(e) => { setDescription(e.target.value) }} placeholder="description" className="block w-half rounded-lg border border-slate-300 pl-10 pr-4 py-2.5 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"></input>
        <br></br>
        <button onClick={postTodo} className="px-5 py-2.5 bg-green-400 rounded-2xl">add todo</button>
        <button className="px-5 py-2.5 bg-green-400 rounded-2xl" onClick={FetchTodos}>list of todos</button>
        <br></br>
        <p > {displayMessage}</p>

        <div>
            {todos.map((todo) => (

                <div key={todo._id}>
                    <b> <h1>{todo.title}</h1></b>
                    <p>{todo.description}</p>
                    <button className="px-2 py-2 bg-green-400 rounded-2xl" onClick={() => { deleteTodo(todo._id) }} >delete</button>
                    <button className="px-2 py-2 bg-green-400 rounded-2xl" onClick={() => { UpdateTodo(todo._id) }}>mark as done</button>
                    
                </div>
            ))}</div>



    </div>)
}