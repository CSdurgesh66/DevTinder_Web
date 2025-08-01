import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, Heart, Code, Star, Users } from 'lucide-react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const SignupForm = () => {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First Name is required';
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last Name is required';
        }

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

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            if (validateForm()) {

                console.log("this is form data : ", formData);

                const res = await axios.post("http://localhost:3000/signup",
                    {
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        email: formData.email,
                        password: formData.password,
                    },
                    { withCredentials: true },
                );

                console.log("sign up data is here ", res.data);
                dispatch(addUser(res.data));
                return navigate('/profile');
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center px-4 py-8 relative overflow-hidden mt-16">
            
             {/* Background decorative elements  */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-300 to-purple-400 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-tr from-pink-300 to-red-400 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-200 to-indigo-200 rounded-full opacity-15 blur-3xl"></div>
            </div>

            <div className="w-full max-w-md relative z-10">
               
                {/* Hero Section */}
                <div className="text-center mb-8">
                    <div className="relative inline-block mb-4">
                        <img
                            src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400"
                            alt="Happy developers"
                            className="w-32 h-32 rounded-full object-cover mx-auto shadow-2xl border-4 border-white"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full p-2 shadow-lg">
                            <Star className="w-6 h-6 text-white fill-current" />
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-2 mb-2">
                        <Code className="w-8 h-8 text-indigo-600" />
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            DevTinder
                        </h1>
                        <Heart className="w-8 h-8 text-pink-500 fill-current" />
                    </div>

                    <p className="text-gray-600 text-lg mb-4">Join the developer community</p>

                    <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                            <Users className="w-4 h-4 text-blue-500" />
                            <span>50k+ Devs</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4 text-pink-500 fill-current" />
                            <span>1k+ Matches</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span>4.9 Rating</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Your Profile</h2>
                        <p className="text-gray-600">Start your coding journey together</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                                First Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-indigo-400" />
                                </div>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/50 backdrop-blur-sm ${errors.firstName ? 'border-red-300 bg-red-50/50' : 'border-gray-200 hover:border-indigo-300'
                                        }`}
                                    placeholder="Your awesome name"
                                />
                            </div>
                            {errors.firstName && (
                                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                    <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center text-xs">!</span>
                                    {errors.firstName}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                                Last Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-indigo-400" />
                                </div>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/50 backdrop-blur-sm ${errors.lastName ? 'border-red-300 bg-red-50/50' : 'border-gray-200 hover:border-indigo-300'
                                        }`}
                                    placeholder="Your awesome name"
                                />
                            </div>
                            {errors.lastName && (
                                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                    <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center text-xs">!</span>
                                    {errors.lastName}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-indigo-400" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/50 backdrop-blur-sm ${errors.email ? 'border-red-300 bg-red-50/50' : 'border-gray-200 hover:border-indigo-300'
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
                                    <Lock className="h-5 w-5 text-indigo-400" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full pl-12 pr-12 py-4 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/50 backdrop-blur-sm ${errors.password ? 'border-red-300 bg-red-50/50' : 'border-gray-200 hover:border-indigo-300'
                                        }`}
                                    placeholder="Create a strong password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-indigo-50 rounded-r-xl transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-indigo-400 hover:text-indigo-600" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-indigo-400 hover:text-indigo-600" />
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

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-indigo-400" />
                                </div>
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={`w-full pl-12 pr-12 py-4 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/50 backdrop-blur-sm ${errors.confirmPassword ? 'border-red-300 bg-red-50/50' : 'border-gray-200 hover:border-indigo-300'
                                        }`}
                                    placeholder="Confirm your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-indigo-50 rounded-r-xl transition-colors"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-5 w-5 text-indigo-400 hover:text-indigo-600" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-indigo-400 hover:text-indigo-600" />
                                    )}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                    <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center text-xs">!</span>
                                    {errors.confirmPassword}
                                </p>
                            )}
                        </div>

                        <div className="flex items-start">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
                                required
                            />
                            <label htmlFor="terms" className="ml-3 block text-sm text-gray-700 leading-5">
                                I agree to the{' '}
                                <button type="button" className="text-indigo-600 hover:text-indigo-500 font-semibold">
                                    Terms of Service
                                </button>{' '}
                                and{' '}
                                <button type="button" className="text-indigo-600 hover:text-indigo-500 font-semibold">
                                    Privacy Policy
                                </button>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            Join DevTinder 🚀
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-500 font-medium">Already have an account?</span>
                            </div>
                        </div>
                        <div className="mt-4">
                            <Link
                                to="/login"
                                className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-500 font-semibold transition-colors text-lg"
                            >
                                Sign in here
                                <Code className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Success stories section */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500 mb-4">Join successful developer couples</p>
                    <div className="flex justify-center gap-3">
                        <div className="flex -space-x-2">
                            <img
                                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=60"
                                alt="Success story 1"
                                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
                            />
                            <img
                                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=60"
                                alt="Success story 2"
                                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
                            />
                        </div>
                        <div className="flex -space-x-2">
                            <img
                                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=60"
                                alt="Success story 3"
                                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
                            />
                            <img
                                src="https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=60"
                                alt="Success story 4"
                                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;