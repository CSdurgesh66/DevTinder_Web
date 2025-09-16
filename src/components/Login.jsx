import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Heart, Code, Zap } from 'lucide-react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addUser } from '../utils/userSlice';
import { toast } from 'react-toastify';
import { BASE_URL } from '../utils/constants'

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            if (validateForm()) {

                const res = await axios.post(BASE_URL + `/login`, {
                    email: formData.email,
                    password: formData.password,
                },
                    { withCredentials: true }
                );
                toast.success("Login successfully");
                dispatch(addUser(res.data?.data));
                return navigate("/feed");
            }


        } catch (error) {
            toast.error("Invalid Credentials");
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 flex items-center justify-center px-4 py-8 relative overflow-hidden mt-16">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-300 to-purple-400 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-300 to-blue-400 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-10 blur-3xl"></div>
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Hero Image Section */}
                <div className="text-center mb-8">
                    <div className="relative inline-block">
                        <img
                            src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400"
                            alt="Developers collaborating"
                            className="w-32 h-32 rounded-full object-cover mx-auto shadow-2xl border-4 border-white"
                        />
                        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-red-500 rounded-full p-2 shadow-lg">
                            <Heart className="w-6 h-6 text-white fill-current animate-pulse" />
                        </div>
                    </div>
                </div>

                <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Code className="w-8 h-8 text-purple-600" />
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                DevTinder
                            </h1>
                            <Heart className="w-8 h-8 text-pink-500 fill-current" />
                        </div>
                        <p className="text-gray-600 text-lg">Find your perfect coding partner</p>
                        <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                                <Zap className="w-4 h-4 text-yellow-500" />
                                <span>Fast Matching</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Code className="w-4 h-4 text-blue-500" />
                                <span>Dev Focused</span>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-purple-400" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white/50 backdrop-blur-sm ${errors.email ? 'border-red-300 bg-red-50/50' : 'border-gray-200 hover:border-purple-300'
                                        }`}
                                    placeholder="your.email@example.com"
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                    <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center text-xs">!</span>
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-purple-400" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full pl-12 pr-12 py-4 border-2 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white/50 backdrop-blur-sm ${errors.password ? 'border-red-300 bg-red-50/50' : 'border-gray-200 hover:border-purple-300'
                                        }`}
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-purple-50 rounded-r-xl transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-purple-400 hover:text-purple-600" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-purple-400 hover:text-purple-600" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                    <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center text-xs">!</span>
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 font-medium">
                                    Remember me
                                </label>
                            </div>
                            <button
                                type="button"
                                className="text-sm text-purple-600 hover:text-purple-500 transition-colors font-semibold"
                            >
                                Forgot password?
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl hover:from-purple-700 hover:to-pink-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            Start Matching 💕
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-500 font-medium">New to DevTinder?</span>
                            </div>
                        </div>
                        <div className="mt-4">
                            <Link
                                to="/signup"
                                className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-500 font-semibold transition-colors text-lg"
                            >
                                Create your profile
                                <Heart className="w-5 h-5 fill-current" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom decorative images */}
                <div className="flex justify-center gap-4 mt-8 opacity-60">
                    <img
                        src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100"
                        alt="Developer 1"
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-lg"
                    />
                    <img
                        src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100"
                        alt="Developer 2"
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-lg"
                    />
                    <img
                        src="https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=100"
                        alt="Developer 3"
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default LoginForm;