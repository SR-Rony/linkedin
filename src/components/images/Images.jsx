import React from 'react'

const Images = ({src,className,onClick}) => {
  return (
    <img onClick={onClick} className={`${className} w-full object-cover cursor-pointer`} src={src} alt="img" />
  )
}

export default Images