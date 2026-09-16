import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";

import Home from "./Components/Main/Index";
import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";
import Auth from "./Components/AuthForms/Auth";
import Createblog from "./Components/Blog/Createblog";
import Viewblogs from "./Components/Blog/Viewblogs";
import Post from "./Components/Blog/Post";
import Settings from "./Components/Settings/Settings"

import Profile from "./Components/Profile/Profile";
import Layout from "./Components/Layout";

function App() {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/auth/*" element={<Auth />} />

                    <Route element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/create-blog" element={<Createblog />} />
                        <Route path="/view-blogs" element={<Viewblogs />} />
                        <Route path="/posts/*" element={<Post />} />
                        <Route path="/profile/*" element={<Profile />} />
                        <Route path="/settings" element={<Settings />} />
                    </Route>
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;
