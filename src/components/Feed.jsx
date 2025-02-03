import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { addFeed } from '../utils/feedSlice';
import Card from './Card';
import  './Style.css';
import { useNavigate } from 'react-router-dom';


const Feed = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const feed = useSelector((store) => store.feed);
  console.log("feed data is ",feed);
  // console.log(typeof(feed));


  const getFeed = async() =>{

    try{
      const res = await axios.get("http://localhost:3000/user/feed",
      {withCredentials:true}
    );

    dispatch(addFeed(res.data.data));
    

    }catch(error){
      console.log(error);
    }
  };

  useEffect(() =>{
    getFeed();
  },[]);
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     navigate("/login"); // Redirect to login if no token
  //   } else {
  //     getFeed();
  //   }
  // }, []);

  if(!feed )return (
    <div className='flex justify-center items-center h-screen relative'>
      <div className="spinner "></div>
      <p className='absolute  text-xl'>loading</p>

    </div>
  )

  if(feed.length==0) return <h1 className='text-2xl flex justify-center mt-10'>NO More User Are Availabe</h1>

  return (
    feed && (
      <div className='flex justify-center my-10 '>
      <Card data={feed[0]}></Card>

    </div>
  )
   
  )
}

export default Feed