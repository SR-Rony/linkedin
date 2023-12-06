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
import Sightbar from '../components/sightbar/Sightbar';
import MyFriends from '../components/my-friends/MyFriends';

const Friends = () => {
  const db = getDatabase();
  const [friendRequst,setFriendRequst]=useState([])
  const [friendBlock,setFriendBlock]=useState([])
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
    
     // friend block firebase info
     const friendBlockRef = ref(db, 'friendBlock');
     onValue(friendBlockRef, (snapshot) => {
         let array=[]
         snapshot.forEach((item)=>{
           if(userInfo.uid==item.val().blockbyId){
            array.push({...item.val(),id:item.key})
          }
         })
         setFriendBlock(array)
     });
  },[])
// handleConfrim button
const handleConfrim =(item)=>{
  set(push(ref(db, 'friend')),{
    ...item
  }).then(()=>{
    remove(ref(db,'friendRequst/'+item.id))
  })
}
  return (
    <div className='pt-28'>
        <Container>
            <div className='grid grid-cols-5 gap-4'>
                <div className="col-span-1">
                  <Sightbar/>
                </div>
                <div className='col-span-4'>
                  <div className="grid grid-cols-4 h-full gap-4">
                    {/* friends */}
                    <div className="col-span-2">
                      <MyFriends/>
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
                  {/* <div className="grid grid-cols-4 h-3/6 gap-4 my-4">
                    
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
                    
                    <div className="col-span-2 ring ring-primary overflow-y-scroll p-3 rounded-md">
                      <Heading className='text-center border-b-2 border-primary pb-2' text='Friend block List'/>
                      {friendBlock.map((item)=>(
                        <div key={item.id} className="flex justify-between items-center bg-bg_promary text-white rounded-md my-2 px-2 box-border hover:bg-black">
                          <div className='w-20 h-20'>
                            <Images className='rounded-full' src={item.profile}/>
                          </div>
                          <Heading text={item.blockName}/>
                          <div className="flex gap-2">
                            <Button text='Unblock'/>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div> */}
                </div>
            </div>
        </Container>
    </div>
  )
}

export default Friends