import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../Slices/ConnectionSlice';
import './Style.css';
import { Link } from 'react-router-dom';
import { LuMessageCircleMore } from "react-icons/lu";
import { BASE_URL } from '../utils/constants'

const Connections = () => {

  const dispatch = useDispatch();
  const connectionData = useSelector((store) => store.connection)

  const allConnections = async () => {
    try {

      const res = await axios.get(BASE_URL + "/user/connections",
        { withCredentials: true }
      )

      dispatch(addConnections(res.data.data));

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    allConnections();
  }, [])

  if (!connectionData) return (
    <div className='flex justify-center items-center h-screen relative'>
      <div class="spinner "></div>
      <p className='absolute  text-xl'>loading</p>

    </div>
  )

  if (connectionData.length === 0) return <h1 className='flex justify-center font-semibold mt-20 text-2xl'>No connection here</h1>

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 mt-16">
      <div className="pt-8 pb-6">
        <h1 className="text-center text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-2">
          Connections
        </h1>
        <p className="text-center text-gray-600 text-lg">Your network of amazing people</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-8">
        <div className="space-y-4">
          {connectionData.map((data) => {
            const { _id, photoUrl, firstName, lastName, age, about, skills } = data
            return (
              <div
                key={_id}
                className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 hover:scale-[1.02] group"
              >
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 p-0.5">
                      <img
                        className="w-full h-full rounded-full object-cover border-2 border-white"
                        src={photoUrl || "/placeholder.svg"}
                        alt={`${firstName} ${lastName}`}
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <h2 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                      {firstName} {lastName}
                    </h2>
                    <p className="text-sm font-medium text-gray-500 bg-gray-100 rounded-full px-3 py-1 inline-block">
                      {age && <div>Age {age}</div>}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{about}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {skills.map((skill, index) => (
                        <span
                          key={skill}
                          className={`px-3 py-1 rounded-full text-xs font-medium text-white ${index % 3 === 0
                            ? "bg-gradient-to-r from-purple-500 to-purple-600"
                            : index % 3 === 1
                              ? "bg-gradient-to-r from-pink-500 to-pink-600"
                              : "bg-gradient-to-r from-blue-500 to-blue-600"
                            }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link to={"/chat/" + _id}>
                    <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group-hover:scale-105">
                      Message
                      <LuMessageCircleMore className="w-5 h-5" />
                    </button>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Connections