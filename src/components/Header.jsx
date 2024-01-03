import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context, server } from '../main'
import toast from 'react-hot-toast';
import axios from 'axios';

const Header = () => {

  const {isAuth,setIsAuth,load,setload}= useContext(Context);

  const LogOutHandle = async(e) =>{
    e.preventDefault();
    setload(true)
    try {
      const {data} = await axios.get(`${server}/user/logout`,{
        withCredentials : true
      });

      toast.success("Logged Out successfully")
      setIsAuth(false)
      setload(false)
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuth(true)
      setload(false);
      console.log(error)
    }
  }

  return (
    <nav className='header'>
      <div>
        <h2>ToDo</h2>
      </div>
      <article>
        <Link to={"/"}>Home</Link>
        <Link to={"/user"}>Profile</Link>
        { !isAuth ?
          <Link to={"/login"}>Login</Link> :

        <button disabled={load} onClick={LogOutHandle} className='btn'>LogOut</button>}
      </article>
    </nav>
  )
}

export default Header