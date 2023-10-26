import React from 'react'
import { Link } from 'react-router-dom'

const Paragraph = ({text,className,link,path}) => {
  return (
    <p className={`${className} font-semibold font-nunito text-xl text-gray-300`}>{text}<Link className='text-primary' to={path}>{link}</Link></p>
  )
}

export default Paragraph