import React from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'

const Profile = () => {

    const userData = useSelector((store) => store.user); 

  return (
    <div className='flex justify-center'>
        <EditProfile data ={userData}></EditProfile>
    </div>
  )
}

export default Profile