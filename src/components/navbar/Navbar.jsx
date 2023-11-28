import React from 'react'
import Container from '../container/Container'
import {FaLinkedin} from 'react-icons/fa'
import List from '../list/List'
import ListItem from '../list/ListItem'
import Button from '../button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { getAuth, signOut } from "firebase/auth";
import { userData } from '../../slices/userSlice'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const auth = getAuth();
  const userInfo=useSelector(state=>state.user.value)
  let dispatch=useDispatch()
  let navigate=useNavigate()
  // handle log out button
  const handleLogout =()=>{
    console.log('logout');
    signOut(auth).then(() => {
      dispatch(userData(null))
      localStorage.removeItem('userdata')
    }).then(()=>{
      navigate('/login')
    })
    .catch((error) => {
      // An error happened.
    });
  }
  return (
    <section className='py-5 bg-gray-900 text-white fixed top-0 left-0 w-full z-10 '>
        <Container>
            <div className="flex items-center justify-between">
                <FaLinkedin className='inline-block text-4xl text-primary cursor-pointer'/>
                <input type="text" className='ring p-2 w-1/4'placeholder='Search' />
                <List className='flex gap-4 font-bold text-xl'>
                  <ListItem className='hover:text-primary cursor-pointer' text='Home' path='home'/>
                  <ListItem className='hover:text-primary cursor-pointer' text='Profile' path='profile'/>
                  <ListItem className='hover:text-primary cursor-pointer' text='Message' path='message'/>
                  <ListItem className='hover:text-primary cursor-pointer' text='Notification' path='notification'/>
                </List>
                <Button onclick={handleLogout} text='Log Out'/>
            </div>
        </Container>
    </section>
  )
}

export default Navbar