import { useNavigate } from "react-router";

const Register = () => {

    const navigate = useNavigate();

    return(
        <main className="flex flex-col">
            <form action="">
                <input placeholder="Username" name="username" type="text" />
                <input type="text" placeholder="Password" name="password"/>
                <input type="text" placeholder="Confirm Password" name="confirm-password"/>
                <button type="submit">Login</button>
            </form>
            <button onClick={() => {
                navigate("/auth/login")
            }}>Go to Login</button>
        </main>
    )
}

export default Register;