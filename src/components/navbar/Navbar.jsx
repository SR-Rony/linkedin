import React from 'react'
import Container from '../container/Container'
import {FaLinkedin} from 'react-icons/fa'

const Navbar = () => {
  return (
    <section className='py-5 bg-gray-300'>
        <Container>
            <div className="grid items-center">
                <FaLinkedin className='inline-block text-4xl text-primary cursor-pointer'/>
            </div>
        </Container>
    </section>
  )
}

export default Navbar