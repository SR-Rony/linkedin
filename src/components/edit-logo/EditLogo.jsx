import React from 'react'

const EditLogo = ({className,onClick,icone}) => {
  return (
    <button className={`${className} cursor-pointer text-3xl`} onClick={onClick}>{icone}</button>
  )
}

export default EditLogo