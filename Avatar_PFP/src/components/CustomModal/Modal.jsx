import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { RxCross1 } from "react-icons/rx";
import { avatarData } from './avatar.data';

const Modal = ({className, modal, handleClose, avatarName, handleSubmit, handleChange}) => {

  return (
    <div className={`modal ${modal} ${className} relative bg-white rounded-md shadow-md w-[400px] h-[240px] flex-col justify-center items-center`}>
        <div className="modal-content">
            <button className="close absolute top-2 right-2" onClick={handleClose}>
            <RxCross1/>
            </button>
            <form onSubmit={handleSubmit}>
                <header className='text-center text-2xl font-bold'>New User</header>
                <div id="formHead" className='flex justify-center items-center mt-4 p-3'>
                    <input type="text" id="avatarName" className='w-full border-2 border-gray-300 rounded-md p-2' name="avatar" placeholder="enter avatar title" value={avatarName} onChange={handleChange} />
                </div>
                <div className='flex justify-evenly items-center gap-3 mt-3 p-3'>
                    <button type="submit" className='bg-green-500 text-white rounded-md w-full text-center p-2'>Confirm</button>
                    <button type="button" onClick={handleClose} className='bg-red-500 text-white rounded-md w-full text-center p-2'>Cancel</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Modal