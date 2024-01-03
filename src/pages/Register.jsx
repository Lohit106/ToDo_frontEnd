import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from "axios"
import { Context, server } from '../main'
import toast from 'react-hot-toast'

const Register = () => {

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [ust,setust] = useState(false)

  const {isAuth,setIsAuth,load,setload}= useContext(Context);

  const SubHandle = async(e) =>{
    e.preventDefault();
    try {
      setload(true)
      const {data} = await axios.post(`${server}/user/new`,{
        name, email, password
      },{
        headers : {
          "Content-Type" : "application/json",
        },
        withCredentials : true
      });

      toast.success(data.message)
      setIsAuth(true)
      setload(false)
    } catch (error) {
      toast.error(error.response.data.message);
      if(error.response.data.message)
        setust(true)
      setIsAuth(false)
      setload(false)
      console.log(error)
    }
  }

  if(ust)
        return <Navigate to={"/login"} />
  if(isAuth)
        return <Navigate to={"/"}/>

  return (
    <div className='login'>
      <section>
        <form onSubmit={SubHandle}>
          <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" placeholder='Name' required/>
          <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder='Email' required/>
          <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder='Password' required/>
          <button type='submit' disabled={load}>Sign Up</button>
          <h4>or</h4>
          <Link to={"/login"}>Log In</Link>
        </form>
      </section>
    </div>
  )
}

export default Register