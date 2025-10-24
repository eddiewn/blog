import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import UserContext from "../../context/UserContext";

const Login = () => {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("")

    const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const URL = "http://localhost:4000/api/login"
            const response = await fetch(URL, {
                method: "POST",
                credentials: "include",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            const data = await response.json();
            

            if(!response.ok){
                throw (`Failed to login: ${data.error} `)
            } else{
                if(data.valid === true){
                    setUser(data.user)
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