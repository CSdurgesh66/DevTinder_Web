import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../Slices/ConnectionSlice';
import  './Style.css';
import { Link } from 'react-router-dom';
import { LuMessageCircleMore } from "react-icons/lu";

const Connections = () => {

  const dispatch = useDispatch();
  const connectionData = useSelector((store) => store.connection)

  const allConnections = async () => {
    try {

      const res = await axios.get("http://localhost:3000/user/connections",
        { withCredentials: true }
      )

      dispatch(addConnections(res.data.data));
      console.log(res.data.data);


    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    allConnections();
  }, [])

  if(!connectionData) return (
    <div className='flex justify-center items-center h-screen relative'>
      <div class="spinner "></div>
      <p className='absolute  text-xl'>loading</p>

    </div>
  )

  if(connectionData.length===0) return <h1 className='flex justify-center font-semibold mt-10 text-2xl'>No connection here</h1>


  return (
    <div>

<h1 className='flex justify-center text-4xl font-semibold mt-8 mb-5'>Connections</h1>

      <div className="flex w-full flex-col">
        {connectionData.map(data=> {
          const {_id, photoUrl, firstName, lastName,age,about,skills} = data;
          return (
            <div key={_id} className="  bg-base-300  place-items-center my-1 flex flex-row gap-3 h-32 w-[60%] mx-auto">
              <div className='ml-10'>
               <img className='flex rounded-full mx-10' src={photoUrl} height='80px' width="80px" />
              </div>

              <div className='flex flex-col'>
                <h1 className='font-semibold'>{firstName} {lastName}</h1>
               <p>{age}</p>
               <p>{about}</p>
               <p>{skills.map(data =>{
                return (
                  <span key={data}>{data} </span>
                )
               })}</p>
              </div>

              <Link to={'/chat/'+_id}>
              <button className='btn btn-primary'>Message
              <LuMessageCircleMore/>
              </button>
              </Link>

            </div>
          )
        })}

      </div>

    </div>
  )
}

export default Connections