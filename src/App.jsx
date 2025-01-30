import Navbar from "./components/Navbar"
import { Routes,Route, BrowserRouter } from "react-router-dom"
import Login from "./components/Login"
import SignUp from "./components/SignUp"

function App() {

  return (
    <>
   <div className=" ">
   
    <Navbar/>

    <Routes>
    <Route path="/" element={<div>base page</div>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>

   

   </div>
    </>
  )
}

export default App
