import { Routes, Route } from "react-router";
import Register from "./Register";
import Login from "./Login";


const Auth = () => {
    return(
            <Routes>
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
                <Route path="*" element={<Login />} />

            </Routes>
    )
}

export default Auth;