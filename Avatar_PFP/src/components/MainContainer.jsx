import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import React from 'react'
import Modal from './CustomModal/Modal'
import { TiPlus } from "react-icons/ti";
import { avatarData } from './CustomModal/avatar.data';
import Avatar from './Avatar';
import { useEffect } from 'react';


const MainContainer = () => {
    const [modal, setModal] = useState('invisible');
    const [ avatarMainData, setAvatarMainData] = useState([]);
    const [avatar, setAvatar] = useState('');
    const handleChange = (e) => {
        setAvatar(e.target.value);
    }
    const handleModal = () => {
        setModal('visible');
    }
    const handleClose = () => {
        setModal('invisible');
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let newObj = {
            id: Date.now(),
            avatar,
            intialLetter: avatar[0],
            color: createRandomColor()
        }
        avatarData.push(newObj);
        console.log(avatarData);

        handleClose();
    }
    function createRandomColor() {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`
    }

    const handleDelete = (id) => {
        let newAvatarData = avatarMainData.filter((avatar) => avatar.id !== id);
        console.log(newAvatarData);
        setAvatarMainData(newAvatarData);
    }
    
    useEffect(() => {
        setAvatarMainData(avatarData);
    }, [])
    return (
        <>
            <div className='bg-gray-300 w-full h-[600px] m-20 rounded-lg flex justify-evenly items-center relative'>
                <div className='flex justify-center items-center gap-2'>
                    {
                        avatarMainData.map((avatar) => (
                            <Avatar key={avatar.id} avatar={avatar} handleDelete={handleDelete} />
                        ))
                    }
                </div>
                <div className='flex justify-center items-center rounded-full bg-white w-10 h-10 shadow-lg  absolute'>
                    <button onClick={handleModal}><TiPlus /></button>
                </div>
                <Modal className='absolute top-50 left-20' modal={modal} avatarName={avatar} handleClose={handleClose} handleSubmit={handleSubmit} handleChange={handleChange} />
            </div>
        </>
    )
}

export default MainContainer
