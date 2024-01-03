import React, { useContext } from 'react'
import { Context } from '../main';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from '../components/Loader'

const Profile = () => {

  const {isAuth,load, setload,user}= useContext(Context);

  if(!user){
    return <Navigate to={"/login"} />
  }

  return (
    load ? <Loader/> :
    (<div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
    )
  )
}

export default Profile