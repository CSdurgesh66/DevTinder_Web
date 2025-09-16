import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest, removeRequest } from '../Slices/RequestSlice';
import { IoMdClose } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import './Style.css';
import { BASE_URL } from '../utils/constants'

const Requests = () => {

  const dispatch = useDispatch();
  const requestData = useSelector((store) => store.request);

  const reviewRequest = async (status, _id) => {
    try {

      const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequest(_id));

    } catch (error) {
      console.log(error);
    }
  }

  const allRequest = async () => {
    try {

      const res = await axios.get(BASE_URL + "/user/requests/received",
        { withCredentials: true },
      );
      dispatch(addRequest(res.data.connectionRequests));

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    allRequest()
  }, []);

  if (!requestData) return (
    <div className='flex justify-center items-center h-screen relative'>
      <div class="spinner "></div>
      <p className='absolute  text-xl'>loading</p>

    </div>
  )

  if (requestData.length === 0) return <h1 className='flex items-center justify-center font-semibold mt-10 text-2xl mt-32'>No Request Found</h1>

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 mt-16">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-slate-800 mb-8">Connection Requests</h1>

        <div className="space-y-4">
          {requestData.map((data) => {
            return (
              <div
                key={data._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-slate-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        className="w-16 h-16 rounded-full object-cover ring-4 ring-pink-100"
                        src={data.fromUserId.photoUrl || "/placeholder.svg"}
                        alt={`${data.fromUserId.firstName} ${data.fromUserId.lastName}`}
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>

                    <div className="flex flex-col">
                      <h2 className="text-xl font-bold text-slate-800">
                        {data.fromUserId.firstName} {data.fromUserId.lastName}
                      </h2>
                      <p className="text-slate-500 text-sm">Wants to connect with you</p>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      className="w-12 h-12 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg hover:shadow-red-200"
                      onClick={(e) => reviewRequest("rejected", data._id)}
                    >
                      <IoMdClose className="text-xl" />
                    </button>
                    <button
                      className="w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg hover:shadow-green-200"
                      onClick={(e) => reviewRequest("accepted", data._id)}
                    >
                      <FaCheck className="text-lg" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
export default Requests