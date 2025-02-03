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

            <div>
            <div>
                <footer className="footer bg-neutral text-neutral-content grid-rows-2 p-10">
                    <nav>
                        <h6 className="footer-title">Services</h6>
                        <a className="link link-hover">Branding</a>
                        <a className="link link-hover">Design</a>
                        <a className="link link-hover">Marketing</a>
                        <a className="link link-hover">Advertisement</a>
                    </nav>
                    <nav>
                        <h6 className="footer-title">Company</h6>
                        <a className="link link-hover">About us</a>
                        <a className="link link-hover">Contact</a>
                        <a className="link link-hover">Jobs</a>
                        <a className="link link-hover">Press kit</a>
                    </nav>
                    <nav>
                        <h6 className="footer-title">Legal</h6>
                        <a className="link link-hover">Terms of use</a>
                        <a className="link link-hover">Privacy policy</a>
                        <a className="link link-hover">Cookie policy</a>
                    </nav>
                    <nav>
                        <h6 className="footer-title">Social</h6>
                        <a className="link link-hover">Twitter</a>
                        <a className="link link-hover">Instagram</a>
                        <a className="link link-hover">Facebook</a>
                        <a className="link link-hover">GitHub</a>
                    </nav>
                    <nav>
                        <h6 className="footer-title">Explore</h6>
                        <a className="link link-hover">Features</a>
                        <a className="link link-hover">Enterprise</a>
                        <a className="link link-hover">Security</a>
                        <a className="link link-hover">Pricing</a>
                    </nav>
                    <nav>
                        <h6 className="footer-title">Apps</h6>
                        <a className="link link-hover">Mac</a>
                        <a className="link link-hover">Windows</a>
                        <a className="link link-hover">iPhone</a>
                        <a className="link link-hover">Android</a>
                    </nav>
                </footer>
            </div>
            </div>
        </div>



    )
}

export default Login