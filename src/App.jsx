import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import Home from "./pages/Home"
import Header from "./components/Header"
import Profile from "./pages/Profile"
import Login from "./pages/Login"
import Register from "./pages/Register"
import {Toaster} from "react-hot-toast"
import { useContext, useEffect } from "react"
import axios from "axios"
import { Context, server } from "./main"

function App() {

  const {setUser, setIsAuth, setload} = useContext(Context)

useEffect(() => {
  setload(true)
  axios.get(`${server}/user/me`,{
    withCredentials : true
  }).then((res)=>{
    setUser(res.data.user)
    setIsAuth(true)
    setload(false)
  }).catch((err)=>{
    setUser({})
    setIsAuth(false)
    setload(false)
  })
  setload(false)

}, [])

  return (
      <Router>
        <Header/>
        <Routes>
            <Route path="/" element = {<Home/>} />
            <Route path="/user" element = {<Profile/>} />
            <Route path="/login" element = {<Login/>} />
            <Route path="/register" element = {<Register/>} />
        </Routes>
        <Toaster/>
      </Router>

  )
}

export default App
