import React from 'react'
import Container from '../components/container/Container'
import Sightbar from '../components/sightbar/Sightbar'
import MyFriends from '../components/my-friends/MyFriends'

const Message = () => {
  return (
    <div className='pt-28'>
        <Container>
            <div className='grid grid-cols-5 gap-5'>
                <div className="col-span-1">
                    <Sightbar/>
                </div>
                <div className="col-span-2">
                    <MyFriends/>
                </div>
            </div>
        </Container>
    </div>
  )
}

export default Message