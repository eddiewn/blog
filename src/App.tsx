import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { UserProvider } from "./context/UserContext"

import Home from "./Components/Index/Index"
import About from "./Components/About/About"
import Contact from "./Components/Contact/Contact"
import Auth from "./Components/AuthForms/Auth"
import Createblog from "./Components/Blog/Createblog"
import Viewblogs from "./Components/Blog/Viewblogs"
import Post from "./Components/Blog/Post"
import Header from "./Components/Header/Header"
import Footer from "./Components/Footer"
import Profile from "./Components/Profile/Profile"

function App() {
  return (
    <UserProvider>
        <Router>
            <Header/>
            <Routes>
              
                <Route index element={<Home />}></Route>


                <Route path="/about" element={<About />}></Route>
                <Route path="/contact" element={<Contact />}></Route>
                <Route path="/auth/*" element={<Auth />}></Route>
                <Route path="/create-blog" element={<Createblog />}></Route>
                <Route path="/view-blogs" element={<Viewblogs />}></Route>
                <Route path="/posts/*" element={<Post />}></Route>
                <Route path="/profile/*" element={<Profile />}></Route>
            </Routes>
            <Footer/>
        </Router>
    </UserProvider>
  )
}

export default App;
