import React from 'react'
import { Code, Heart } from 'lucide-react'

const Footer = () => {
  return (
    <div>
      <footer className='bg-gray-900 text-white py-12'>
        <div className=' max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <div className='flex items-center gap-2 mb-4 md:mb-0'>
              <Code className='w-8 h-8 text-purple-400' />
              <span className='text-2xl font-bold'>DevTinder</span>
              <Heart className='w-6 h-6 text-pink-400 fill-current' />
            </div>
            <div className='text-gray-400'>
              © 2025 DevTinder. Made with ❤️ for developers.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer