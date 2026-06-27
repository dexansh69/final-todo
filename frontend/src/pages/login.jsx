import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export function Login() {

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [displayMessage, setDisplayMessage] = useState("")
    async function loginreq() {
        try {
            const result = await axios.post("http://localhost:3000/users/login", {
                username, password
            })
            setDisplayMessage(result.data.message)
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
    return (
        <><div className="flex h-screen flex-col gap-y-4 items-center justify-center">
            <input placeholder="username" onChange={(e) => { setUsername(e.target.value) }} className="block w-half rounded-lg border border-slate-300 pl-10 pr-4 py-2.5 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"></input>
            <br></br>

            <input type="password" placeholder="password" onChange={(e) => { setPassword(e.target.value) }} className="block w-half rounded-lg border border-slate-300 pl-10 pr-4 py-2.5 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"></input>
            <button onClick={loginreq}className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition duration-200 ease-in-out transform active:scale-95" >login </button>
            <button onClick={() => { navigate("/signup") }} className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition duration-200 ease-in-out transform active:scale-95"> signup</button>
            <p className="text-red-500">{displayMessage}</p>
        </div>


        </>)
}