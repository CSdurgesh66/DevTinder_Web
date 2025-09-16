import React, { useState } from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'

const Profile = () => {

  const userData = useSelector((store) => store.user);
  
  if (!userData) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-center text-base-content/70 px-4">
        <p className="text-lg font-medium">
          You need to log in to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50'>
      <EditProfile data={userData}></EditProfile>
    </div>
  )
}

export default Profile