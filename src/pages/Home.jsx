import axios from 'axios'
import React, { useContext, useState, useEffect } from 'react'
import { Context, server } from '../main'
import toast from 'react-hot-toast'
import { Navigate } from 'react-router-dom'
import Tasks from '../components/Tasks'

const Home = () => {

  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [tasks, setTasks] = useState([])
  const [load, setload] = useState(false)
  const [ref, setref] = useState(false)
  
  const {isAuth,user} = useContext(Context)

  const uphandle= async(id)=>{
    try {
      const {data} = await axios.put(`${server}/task/${id}`,{},{
        withCredentials : true
      })
      toast.success(data.message);
      setref(prev => !prev)
    } catch (error) {
      toast.error(error.data.response.message)
    }
    
  }
  const delhandle= async(id)=>{
    try {
      const {data} = await axios.delete(`${server}/task/${id}`,{
        withCredentials : true
      })
      toast.success(data.message);
      setref(prev => !prev)
    } catch (error) {
      toast.error(error.data.response.message)
    }
  }

  const SubHandle = async(e)=>{
    e.preventDefault();

    try {
      setload(true)
      const {data} = await axios.post(`${server}/task/new`,{
          title, desc
      },{
        headers : {
          "Content-Type" : "application/json",
        },
        withCredentials : true
      })

      setTitle("")
      setDesc("")
      toast.success(data.message)
      setload(false)
      setref(prev => !prev)
    } catch (error) {
      //console.log(error.response.data.message)
      toast.error("Some error")
      setload(false)
    }

  }

  useEffect(() => {
    axios.get(`${server}/task/my`,{
      withCredentials : true,
    }).then((res)=>{
      setTasks(res.data.tasks)
    }).catch((err)=>{
      console.log(err.response.data.message)
    })
  },[ref])
  
  if(!isAuth)
        return <Navigate to={"/login"}/>

  return (
    <div className="container">
        <div className='login'>
          <section>
            <form onSubmit={SubHandle}>
              <input value={title} onChange={(e)=>{setTitle(e.target.value)}} type="text" placeholder='Tite' required/>
              <input value={desc} onChange={(e)=>{setDesc(e.target.value)}} type="text" placeholder='Description' required/>
              <button disabled={load} type='submit'>ADD</button>
            </form>
          </section>
        </div>
        <section className="todosContainer">
          {
            tasks.map((i)=>(
              <Tasks title={i.title} desc={i.desc} iscomp = {i.isComp} uphandle= {uphandle} delhandle={delhandle} id={i._id} />            
            ))
          }
        </section>
    </div>
  )
}

export default Home