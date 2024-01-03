import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Context, server } from '../main';
import toast from 'react-hot-toast';
import axios from 'axios';

const Login = () => {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const {isAuth,setIsAuth,load, setload}= useContext(Context);

  const SubHandle = async(e) =>{
    e.preventDefault();
    try {
      setload(true)
      const {data} = await axios.post(`${server}/user/login`,{
        email, password
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
      setIsAuth(false)
      setload(false)
      console.log(error)
    }
  }

  if(isAuth)
    return <Navigate to={"/"}/>

  return (
    <div className='login'>
      <section>
        <form onSubmit={SubHandle}>
          <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder='Email' required/>
          <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder='Password' required/>
          <button disabled={load} type='submit' >LogIn</button>
          <h4>or</h4>
          <Link to={"/register"}>Sign Up</Link>
        </form>
      </section>
    </div>
  )
}

export default Login