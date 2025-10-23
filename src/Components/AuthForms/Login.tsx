import { useState } from "react";
import { useNavigate } from "react-router";

const Login = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("")

    const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const URL = "http://localhost:4000/api/login"
            const response = await fetch(URL, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            const data = await response.json();

            console.log(data.valid)
            if(!response.ok){
                throw (`Failed to login: ${data} `)
            } else{
                if(data.valid === true){
                    navigate("/")
                }
                console.log("Logged in chungus")
            }
        } catch (error) {
            console.log("Error handling login:", error)
        }

    }

    return(
        <main className="flex flex-col">
            <form onSubmit={loginHandler}>
                <input placeholder="Username" type="text" onChange={(e) => {
                    setUsername(e.target.value)
                }} />
                <input type="text" placeholder="Password" onChange={(e) => {
                    setPassword(e.target.value)
                }}/>
                <button type="submit">Login</button>
            </form>
            <button onClick={() => {
                navigate("/auth/register")
            }}>Go to Register</button>
        </main>
    )
}

export default Login;