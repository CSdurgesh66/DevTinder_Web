import React from 'react'
import { useSelector } from 'react-redux'

const Navbar = () => {

  const user = useSelector((store) => store.user);
  console.log(user);


  return (
    <div className="navbar bg-neutral flex flex-row justify-center ">
      <div className="flex-1  w-1/2 justify-center">
        <a className="btn btn-ghost text-xl text-white ">DevTinder</a>
      </div>
     
      <div className='w-1/2 justify-center '>
      {user && (
         <div className=" gap-2 flex  w-1/2 justify-center flex-row">
         {/* <div className="form-control">
           <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
         </div> */}
          <div className='text-white text-[16px] font-mono mt-3 items-center'>Welcome, {user.user.firstName}</div>
         <div className="dropdown dropdown-end">
           <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
             <div className="w-10 rounded-full">
               <img
                 alt="Tailwind CSS Navbar component"
                 src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
             </div>
           </div>
           <ul
             tabIndex={0}
             className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
             <li>
               <a className="justify-between">
                 Profile
               </a>
             </li>
             <li><a>Settings</a></li>
             <li><a>Logout</a></li>
           </ul>
         </div>
       </div>
      )}
      </div>
     
     
    </div>
  )
}

export default Navbar