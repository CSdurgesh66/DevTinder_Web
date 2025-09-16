import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import Card from './Card';
import { BASE_URL } from '../utils/constants'

const EditProfile = ({ data }) => {

  const [firstName, setFirstName] = useState(data?.firstName);
  const [lastName, setLastName] = useState(data?.lastName);
  const [photoUrl, setPhotoUrl] = useState(data?.photoUrl);
  const [age, setAge] = useState(data?.age);
  const [gender, setGender] = useState(data?.gender);
  const [about, setAbout] = useState(data?.about);
  const [skills, setSkills] = useState(data?.skills);

  const dispatch = useDispatch();

  const updateHandle = async () => {

    try {

      const res = await axios.patch(BASE_URL + "/updateprofile",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
          skills
        },
        { withCredentials: true },
      )
      dispatch(addUser(res?.data?.data));
      toast.success("update successfully");
      // setAbout("");

    } catch (error) {
      toast.error("Not updated");
      console.log(error);
    }
  }
//  useEffect(() =>{

//  },[])

  return (
    <>
      <div className="min-h-screen pt-24 pb-10 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-base-content flex flex-col md:flex-row justify-center items-start gap-10">
        {/* Edit Profile Form */}
        <div className="bg-base-200 border border-base-300 rounded-xl shadow-lg p-8 w-full max-w-md h-full flex flex-col justify-between">
          <h2 className="text-2xl font-bold mb-6 text-primary text-center">
            Edit Your Profile
          </h2>
          <div className="space-y-4">
            {/* First Name */}
            <div>
              <label className="label-text">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstname(e.target.value)}
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="label-text">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
              />
            </div>

            {/* Age */}
            <div>
              <label className="label-text">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
              />
            </div>

            {/* Photo URL */}
            <div>
              <label className="label-text">Photo URL</label>
              <input
                type="text"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="label-text">Gender</label>
              <div className="dropdown w-full">
                <label tabIndex={0} className="btn w-full">
                  {gender || "Select Gender"}
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box w-full p-2 mt-2 shadow"
                >
                  <li>
                    <button onClick={() => setGender("Male")}>Male</button>
                  </li>
                  <li>
                    <button onClick={() => setGender("Female")}>Female</button>
                  </li>
                  <li>
                    <button onClick={() => setGender("Others")}>Others</button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Skills */}
            <div>
              <label className="label-text">Skills</label>
              <input
                type="text"
                value={skills?.join(", ")}
                onChange={(e) =>
                  setSkills(e.target.value.split(",").map((s) => s.trim()))
                }
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="text-xs text-base-content/60 mt-1">
                Separate multiple skills with commas
              </p>
            </div>

            {/* About */}
            <div>
              <label className="label-text">About</label>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Tell us about yourself..."
                className="textarea textarea-bordered w-full p-3 focus:outline-none focus:ring-2 focus:ring-primary transition"
              />
            </div>

            {/* update Button */}
            <button onClick={updateHandle} className="btn btn-primary w-full">
              Save Profile
            </button>
          </div>
        </div>

        {/* Live Preview */}
        <div className="hidden md:block">
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
            <h2 className="text-2xl font-bold text-gray-900 text-balance">{firstName} {lastName}</h2>
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
        </div>
        </div>
        </div>
      </div>

    </>
  )
}
export default EditProfile