import React from 'react'
import Container from '../container/Container'
import {FaLinkedin} from 'react-icons/fa'
import List from '../list/List'
import ListItem from '../list/ListItem'

const Navbar = () => {
  return (
    <section className='py-5 bg-gray-900 text-white fixed top-0 left-0 w-full z-10 '>
        <Container>
            <div className="flex items-center justify-between">
                <FaLinkedin className='inline-block text-4xl text-primary cursor-pointer'/>
                <List className='flex gap-4 font-bold text-xl'>
                  <ListItem className='hover:text-primary cursor-pointer' text='Home' path='home'/>
                  <ListItem className='hover:text-primary cursor-pointer' text='Profile' path='profile'/>
                  <ListItem className='hover:text-primary cursor-pointer' text='Friends' path='friends'/>
                  <ListItem className='hover:text-primary cursor-pointer' text='Message' path='message'/>
                  <ListItem className='hover:text-primary cursor-pointer' text='Notification' path='notification'/>
                </List>
            </div>
        </Container>
    </section>
  )
}

export default Navbar