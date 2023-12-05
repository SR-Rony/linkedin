import React, { useEffect, useState } from 'react'
import Container from '../components/container/Container'
import Heading from '../components/heading/Heading'
import Images from '../components/images/Images'
import { getDatabase, ref, onValue, set, push,update,remove,  } from "firebase/database";
import Button from '../components/button/Button';
import { useSelector } from 'react-redux';
import Paragraph from '../components/paragraph/Paragraph';
import cover from '../assets/cover.jpg'
import { useNavigate } from 'react-router-dom';

const Friends = () => {
  const db = getDatabase();
  const [friendRequst,setFriendRequst]=useState([])
  const [friend,setFriend]=useState([])
  let userInfo=useSelector(state=>(state.user.value))
  let navigate=useNavigate()

  useEffect(()=>{
    const friendReqRef = ref(db, 'friendRequst');
    onValue(friendReqRef, (snapshot) => {
        let array=[]
        snapshot.forEach((item)=>{
          if(userInfo.uid==item.val().reciveId){
            array.push({...item.val(),id:item.key})
          }
        })
        setFriendRequst(array)
    });
    // friend firebase info
    const friendRef = ref(db, 'friend');
    onValue(friendRef, (snapshot) => {
        let array=[]
        snapshot.forEach((item)=>{
          if(userInfo.uid==item.val().reciveId){
            array.push({...item.val(),id:item.key})
          }
        })
        setFriend(array)
    });
  },[])

  const handleProfile =()=>{
    navigate('/profile')
  }
// handleConfrim button
const handleConfrim =(item)=>{
  set(push(ref(db, 'friend')),{
    ...item
  }).then(()=>{
    remove(ref(db,'friendRequst/'+item.id))
  })
}
// handleBlock button
const handleBlock =(item)=>{
  console.log(item);
}


  return (
    <div className='w-full pt-28'>
        <Container>
            <div className='grid grid-cols-5 gap-4'>
                <div className="col-span-1 w-full text-white rounded-xl overflow-hidden">
                  <div className=' relative h-screen  bg-bg_promary pb-5'>
                    <Images className='w-full h-32' src={cover}/>
                    <div onClick={handleProfile} className=' w-24 h-24 rounded-full object-cover absolute top-20 left-1/2 translate-x-[-50%] ring-4 ring-bg_promary cursor-pointer overflow-hidden'>
                        <Images src={userInfo.photoURL}/>
                      </div>
                      <Heading className='text-center pt-16' text={userInfo.displayName}/>
                    <h2 className='text-center cursor-pointer text-xl mt-2 py-3 border-b-2 border-primary' onClick={handleProfile}>Vew Full Profile</h2>
                  </div>
                </div>
                <div className='col-span-4'>
                  <div className="grid grid-cols-4 h-3/6 gap-4">
                    {/* friends */}
                    <div className="col-span-2 ring ring-primary overflow-y-scroll p-3 rounded-md">
                      <Heading className='text-center border-b-2 border-primary pb-2' text='Friend  List'/>
                      {friend.map((item)=>(
                        <div className="flex justify-between items-center bg-bg_promary text-white rounded-md my-2 px-2 box-border hover:bg-black">
                          <div className='w-20 h-20'>
                            <Images className='rounded-full' src={item.senderProfile}/>
                          </div>
                          <Heading text={item.senderName}/>
                          <div className="flex gap-2">
                            <Button text='Message'/>
                            <Button onclick={()=>handleBlock(item)} className='ring ring-red-600 text-red-600 hover:bg-red-600' text='Block'/>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* friends request */}
                    <div className="col-span-2 ring ring-primary overflow-y-scroll p-3 rounded-md">
                      <Heading className='text-center border-b-2 border-primary pb-2' text='Friend Request List'/>
                      {friendRequst.map((item)=>(
                        <div className="flex justify-between items-center bg-bg_promary text-white rounded-md my-2 px-2 box-border hover:bg-black">
                          <div className='w-20 h-20'>
                            <Images className='rounded-full' src={item.senderProfile}/>
                          </div>
                          <Heading text={item.senderName}/>
                          <div className="flex gap-2">
                            <Button onclick={()=>handleConfrim(item)} text='Confirm'/>
                            <Button onclick={()=>remove(ref(db,'friendRequst/'+item.id))} className='ring ring-red-600 text-red-600 hover:bg-red-600' text='Delete'/>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 h-3/6 gap-4 my-4">
                    {/* friends */}
                    <div className="col-span-2 ring ring-primary overflow-y-scroll p-3 rounded-md">
                      <Heading className='text-center border-b-2 border-primary pb-2' text='Friend  List'/>
                      {friendRequst.map((item)=>(
                        <div className="flex justify-between items-center bg-bg_promary text-white rounded-md my-2 px-2 box-border hover:bg-black">
                          <div className='w-20 h-20'>
                            <Images className='rounded-full' src={item.senderProfile}/>
                          </div>
                          <Heading text={item.senderName}/>
                          <div className="flex gap-2">
                            <Button text='Confirm'/>
                            <Button className='ring ring-red-600 text-red-600 hover:bg-red-600' text='Delete'/>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* friends request */}
                    <div className="col-span-2 ring ring-primary overflow-y-scroll p-3 rounded-md">
                      <Heading className='text-center border-b-2 border-primary pb-2' text='Friend Request List'/>
                      {friendRequst.map((item)=>(
                        <div className="flex justify-between items-center bg-bg_promary text-white rounded-md my-2 px-2 box-border hover:bg-black">
                          <div className='w-20 h-20'>
                            <Images className='rounded-full' src={item.senderProfile}/>
                          </div>
                          <Heading text={item.senderName}/>
                          <div className="flex gap-2">
                            <Button text='Confirm'/>
                            <Button className='ring ring-red-600 text-red-600 hover:bg-red-600' text='Delete'/>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
            </div>
        </Container>
    </div>
  )
}

export default Friends