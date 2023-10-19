import React from 'react'

const Button = ({text,className}) => {
  return (
    <button className={`${className} bg-transparent ring ring-primary text-primary text-xl font-nunito font-bold py-2 px-7 hover:bg-primary hover:text-white`}>{text}</button>
  )
}

export default Button