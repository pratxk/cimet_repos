import React from 'react'
import { MdDeleteSweep } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { deleteTask } from '../redux/slices/todoSlice';


function SingleTodo({item}) {
    const dispatch = useDispatch();
  return (
    <>
    <div key={item.id}>
        <h2>{item.title}</h2>
        <div className='flex'>
            <input type="checkbox" />
            <button onClick={()=>dispatch(deleteTask(item.id))} ><MdDeleteSweep/></button>
        </div>
    </div>
    </>
  )
}

export default SingleTodo
