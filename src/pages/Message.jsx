import React from 'react'
import Container from '../components/container/Container'
import Sightbar from '../components/sightbar/Sightbar'
import MyFriends from '../components/my-friends/MyFriends'
import Images from '../components/images/Images'
import img from '../assets/sr.jpg'
import Paragraph from '../components/paragraph/Paragraph'
import { useSelector } from 'react-redux'
import Button from '../components/button/Button'

const Message = () => {
    let userInfo=useSelector((state)=>(state.user.value))
    let activeMsg=useSelector((state)=>(state.active.value))
  return (
    <div className='pt-28'>
        <Container>
            <div className='grid grid-cols-6 gap-5'>
                <div className="col-span-1">
                    <Sightbar/>
                </div>
                <div className="col-span-2">
                    <MyFriends/>
                </div>
                <div className="col-span-3 ring ring-primary rounded-xl relative overflow-hidden bg-bg_promary">
                    <div className='absolute z-10 flex items-center gap-5 p-3 top-0 left-0 w-full border-b-2 border-primary'>
                        <Images className='w-14 h-14 rounded-full ring-4 ring-primary' src={activeMsg.senderProfile}/>
                        <Paragraph text={activeMsg.senderName}/>
                    </div>
                    <div className="w-full h-4/5 mt-20 px-4 overflow-y-scroll ">
                        <div className="text-left">
                            <Paragraph className='p-2 rounded-xl bg-bg_secoundary inline-block text-black' text='hello'/>
                        </div>
                        <div className="text-right">
                            <Paragraph className='p-2 rounded-xl bg-primary inline-block text-white' text='hello'/>
                        </div>
                    </div>
                    <div className='flex items-center justify-between border-t-2 border-primary pt-4 px-5'>
                        <input type="text" className='w-4/5 p-3' />
                        <Button text='Send'/>
                    </div>
                </div>
            </div>
        </Container>
    </div>
  )
}

export default Message