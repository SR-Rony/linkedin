import React from 'react'

const Images = ({src,className}) => {
  return (
    <img className={`${className} w-full object-cover`} src={src} alt="img" />
  )
}

export default Images