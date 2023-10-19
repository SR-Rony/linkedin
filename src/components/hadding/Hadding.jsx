import React from 'react'

const Hadding = ({text,className,span}) => {
  return (
    <h3 className={`${className} font-nunito font-bold text-3xl`}>{text}<span className='text-primary'>{span}</span></h3>
  )
}

export default Hadding