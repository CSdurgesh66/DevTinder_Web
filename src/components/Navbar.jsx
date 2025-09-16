import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { removeUser } from '../utils/userSlice';
import { addFeed, removeFeed } from '../utils/feedSlice';
import { toast } from 'react-toastify';
import { Code, Heart } from 'lucide-react'
import { BASE_URL } from '../utils/constants'

const Navbar = () => {

  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutHandle = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {},
        { withCredentials: true });

      toast.success("Logout Successfully");
      dispatch(removeUser());
      dispatch(removeFeed());
      dispatch(addFeed(null))
      
      window.location.replace("/login");

    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div>
      <div className=' bg-white'>
        <nav className='fixed top-0 w-full bg-white/80 backdrop-blur-lg
        border-b border-gray-100 z-50 ' >
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 '>
            <div className='flex justify-between items-center h-16 '>

              <Link to='/feed'>
                <div className='flex items-center gap-2'>
                  <Code className='w-8 h-8 text-purple-600' />
                  <span className='text-2xl font-bold bg-gradient-to-r from-purple-600
                        to-pink-600 bg-clip-text text-transparent'>
                    DevTinder
                  </span>
                  <Heart className='w-6 h-6 text-pink-500 fill-current' />
                </div>
              </Link>

              <div>
                {user ? (
                  <div>

                    <div className='w-1/2 justify-center '>
                      {user && (
                        <div className=" gap-2 flex  w-1/2 justify-center flex-row">
                          <div className=' text-[16px] font-mono items-center font-bold bg-gradient-to-r from-purple-600
                        to-pink-600 bg-clip-text text-transparent'>Welcome, {user.firstName}</div>
                          <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                              <div className="w-10 rounded-full">
                                <img
                                  alt="user profile"
                                  src={user.photoUrl} />
                              </div>


                            </div>
                            <ul
                              tabIndex={0}
                              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                              <li>
                                <Link to='/profile' className="justify-between">
                                  Profile
                                </Link>
                              </li>
                              <li>
                                <Link to='/connection' className="justify-between">
                                  Connections
                                </Link>
                              </li>
                              <li>
                                <Link to='/request' className="justify-between">
                                  Requets
                                </Link>
                              </li>
                              <li onClick={logOutHandle}><a> Logout </a></li>
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className='flex items-center gap-4'>
                      <Link
                        to="/login"
                        className="px-6 py-2 text-purple-600 hover:text-purple-700 font-semibold transition-colors"
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/signup"
                        className='px-6 py-2 bg-gradient-to-r from-purple-600
                        to-pink-600 text-white rounded-full hover:from-purple-700
                        hover:to-pink-700 transition-all duration-200 font-semibold
                        shadow-lg hover:shadow-xl'
                      >
                        Join Now
                      </Link>
                    </div>
                  </div>
                )

                }
              </div>

            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Navbar