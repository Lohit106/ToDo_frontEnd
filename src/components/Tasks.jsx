import React from 'react'

const Tasks = ({title,desc, iscomp, uphandle, delhandle, id}) => {
  return (
    <div className='todo'>
        <div>
            <h4>{title}</h4>
            <p>{desc}</p>
        </div>
        <div>
            <input onChange={()=>uphandle(id)} type="checkbox"  checked={iscomp} />
            <button onClick={()=>delhandle(id)} className='btn'>delete</button>
        </div>
    </div>
    
  )
}

export default Tasks