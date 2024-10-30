import React from 'react'
import { useSelector } from 'react-redux'
import { selectTodos } from '../redux/slices/todoSlice'
import SingleTodo from './SingleTodo';

function TodoList() {
    const todos = useSelector(selectTodos);
  return (
    <>
    {
        todos.map((el)=>(
            <SingleTodo item={el} />
        ))
    }
    </>
  )
}

export default TodoList
