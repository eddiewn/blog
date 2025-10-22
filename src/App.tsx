import { BrowserRouter as Router, Routes, Route } from "react-router"

import Home from "./Components/Index/Index"
import About from "./Components/About/About"
import Contact from "./Components/Contact/Contact"
import Auth from "./Components/AuthForms/Auth"

function App() {
  return (
    <>
        <Router>
            <Routes>
                <Route index element={<Home />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/contact" element={<Contact />}></Route>
                <Route path="/auth/*" element={<Auth />}></Route>
            </Routes>
        </Router>
    </>
  )
}

export default App
