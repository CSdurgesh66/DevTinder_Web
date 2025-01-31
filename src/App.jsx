import Navbar from "./components/Navbar"
import { Routes,Route, BrowserRouter, useNavigate } from "react-router-dom"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import Feed from "./components/Feed"
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios"
import { addUser } from "./utils/userSlice"
import { useEffect } from "react"

function App() {

 const dispatch = useDispatch();
 const navigate = useNavigate();

 const fetchUser = async() =>{
  try{

    const res = await axios.get("http://localhost:3000/profile/view",{
      withCredentials:true,
    }
  );

  dispatch(addUser(res.data));

  }catch(error){
    console.log(error);
    navigate("login");
  }
 }

 useEffect(() => {
  fetchUser();
 },[]);

  return (
    <>
   <div className=" ">
   
    <Navbar/>

    <Routes>
    <Route path="/" element={<div>base page</div>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/feed" element={<Feed/>} />
    </Routes>

   

   </div>
    </>
  )
}

export default App
