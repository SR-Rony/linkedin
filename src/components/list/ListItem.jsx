import React from 'react'
import { Link } from 'react-router-dom'

const ListItem = ({text,className,path}) => {
  return (
    <li className={`font-nunito cursor-pointer`}><Link className={className} to={path}>{text}</Link></li>
  )
}

export default ListItem