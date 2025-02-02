import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({data}) => {
    // console.log("login user data",data.user);

    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [photoUrl,setPhotoUrl] = useState("");
    const [age,setAge] = useState("");
    const [gender,setGender] = useState("");
    const [about,setAbout] = useState("");
    // const [about,setAbout] = useState("");

    const dispatch = useDispatch();

    const updateHandle = async() =>{

        try{

            const res = await axios.patch("http://localhost:3000/updateprofile",
                {
                    firstName,
                    lastName,
                    photoUrl,
                    age,
                    gender,
                    about,
                },
                {withCredentials:true},
            )
            dispatch(addUser(res?.data?.data));
            toast.success("update successfully");
            setAbout("");

        }catch(error){
            toast.error("Not updated");
            console.log(error);
        }
    }


  return (
    <div>
         <div className="card bg-base-300 w-96 shadow-xl ">
                         <div className="card-body">
         
                             <h2 className="card-title text-2xl justify-center">Edit Profile</h2>
         
                             <label className="form-control w-full max-w-xs ">
                                 <div className="label">
                                     <span className="label-text text-lg">First Name</span>
                                 </div>
                                 <input type="text" placeholder="" value={firstName} className="input input-bordered w-full max-w-xs"
                                 onChange={(e) => setFirstName(e.target.value)}  />
                            
                                 <div className="label mt-2">
                                     <span className="label-text text-lg">Last Name</span>
                                 </div>
                                 <input type="text" placeholder="" value={lastName} className="input input-bordered w-full max-w-xs"
                                 onChange={(e) => setLastName(e.target.value)}  />

                                 <div className="label mt-2">
                                     <span className="label-text text-lg">Photo URL</span>
                                 </div>
                                 <input type="text" placeholder="" value={photoUrl} className="input input-bordered w-full max-w-xs" 
                                 onChange={(e) => setPhotoUrl(e.target.value)} />

                                 <div className="label mt-2">
                                     <span className="label-text text-lg">Age</span>
                                 </div>
                                 <input type="text" placeholder="" value={age} className="input input-bordered w-full max-w-xs" 
                                 onChange={(e) => setAge(e.target.value)} />

                                 <div className="label mt-2">
                                     <span className="label-text text-lg">Gender</span>
                                 </div>
                                 <input type="text" placeholder="" value={gender} className="input input-bordered w-full max-w-xs" 
                                 onChange={(e) => setGender(e.target.value)} />
        
        
        
                                 <div className="label mt-2">
                                     <span className="label-text text-lg">About</span>
                                 </div>
                                 <input type="text" placeholder="" value={about} className="input input-bordered w-full max-w-xs" onChange={(e) => setAbout(e.target.value)} />
        
                             </label>
         
                             <div className="card-actions justify-center mt-4">
                                 <button className="btn btn-primary" onClick={updateHandle}>Update</button>
                             </div>
                         </div>
                     </div>
    </div>
  )
}

export default EditProfile