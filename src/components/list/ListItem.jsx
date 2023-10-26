import React from 'react'

const ListItem = ({text,className}) => {
  return (
    <li className={className}>{text}</li>
  )
}

export default ListItem