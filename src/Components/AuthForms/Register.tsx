import { useNavigate } from "react-router";
import { useContext, useState } from "react";
import logo from "../../Assets/images/logo.png";
import UserContext from "../../context/UserContext";
import { fetchCsrfToken, login, register } from "../../api/api";

const Register = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const { setUser } = useContext(UserContext);

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await fetchCsrfToken();

            await register({ username, password, confirmPassword });

            const data = await login({ username, password });
            if (data.valid) {
                setUser(data.user);
                navigate("/");
            }
        } catch (error) {
            console.log("Error inserting user:", error);
        }
    };

    return (
        <main className="flex flex-col-reverse lg:flex-row-reverse gap-10 lg:gap-0 lg:h-screen">
            <section className="w-3/4 flex flex-col m-auto items-center gap-10">
                <h1 className="text-1xl font-bold">Sign up</h1>
                <form
                    className="w-full lg:w-1/3 flex flex-col gap-5"
                    onSubmit={submitHandler}
                >
                    <div className="relative w-full">
                        <label
                            htmlFor="username"
                            className="absolute left-3 top-1 text-xs text-gray-500 font-bold"
                        >
                            Username
                        </label>
                        <input
                            className="bg-white w-full h-15 rounded-xl focus:border-2 px-3 pt-4 pb-1 outline-none focus:border-violet-400"
                            placeholder=""
                            type="text"
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                        />
                    </div>
                    <div className="relative w-full">
                        <label
                            htmlFor="password"
                            className="absolute left-3 top-1 text-xs text-gray-500 font-bold"
                        >
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            className="bg-white w-full h-15 rounded-xl border border-violet-200 focus:border-2 px-3 pt-4 pb-1 outline-none focus:border-violet-400"
                        />
                    </div>
                    <div className="relative w-full">
                        <label
                            htmlFor="confirmpassword"
                            className="absolute left-3 top-1 text-xs text-gray-500 font-bold"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                            }}
                            className="bg-white w-full h-15 rounded-xl border border-violet-200 focus:border-2 px-3 pt-4 pb-1 outline-none focus:border-violet-400"
                        />
                    </div>

                    <button
                        className="bg-violet-500 text-white rounded-xl p-2 flex justify-center items-center gap-2"
                        type="submit"
                    >
                        Register{" "}
                        <i className="fa-solid fa-arrow-right-long"></i>
                    </button>
                </form>
                <div className="flex gap-5">
                    <p>Already have an account?</p>
                    <button
                        className="text-violet-500 font-semibold hover:text-violet-400 hover:cursor-pointer duration-300"
                        onClick={() => {
                            navigate("/auth/login");
                        }}
                    >
                        Sign in
                    </button>
                </div>
            </section>
            <section className="flex flex-col gap-5 w-full p-5 lg:w-2/5 bg-violet-100 h-2/5 lg:h-full lg:gap-10 lg:justify-center lg:pl-10">
                <img className="w-1/2" src={logo} alt="" />
                <div className="text-2xl  opacity-80">
                    <p>Welcome!</p>
                    <p className="w-4/5">
                        Login to gain access to commenting and making your own
                        posts!
                    </p>
                </div>
                <div className="flex items-center text-violet-500">
                    <i className="fa-solid fa-chevron-left"></i>
                    <p
                        className="underline text-violet-500 hover:cursor-pointer"
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        Home
                    </p>
                </div>
            </section>
        </main>
    );
};

export default Register;
