import React, { useEffect, useState } from 'react'
import Heading from '../heading/Heading'
import Images from '../images/Images'
import Button from '../button/Button'
import { getDatabase, ref, onValue, set, push,update,remove,  } from "firebase/database";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { activeUser } from '../../slices/activeMsg';

const MyFriends = () => {
    const db = getDatabase();
    const [friend,setFriend]=useState([])
    let userInfo=useSelector(state=>(state.user.value))
    let navigate=useNavigate()
    let dispatch=useDispatch()
    useEffect(()=>{
        // friend firebase info
        const friendRef = ref(db, 'friend');
        onValue(friendRef, (snapshot) => {
            let array=[]
            snapshot.forEach((item)=>{
            if(userInfo.uid==item.val().reciveId || userInfo.uid==item.val().senderId){
                array.push({...item.val(),id:item.key})
            }
            })
            setFriend(array)
        });
    },[])
   // handleBlock button
const handleBlock =(item)=>{
  if(userInfo.uid==item.senderId){
    // set(push(ref(db, 'friendBlock')),{
    //   blockName:item.reciveName,
    //   blockId:item.reciveId,
    //   blockbyName:item.senderName,
    //   blockbyId:item.senderId,
    //   profile:item.reciverProfile
    // }).then(()=>{
      remove(ref(db,'friend/'+item.id))
      // })
  }else{
    // set(push(ref(db, 'friendBlock')),{
    //   blockbyName:item.reciveName,
    //   blockbyId:item.reciveId,
    //   blockName:item.senderName,
    //   blockId:item.senderId,
    //   profile:item.senderProfile
    // }).then(()=>{
      remove(ref(db,'friend/'+item.id))
    // })
  }
}
// handleMessage button
const handleMessage =(item)=>{
  navigate('/message')
  dispatch(activeUser(item))
  localStorage.setItem('activeMsg',JSON.stringify(item))

}


  return (
    <div className="ring ring-primary overflow-y-scroll p-3 rounded-md h-full">
        <Heading className='text-center border-b-2 border-primary pb-2' text='Friend  List'/>
        {friend.map((item)=>(
        <div key={item.id} className="flex justify-between items-center bg-bg_promary text-white rounded-md my-2 p-2 box-border hover:bg-black">
            <Images className='rounded-full w-14 h-14 ring-2 ring-primary' src={userInfo.uid==item.senderId?item.reciverProfile:item.senderProfile}/>
            <Heading text={userInfo.uid==item.senderId?item.reciveName:item.senderName}/>
            <div className="flex gap-2">
            <Button className='px-3' onclick={()=>handleMessage(item)} text='Message'/>
            <Button onclick={()=>handleBlock(item)} className='ring ring-red-600 text-red-600 hover:bg-red-600 px-3' text='Delete'/>
            </div>
        </div>
        ))}
    </div>
  )
}

export default MyFriends