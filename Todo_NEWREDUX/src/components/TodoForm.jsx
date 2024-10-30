import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, selectInput, setInput } from '../redux/slices/todoSlice';

function TodoForm() {
    const input = useSelector(selectInput);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addTask());
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white border border-gray-300 rounded-lg shadow-md p-6 max-w-md mx-auto transition-transform duration-300 hover:scale-105">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Add a New Task</h2>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Enter task name..."
                    className="w-full h-12 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                    value={input}
                    onChange={(e) => dispatch(setInput(e.target.value))}
                />
            </div>
            <button
                type="submit"
                className="w-full h-12 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Add
            </button>
        </form>
    );
}

export default TodoForm;
