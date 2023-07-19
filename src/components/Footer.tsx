import React from 'react'
import logo from '../images/logo.png'
import Image from 'next/image'
const Footer = () => {
  return (
    <div className='bg-amazon_light w-full h-20 text-gray-300 flex items-center justify-center gap-4'>
        <Image className='w-24 ' src={logo} alt='logo'/>
        <p className='text-sm -mt-4'>All rights reserved <a 
       className='hover:text-white hover:underline decoration-[1px] cursor-pointer duration-300' href='https://bidhan-chandra-roy-portfolio.netlify.app/' target='_blank'>@bidhanroy</a></p>
    </div>
  )
}

export default Footer