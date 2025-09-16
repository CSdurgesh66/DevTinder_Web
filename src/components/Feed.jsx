import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { addFeed } from '../utils/feedSlice';
import Card from './Card';
import './Style.css';
import { useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react';
import { BASE_URL } from '../utils/constants'


const Feed = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {

    try {
      const res = await axios.get(BASE_URL + "/user/feed",
        { withCredentials: true }
      );

      dispatch(addFeed(res.data.data));

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);

  if (!feed)
    return (
      <div className='min-h-screen bg-gradient-to-br from-purple-50 mb-36 
      via-pink-50 to-indigo-50 flex items-center justify-center'>
        <div className='text-center'>
          <Loader className='w-12 h-12 text-purple-600 animate-spin mx-auto mb-4' />
          <p className='text-gray-600 text-lg'>Finding amazing developers for you...</p>
        </div>
      </div>
    )

  if (feed.length == 0) return <h1 className='text-2xl flex items-center justify-center mt-60'>NO More User Are Availabe</h1>

  return (
    feed && (
      <div className='flex justify-center my-10 mt-20'>
        <Card data={feed[0]}></Card>

      </div>
    )
  )
}

export default Feed