import React from 'react'
import Images from '../images/Images'
import Heading from '../heading/Heading'
import Paragraph from '../paragraph/Paragraph'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import cover from '../../assets/cover.jpg'

const Sightbar = () => {
    const userInfo=useSelector((state)=>(state.user.value))
    console.log(userInfo);
    let navigate = useNavigate()
    // handleProfile click
    const handleProfile =()=>{
        navigate('/profile')
      }
  return (
    <div className=' relative  bg-bg_promary pb-5 h-screen'>
        <Images className='w-full h-32' src={cover}/>
        <div onClick={handleProfile} className=' w-24 h-24 rounded-full object-cover absolute top-20 left-1/2 translate-x-[-50%] ring-4 ring-bg_promary cursor-pointer overflow-hidden'>
            <Images src={userInfo.photoURL}/>
        </div>
        <Heading className='text-center pt-16' text={userInfo.displayName}/>
        <Paragraph text={userInfo.discription} className='text-center'/>
        <h2 className='text-center cursor-pointer text-xl mt-2 py-3 border-b-2 border-primary' onClick={handleProfile}>Vew Full Profile</h2>
    </div>
  )
}

export default Sightbar