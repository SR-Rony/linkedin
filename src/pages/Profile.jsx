import React from 'react'
import Container from '../components/container/Container'
import Images from '../components/images/Images'
import coverImg from '../assets/cover.jpg'
import SR from '../assets/sr.jpg'
import Hadding from '../components/hadding/Hadding'
import Paragraph from '../components/paragraph/Paragraph'
import {FaLinkedin} from 'react-icons/fa'
import {ImRocket} from 'react-icons/im'
import Button from '../components/button/Button'

const Profile = () => {
  return (
    <div>
        <Container>
            <Images className='h-60' src={coverImg}/>
            {/*=============== profile =============== */}
            <div className='bg-gray-900 py-10 grid grid-cols-4 px-10 relative'>
                <div className="col-span-1">
                    <Images className='w-40 h-40 rounded-full ring-8 ring-gray-900 absolute top-0 left-20 translate-y-[-20px]' src={SR}/>
                </div>
                <div className="col-span-3 text-white">
                    <div className='flex justify-between'>
                        <div className="flex gap-5">
                            <Hadding text='Dmitry Kargaev'/>
                            <FaLinkedin className='text-4xl text-primary mb-10'/>
                        </div>
                        <div className='flex gap-3'>
                            <ImRocket className='text-primary'/>
                            <Paragraph text='Saint Petersburg, Russian Federation'/>
                        </div>
                    </div>
                    <Paragraph text='Freelance UX/UI designer, 80+ projects in web design, mobile apps  (iOS & android) and creative projects. Open to offers.'/>
                    <Button className='mt-10' text='Contact Me'/>
                </div>
            </div>
            <div className="flex gap-2 py-10 bg-gray-200 justify-center">
                <Paragraph className='w-60 py-5 text-center bg-white text-primary hover:text-white hover:bg-primary' text='PROFILE'/>
                <Paragraph className='w-60 text-center py-5 bg-white text-primary hover:text-white hover:bg-primary' text='FRIENDS'/>
                <Paragraph className='w-60 text-center py-5 bg-white text-primary hover:text-white hover:bg-primary' text='POST'/>
            </div>
            {/*============ about me ===========*/}
            <div className='bg-gray-900 p-10 text-white text-center'>
                <Hadding text='About Me'/>
                <Paragraph className='my-5 pr-10' text={`I'm more experienced in eCommerce web projects and mobile banking apps, but also like to work with creative projects, such as landing pages or unusual corporate websites. `}/>
                <Button text='Read more'/>
            </div>
            {/*================ project ============= */}
            <div className='bg-gray-900 p-10 text-white text-center'>
                <Hadding className='my-10' text='Porject'/>
                <div className='grid grid-cols-3 gap-5'>
                    <div className="col-span-1">
                        <Images src={coverImg}/>
                    </div>
                    <div className="col-span-1">
                        <Images src={coverImg}/>
                    </div>
                    <div className="col-span-1">
                        <Images src={coverImg}/>
                    </div>
                </div>
            </div>
        </Container>
    </div>
  )
}

export default Profile