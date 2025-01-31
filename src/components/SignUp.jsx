import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
    return (
         <div className='flex  justify-center mt-20 scale-110'>
 
             <div className="card bg-base-300 w-96 shadow-xl ">
                 <div className="card-body">
 
                     <h2 className="card-title text-2xl justify-center">Sign Up</h2>
 
                     <label className="form-control w-full max-w-xs ">
                         <div className="label">
                             <span className="label-text text-lg">First Name</span>
                         </div>
                         <input type="text" placeholder="" className="input input-bordered w-full max-w-xs" />
                    
                         <div className="label mt-2">
                             <span className="label-text text-lg">Last Name</span>
                         </div>
                         <input type="text" placeholder="" className="input input-bordered w-full max-w-xs" />

                         <div className="label mt-2">
                             <span className="label-text text-lg">Email</span>
                         </div>
                         <input type="text" placeholder="" className="input input-bordered w-full max-w-xs" />

                         <div className="label mt-2">
                             <span className="label-text text-lg">Passwod</span>
                         </div>
                         <input type="text" placeholder="" className="input input-bordered w-full max-w-xs" />
                     </label>
 
                     <div className="card-actions justify-center mt-4">
                         <button className="btn btn-primary">Sign up</button>
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