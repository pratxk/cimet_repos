import React from 'react'
import { RxCross1 } from 'react-icons/rx'

const Avatar = ({ avatar, handleDelete }) => {
    return (
        <div className='relative w-12 h-12 rounded-full flex justify-center items-center text-white text-md' style={{ backgroundColor: avatar.color }}>
            <button className="absolute -top-2 -right-2 flex justify-center items-center rounded-full w-5 h-5 bg-red-600"
            onClick={() => handleDelete(avatar.id)}>
                <RxCross1 className='text-[10px] text-white'/>
            </button>
            <p>{avatar.intialLetter}</p>
        </div>
    )
}

// ... rest of the file remains unchanged

export default Avatar
