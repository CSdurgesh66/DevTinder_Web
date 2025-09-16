import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { removeRequest } from '../Slices/RequestSlice';
import { removeFeed } from '../utils/feedSlice';
import { BASE_URL } from '../utils/constants'

const Card = ({ data }) => {

  const { _id, firstName, lastName, age, about, photoUrl, gender, skills } = data;

  const dispatch = useDispatch();

  const handleRequestSubmit = async (status, userId) => {
    try {

      const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, { withCredentials: true });

      dispatch(removeFeed(userId));


    } catch (error) {
      console.error(error);
    }
  }

  return (

    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden max-w-sm mx-auto border border-gray-100">

      <div className="relative">

        <div className="aspect-[4/5] overflow-hidden">
          <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            src={photoUrl}
            alt=""
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
      </div>

      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 text-balance">{firstName}</h2>
            {age && <span className="text-lg font-medium text-gray-600">{age}</span>}
          </div>

          {gender && <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{gender}</p>}
        </div>

        {about && <p className="text-gray-700 text-sm leading-relaxed text-pretty line-clamp-3">{about}</p>}

        {skills && skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {skills.slice(0, 4).map((skill, index) => (
              <span
                key={skill}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200"
              >
                {skill}
              </span>
            ))}
            {skills.length > 4 && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                +{skills.length - 4} more
              </span>
            )}
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handleRequestSubmit("ignored", _id)}
          >
            <span className="text-xl font-bold">×</span>
            Pass
          </button>

          <button
            className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handleRequestSubmit("interested", _id)}
          >
            <span className="text-lg">♥</span>
            Interested
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card