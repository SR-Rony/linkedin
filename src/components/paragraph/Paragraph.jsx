import React from 'react'
import { Link } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

const Paragraph = ({text,className,link,path}) => {
  return (
    <p className={ twMerge("font-semibold font-nunito text-xl text-gray-300",className)}>{text}<Link className='text-primary' to={path}>{link}</Link></p>
  )
}

export default Paragraph