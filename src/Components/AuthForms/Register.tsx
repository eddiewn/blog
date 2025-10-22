import { useNavigate } from "react-router";
import { useState } from "react";

const Register = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("")



    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(password !== confirmPassword) return console.log("This shit not correct")

        console.log("This shit correct now");

        (async() => {
            try {
                const URL = "http://localhost:4000/api/register"
                const response = await fetch(URL, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({ username: username, password: password }),
                })

                const data = await response.json();
                console.log(data.message)
            } catch (error) {
                console.log("Error inserting user:", error)
            }
        })()
    }

    return(
        <main className="flex flex-col">
            <form onSubmit={submitHandler}>
                <input placeholder="Username" type="text" onChange={(e) => {
                    setUsername(e.target.value)
                }} />
                <input type="text" placeholder="Password" onChange={(e) => {
                    setPassword(e.target.value)
                }}/>
                <input type="text" placeholder="Confirm Password" onChange={(e) => {
                    setConfirmPassword(e.target.value)
                }}/>
                <button type="submit">Register</button>
            </form>
            <button onClick={() => {
                navigate("/auth/login");
            }}>Go to Login</button>
        </main>
    )
}

export default Register;