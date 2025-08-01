import React, { useEffect, useState } from 'react'
import { CheckCircle, Users, Code, Heart, Play, Sparkles, Star, MessageCircle, Github, Coffee, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const HomePage = () => {

    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    const stats = [
        { number: "50k+", label: "Active Developers" },
        { number: "12k+", label: "Successful Matches" },
        { number: "95%", label: "Match Satisfaction" },
        { number: "200+", label: "Countries" },
    ]

    const features = [
        {
            icon: <Code className="w-8 h-8" />,
            title: "Code-Based Matching",
            description: "Match based on programming languages, frameworks, and coding style preferences."
        },
        {
            icon: <Github className="w-8 h-8" />,
            title: "GitHub Integration",
            description: "Showcase your repositories and coding achievements to potential matches."
        },
        {
            icon: <MessageCircle className="w-8 h-8" />,
            title: "Tech Talk Chat",
            description: "Break the ice with coding challenges and technical discussions."
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Developer Community",
            description: "Join a community of passionate developers looking for meaningful connections."
        },
    ];

    const testimonials = [
        {
            name: "Sarah Chen",
            role: "Full Stack Developer",
            image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=150",
            text: "Found my coding soulmate! We built our first app together and now we're building a life together. 💕",
            tech: "React • Node.js"
        },
        {
            name: "Alex Rodriguez",
            role: "DevOps Engineer",
            image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=150",
            text: "DevTinder helped me find someone who understands my passion for clean code and late-night debugging sessions.",
            tech: "Docker • AWS"
        },
        {
            name: "Maya Patel",
            role: "Frontend Developer",
            image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=150",
            text: "Met my partner through DevTinder. We pair program by day and binge Netflix by night. Perfect match!",
            tech: "Vue.js • TypeScript"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);



    return (

        <div className='min-h-screen bg-white'>

            {/* Navigation */}
            

            {/* Hero Section  */}
            <section className='pt-24 pb-16 bg-gradient-to-br from-purple-50 via-pink-50
            to-indigo-50 relative overflow-hidden'>
                <div className='absolute inset-0'>
                    <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-purple-300 to-pink-400 rounded-full opacity-10 blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tr from-indigo-300 to-purple-400 rounded-full opacity-10 blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <Sparkles className="w-6 h-6 text-yellow-500" />
                                <span className='text-purple-600 font-semibold'>The #1 Dating App for Developers</span>
                            </div>

                            <h1 className='text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight'>
                                Find Your
                                <span className='bg-gradient-to-r from-purple-600 to-pink-600 
                                bg-clip-text text-transparent block
                                '>
                                    Perfect Match
                                </span>
                                in Code & Life
                            </h1>

                            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                Connect with fellow developers who share your passion for clean code,
                                innovative solutions, and building amazing things together.
                            </p>


                            <div className='flex flex-col sm:flex-row gap-4 mb-8'>
                                <Link
                                    to='/signup'
                                    className='px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600
                text-white rounded-full hover:from-purple-700 hover:to-pink-700
                transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-lg
                hover:shadow-lg transform hover:-translate-y-1 flex items-center justify-center
                gap-2
                '>
                                    Start Matching
                                    <Heart className='w-5 h-5 fill-current' />
                                </Link>
                                <button className=' px-8 py-4 border-2 border-purple-200 text-purple-600
                rounded-full hover:border-purple-300 hover:bg-purple-50 transition-all
                duration-200 font-semibold text-lg flex items-center justify-center gap-2
                '>
                                    <Play className='w-5 h-5' />
                                    Watch Demo
                                </button>
                            </div>

                            <div className='flex items-center gap-8 text-sm text-gray-500'>
                                <div className='flex items-center gap-2'>
                                    <CheckCircle className='w-5 h-5 text-green-500' />
                                    <span>Free to join</span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span>Verified developers</span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    <span>Privacy focused</span>
                                </div>
                            </div>
                        </div>

                        <div className='relative'>
                            <div className='relative z-10'>
                                <img
                                    src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=600"
                                    alt="Happy developer couple"
                                    className="w-full h-96 object-cover rounded-3xl shadow-2xl"
                                />
                                <div className='absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100'>
                                    <div className='flex items-center gap-3'>
                                        <div className='w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500
                                        rounded-full flex items-center justify-center'>
                                            <Heart className='w-6 h-6 text-white fill-current' />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">New Match!</p>
                                            <p className="text-sm text-gray-500">React Developer nearby</p>

                                        </div>
                                    </div>
                                </div>

                                <div className='absolute -top-6 -right-6 bg-white
                                rounded-2xl p-4 shadow-xl border border-gray-100
                                '>
                                    <div className='flex items-center gap-2'>
                                        <Star className='w-5 h-5 text-yellow-500 fill-current' />
                                        <span className="font-semibold text-gray-900">4.9</span>
                                        <span className="text-sm text-gray-500">Rating</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className='py-16 bg-white'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='grid grid-cols-2 lg:grid-cols-4 gap-8'>
                        {stats.map((stat, index) => (
                            <div key={index} className='text-center'>
                                <div className='text-4xl lg:text-5xl font-bold
                                bg-gradient-to-r from-purple-600 to-pink-600
                                bg-clip-text text-transparent mb-2'>
                                    {stat.number}
                                </div>
                                <div className='text-gray-600 font-medium'>{stat.label}</div>
                            </div>

                        ))}

                    </div>
                </div>
            </section>

            {/* features section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className='text-4xl font-bold text-gray-900 mb-4'>
                            Why Developers Choose DevTinder
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            We understand the developer lifestyle and created features that help you find
                            someone who truly gets your world of code, commits, and caffeine.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className='bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all
                            duration-300 border border-gray-100 hover:border-purple-200 group
                            '>
                                <div className='w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100
                                rounded-2xl flex items-center justify-center mb-6 group-hover:from-purple-200
                                group-hover:to-pink-200 transition-all duration-300
                                '>
                                    <div className='text-purple-600'>
                                        {feature.icon}
                                    </div>
                                </div>
                                <h3 className='text-xl font-bold text-gray-900 mb-4'>{feature.title}</h3>
                                <p className='text-gray-600 leading-relaxed'>{feature.description}</p>
                            </div>
                        ))}

                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className='py-20 bg-gradient-to-br from-purple-600 to-pink-600 text-white 
            relative overflow-hidden
            '>
                <div className=' absolute inset-0'>
                    {/* blur */}
                    <div className='absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl'></div>
                    <div className='absolute bottom-20 right-20 w-80 h-80 bg-white/5 rounded-full  blur-3xl'></div>
                </div>

                <div className='max-w-4xl mx-auto px-4 sm:px-8 relative z-10'>
                    <div className='text-center mb-16'>
                        <h2 className='text-4xl font-bold mb-4'>Success Stories</h2>
                        <p className='text-xl text-purple-100'>
                            Real developers, real connections, real love stories
                        </p>
                    </div>

                    <div className='bg-white/10 backdrop-blur-lg rounded-3xl p-8  border border-white/20'>
                        <div className='text-center'>
                            <img
                                src={testimonials[currentTestimonial].image}
                                alt={testimonials[currentTestimonial].name}
                                className='w-20 h-20 rounded-full object-cover mx-auto mb-6
                            border-4 border-white/30'
                            />
                            <blockquote className='text-2xl font-medium mb-6 leading-relaxed' >
                                "{testimonials[currentTestimonial].text}"
                            </blockquote>

                            <div className='mb-2'>
                                <div className='font-bold text-lg'>{testimonials[currentTestimonial].name}</div>
                                <div className='text-purple-200'>{testimonials[currentTestimonial].role}</div>
                                <div className='text-sm text-purple-300 mt-1'>{testimonials[currentTestimonial].tech}</div>
                            </div>
                        </div>


                        <div className='flex justify-center gap-2 mt-8'>
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentTestimonial(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300
                                     ${index == currentTestimonial ? 'bg-white' : 'bg-white/30'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className='py-20 bg-white'>
                <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
                    <div className='bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl
                    p-12 border border-purple-100
                    '>
                        <Coffee className='w-16 h-16 text-purple-600 mx-auto mb-6' />
                        <h2 className='text-4xl font-bold text-gray-900 mb-6'>
                            Ready to Find Your Coding Companion?
                        </h2>
                        <p className='text-xl text-gray-600 mb-8 max-w-2xl mx-auto'>
                            Join thousands of developers who have found love, friendship, and coding partners through DevTinder. Your perfect match is just a swipe away.
                        </p>
                        <Link
                            to='/signup'
                            className='inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600
                            to-pink-600 text-white rounded-full hover:from-purple-700 hover:to-pink-700
                            transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:translate-y-1
                            '
                        >
                            Start Your Journey
                            <ArrowRight className='w-5 h-5' />
                        </Link>
                    </div>
                </div>
            </section>

            {/* footer */}
            <Footer/>
           

        </div>
    )
}

export default HomePage