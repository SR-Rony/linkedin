import React from 'react'
import { twMerge } from 'tailwind-merge'

const Images = ({src,className,onClick}) => {
  return (
    <img onClick={onClick} className={twMerge("className w-full object-cover cursor-pointer",className)} src={src} alt="img" />
  )
}

export default Images