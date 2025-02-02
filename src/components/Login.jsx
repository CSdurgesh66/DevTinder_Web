import axios from 'axios'
import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { addUser } from '../utils/userSlice';
import { toast } from 'react-toastify';

const Login = () => {

    const [email, setEmail] = React.useState('durgesh@gmail.com');
    const [password, setPassword] = React.useState('Durgesh@141');

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleLogin = async () => {
        event.preventDefault();
        try {
            const res = await axios.post(`http://localhost:3000/login`,{
                email,
                password,
            },
                { withCredentials: true }
            );

            
            // console.log(res.data);

            toast.success("Login successfully");
            dispatch(addUser(res.data));
            return navigate("/feed");

        } catch (err) {
            toast.error("Invalid Credentials");
            console.log(err);
        }
    }

    return (
        <div>

            {/* <div className='flex  justify-center mt-20 scale-110'>

                <div className="card bg-base-300 w-96 shadow-xl ">
                    <div className="card-body">

                        <h2 className="card-title text-2xl justify-center">Login</h2>

                        <label className="form-control w-full max-w-xs">
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

            </div> */}

            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form className="card-body" onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered"  value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text" >Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered"  
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}/>  
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary" type="submit">Login</button>
                            </div>
                        </form>
                        <Link to="/signup">
                            <div className='flex justify-center text-lg'>
                                New User? Sign up Here
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>



    )
}

export default Login