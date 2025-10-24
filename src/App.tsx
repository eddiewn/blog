import { BrowserRouter as Router, Routes, Route } from "react-router"
import { UserProvider } from "./context/UserContext"

import Home from "./Components/Index/Index"
import About from "./Components/About/About"
import Contact from "./Components/Contact/Contact"
import Auth from "./Components/AuthForms/Auth"
import Createblog from "./Components/Blog/Createblog"

function App() {
  return (
    <UserProvider>
        <Router>
            <Routes>
                <Route index element={<Home />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/contact" element={<Contact />}></Route>
                <Route path="/auth/*" element={<Auth />}></Route>
                <Route path="/create-blog" element={<Createblog />}></Route>
            </Routes>
        </Router>
    </UserProvider>
  )
}

export default App
