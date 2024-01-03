import React, {createContext, useState} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/app.scss'

export const server = "https://todo-nodejs-5dpc.onrender.com/api/v1"

export const Context = createContext({isAuth : false});

const Wrap = () =>{
  const [isAuth, setIsAuth] = useState(false)
  const [load, setload] = useState(false)
  const [user, setUser] = useState({})

  return(
  <Context.Provider value={
    {isAuth, setIsAuth,load, setload,user, setUser}
  }> 
    <App />
  </Context.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Wrap/>
  </React.StrictMode>,
)
