import { useNavigate } from "react-router";

const Login = () => {

    const navigate = useNavigate();

    return(
        <main className="flex flex-col">
            <form action="">
                <input placeholder="Username" name="username" type="text" />
                <input type="text" placeholder="Password" name="password"/>
                <button type="submit">Login</button>
            </form>
            <button onClick={() => {
                navigate("/auth/register")
            }}>Go to Register</button>
        </main>
    )
}

export default Login;