import axios from "axios";


export async function GetTodosApi() {

    try {
        const token = localStorage.getItem("token");
        const result = await axios.get("http://localhost:3000/todos/todo", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return result.data;
    } catch (error) {
        throw error;

    }
    // this function calls the component to render the todos on the screen

}

// api call to delete todo 
export async function DeleteTodoApi(todoId) {
    try {
        const token = localStorage.getItem("token");
        const result = await axios.delete(`http://localhost:3000/todos/todo/${todoId}`,  {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return result.data.message;

    } catch (error) {
        throw error;
    }
}
// api call to update todo 
export async function UpdateTodoApi(todoId){
    try{
        const token = localStorage.getItem("token")
        const result = await axios.put(`http://localhost:3000/todos/todo/${todoId}`,{
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        return result.data.message

    }catch(error){
        throw error;
    }
}
