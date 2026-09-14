import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import UserContext from "../../context/UserContext";

const Login = () => {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const URL = "http://localhost:4000/api/login";
            const response = await fetch(URL, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });
            const data = await response.json();

            if (!response.ok) {
                throw `Failed to login: ${data.error} `;
            } else {
                if (data.valid === true) {
                    setUser(data.user);
                    navigate("/");
                }
                console.log("Logged in chungus");
            }
        } catch (error) {
            console.log("Error handling login:", error);
        }
    };

    return (
        <main className="flex flex-col-reverse lg:flex-row-reverse h-screen">
            <section className="w-3/4 flex flex-col m-auto items-center gap-10">
                <h1 className="text-1xl font-bold">Login</h1>
                <form
                    className="w-full lg:w-1/3 flex flex-col gap-5"
                    onSubmit={loginHandler}
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
                    <p className="text-xs font-bold opacity-60">
                        Forgot Password?
                    </p>
                    <button
                        className="bg-violet-500 text-white rounded-xl p-2 flex justify-center items-center gap-2"
                        type="submit"
                    >
                        Login <i className="fa-solid fa-arrow-right-long"></i>
                    </button>
                </form>
                <div className="flex gap-5">
                    <p>Don't have an account?</p>
                    <button
                        className="text-violet-500 font-semibold hover:text-violet-400 hover:cursor-pointer duration-300"
                        onClick={() => {
                            navigate("/auth/register");
                        }}
                    >
                        Sign up
                    </button>
                </div>
            </section>
            <section className="flex flex-col gap-5 w-full p-5 lg:w-2/5 bg-violet-100 h-2/5 lg:h-full lg:gap-50 lg:justify-center lg:pl-10">
                <p className="text-7xl">Logo here</p>
                <div className="text-2xl  opacity-80">
                    <p>Welcome!</p>
                    <p className="w-4/5">Login to gain access to commenting and making your own posts!</p>
                </div>
                <div className="flex items-center text-violet-500">
                <i className="fa-solid fa-chevron-left"></i><p className="underline text-violet-500 hover:cursor-pointer"
                    onClick={() => {
                        navigate("/")
                    }}
                >Home</p>
                </div>
            </section>
        </main>
    );
};

export default Login;
