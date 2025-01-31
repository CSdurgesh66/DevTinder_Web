import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { addUser } from '../utils/userSlice';

const Login = () => {

    const [email, setEmail] = React.useState('durgesh@gmail.com');
    const [password, setPassword] = React.useState('Durgesh@141');

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleLogin = async() =>{
        try{
          
            const res = await axios.post(`http://localhost:3000/login`,{
                email,
                password,
            },
        {withCredentials:true}
    );
    // console.log(res.data);
    dispatch(addUser(res.data));
    return navigate("/feed");

        }catch(err){
            console.log(err);
        }
    }

    return (
        <div className='flex  justify-center mt-20 scale-110'>

            <div className="card bg-base-300 w-96 shadow-xl ">
                <div className="card-body">

                    <h2 className="card-title text-2xl justify-center">Login</h2>

                    <label className="form-control w-full max-w-xs ">
                        <div className="label">
                            <span className="label-text text-lg">Email{email}</span>
                        </div>
                        <input type="text" placeholder="Enter your email" className="input input-bordered w-full max-w-xs" value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                   
                        <div className="label mt-2">
                            <span className="label-text text-lg">Passwod</span>
                        </div>
                        <input type="text" placeholder="Enter your password" className="input input-bordered w-full max-w-xs" value={password}
                         onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>

                    <div className="card-actions justify-center mt-4">
                        <button className="btn btn-primary" onClick={handleLogin}>login</button>
                    </div>
                    <Link to="/signup">
                    <div className='flex justify-center text-lg'>
                    New User? Sign up Here
                    </div>
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default Login