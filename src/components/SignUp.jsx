import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { addUser } from '../utils/userSlice';

const SignUp = () => {

    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleclick = async() => {

        try{
          const res = await axios.post("http://localhost:3000/signup",
            {
                firstName,
                lastName,
                email,
                password
            },
            {withCredentials:true},
        );

        console.log("signUp data is here ",res.data);
        dispatch(addUser(res.data))
       return  navigate('/profile');

        }catch(error){
            console.log(error);

        }
    }



    return (
         <div className='flex  justify-center mt-20 scale-110'>
 
             <div className="card bg-base-300 w-96 shadow-xl ">
                 <div className="card-body">
 
                     <h2 className="card-title text-2xl justify-center">Sign Up</h2>
 
                     <label className="form-control w-full max-w-xs ">
                         <div className="label">
                             <span className="label-text text-lg">First Name</span>
                         </div>
                         <input type="text" placeholder="" className="input input-bordered w-full max-w-xs"
                         value={firstName}
                         onChange={(e) => setfirstName(e.target.value)}/>
                    
                         <div className="label mt-2">
                             <span className="label-text text-lg">Last Name</span>
                         </div>
                         <input type="text" placeholder="" className="input input-bordered w-full max-w-xs" 
                           value={lastName}
                           onChange={(e) => setlastName(e.target.value)}/>

                         <div className="label mt-2">
                             <span className="label-text text-lg">Email</span>
                         </div>
                         <input type="text" placeholder="" className="input input-bordered w-full max-w-xs" 
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}/>

                         <div className="label mt-2">
                             <span className="label-text text-lg">Passwod</span>
                         </div>
                         <input type="text" placeholder="" className="input input-bordered w-full max-w-xs" 
                         value={password}
                         onChange={(e) => setPassword(e.target.value)}/>
                     </label>
 
                     <div className="card-actions justify-center mt-4">
                         <button className="btn btn-primary" onClick={handleclick}>Sign up</button>
                     </div>


                     <Link to="/login">
                     <div className='flex justify-center text-lg'>
                     Existing User? Login Here
                     </div>
                     </Link>
                 </div>
             </div>
 
         </div>
     )
}

export default SignUp