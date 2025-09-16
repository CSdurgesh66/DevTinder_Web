import Navbar from "./components/Navbar"
import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import Feed from "./components/Feed"
import Profile from "./components/Profile"
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios"
import { addUser } from "./utils/userSlice"
import { useEffect } from "react"
import Connections from "./components/Connections"
import Requests from "./components/Requests"
import { Loader } from 'lucide-react';

import HomePage from "./components/HomePage"
import PageNotFound from "./components/pageNotFound"
import Chat from "./components/Chat"
import { BASE_URL } from "./utils/constants"

function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const UserData = useSelector((store) => store.user);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(BASE_URL + "/profile/view", {
          withCredentials: true,
        }
        );
        dispatch(addUser(res?.data?.data));

      } catch (error) {
        if (error.status === 401) {
          navigate("/");
        }
        console.log(error);
      }
    }
    fetchUser();
  }, [dispatch]);

  return (
    <>
      <div className=" ">

        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/connection" element={<Connections />} />
          <Route path="/request" element={<Requests />} />
          <Route path="/chat/:targetUserId" element={<Chat />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>


      </div>
    </>
  )
}

export default App
