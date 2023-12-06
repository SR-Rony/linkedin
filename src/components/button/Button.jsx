import React from 'react'
import { twMerge } from 'tailwind-merge'

const Button = ({text,className,onclick}) => {
  return (
    <button onClick={onclick} className={twMerge(" bg-transparent ring ring-primary text-primary text-xl font-nunito font-bold py-2 px-7 hover:bg-primary hover:text-white" ,className)}>{text}</button>
  )
}

export default Button