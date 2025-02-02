import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest, removeRequest } from '../Slices/RequestSlice';
import { IoMdClose } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";

const Requests = () => {

    const dispatch = useDispatch();
    const requestData = useSelector((store) => store.request);

    const reviewRequest = async(status,_id) =>{
        try{

            const res = await axios.post("http://localhost:3000/request/review/"+status+"/"+_id,
                {},
                {withCredentials:true},
            );
            dispatch(removeRequest(_id));

        }catch(error){
            console.log(error);
        }
    }

    const allRequest = async() =>{
        try{

            const res = await axios.get("http://localhost:3000/user/requests/received",
                {withCredentials:true},
            );
            // connectionRequests
            dispatch(addRequest(res.data.connectionRequests));
            console.log(res.data.connectionRequests)


        }catch(error){
            console.log(error)
        }
    }

 

    useEffect(() =>{
        allRequest()
    },[]);

    if(!requestData) return <p>loading</p>

    if(requestData.length===0) return <h1 className='flex justify-center font-semibold mt-10 text-2xl'>No Request Found</h1>

  return (
    <div>
<h1 className='flex justify-center text-4xl font-semibold mt-8 mb-5'>Requests</h1>
{requestData.map(data =>{
            return(
            <div className=" mx-5 bg-base-300  place-items-center my-1 flex flex-row gap-3 h-32 w-[40%] mx-auto">
                <div className='w-[60%] flex flex-row items-center'>
              <div className='ml-10'>
               <img className='flex rounded-full mx-10' src={data.fromUserId.photoUrl} height='80px' width="80px" />
              </div>

              <div className='flex flex-col text-2xl'>
                <h1 className='font-semibold'>{data.fromUserId.firstName} {data.fromUserId.lastName}</h1>
              </div>

              </div>

              <div className='flex flex-row  gap-10 ml-14 '>
              <button className='text-4xl' onClick={(e) => reviewRequest("rejected",data.fromUserId._id)}>< IoMdClose /></button>
             <button className='text-4xl'onClick={(e) => reviewRequest("accepted",data.fromUserId._id)}> <FaCheck /></button>
              </div>
            </div>
            )
        })}
    </div>
  )
}

export default Requests