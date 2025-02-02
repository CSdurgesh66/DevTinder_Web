import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { addFeed } from '../utils/feedSlice';
import Card from './Card';
const Feed = () => {

  const dispatch = useDispatch();

  const feed = useSelector((store) => store.feed);
  console.log("feed data is ",feed);
  // console.log(typeof(feed));


  const getFeed = async() =>{

    try{
      if(feed) return;
      const res = await axios.get("http://localhost:3000/user/feed",
      {withCredentials:true}
    );

    dispatch(addFeed(res.data));
    

    }catch(error){
      console.log(error);
    }
  };

  useEffect(() =>{
    getFeed();
  },[]);

  return (
    feed && (
      <div className='flex justify-center my-10 '>
      <Card data={feed}></Card>

    </div>
  )
   
  )
}

export default Feed