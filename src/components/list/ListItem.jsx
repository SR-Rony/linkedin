import React from 'react'
import { Link } from 'react-router-dom'

const ListItem = ({text,className,path}) => {
  return (
    <li className={`${className} font-nunito`}><Link to={path}>{text}</Link></li>
  )
}

export default ListItem