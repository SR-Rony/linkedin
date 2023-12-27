import React, { useEffect, useState } from 'react'
import Container from '../components/container/Container'
import Sightbar from '../components/sightbar/Sightbar'
import MyFriends from '../components/my-friends/MyFriends'
import Images from '../components/images/Images'
import img from '../assets/sr.jpg'
import Paragraph from '../components/paragraph/Paragraph'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../components/button/Button'
import { getDatabase, ref, onValue, set, push,update,remove,  } from "firebase/database";
import { activeUser } from '../slices/activeMsg'
import {toast } from 'react-toastify';

const Message = () => {
    const db = getDatabase();
    const [inputValue,setInputValue]=useState('')
    const [messages,setMessages]=useState([])
    let userInfo=useSelector((state)=>(state.user.value))
    let activeMsg=useSelector((state)=>(state.active.value))
    let dispatch=useDispatch()

    useEffect(()=>{
        // firebase message data
        const messageRef = ref(db, 'message')
       onValue(messageRef, (snapshot) => {
          let array=[]
          snapshot.forEach((item)=>{  
            // console.log('message',item.val());     
            if((userInfo.uid==item.val().senderId && activeMsg.activeMsgId==item.val().reciverId)||(userInfo.uid==item.val().reciverId && activeMsg.activeMsgId==item.val().senderId)){
                array.push({...item.val(),msgId:item.key})
            }
          })
          setMessages(array)
      });
    //   activemsg last msg firebase data
    //   const lastMsgRef = ref(db, 'lastMsg');
    //   onValue(lastMsgRef, (snapshot) => {
    //       snapshot.forEach((item)=>{
    //         console.log('active',item.val());
    //         if(userInfo.uid!=item.val().activeMsgId){
    //             dispatch(activeUser({
    //                 type:'single',
    //                 activeMsgId:item.val().activeMsgId,
    //                 activeMsgName:item.val().activeMsgName,
    //                 profileImg:item.val().profileImg,
    //             }))
    //         }
    //       })
    //     });
    },[activeMsg.activeMsgId])
    // handleSendMsg button
    const handleSendMsg =()=>{
        if(!inputValue){
            toast.error('please write a message', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
        })}
        else{
            set(push(ref(db,'message')),{
                senderName:userInfo.displayName,
                senderId:userInfo.uid,
                reciverName:activeMsg.activeMsgName,
                reciverId:activeMsg.activeMsgId,
                messages:inputValue
            })
            .then(()=>{
                setInputValue('')
            })
        }
    }
  return (
    <div className='h-screen py-28'>
        <Container>
            <div className='grid grid-cols-6 gap-5'>
                <div className="col-span-1">
                    <Sightbar/>
                </div>
                <div className="col-span-2">
                    <MyFriends/>
                </div>
                <div className="col-span-3 ring ring-primary rounded-xl overflow-hidden relative bg-bg_promary">
                    <div className=' flex items-center gap-5 p-3 border-b-2 border-primary'>
                        <Images className='w-14 h-14 rounded-full ring-4 ring-primary' src={activeMsg.profileImg}/>
                        <Paragraph text={activeMsg.activeMsgName}/>
                    </div>
                    <div className="w-full h-[80vh] overflow-y-scroll px-4  ">
                        {messages.map((item)=>(
                            item.senderId==userInfo.uid
                            ?<div key={item.msgId} className="text-right">
                                <Paragraph className='p-2 my-2 rounded-md bg-primary inline-block text-white' text={item.messages}/>
                            </div>
                            :<div key={item.msgId} className="text-left">
                                <Paragraph className='p-2 my-2 rounded-md bg-bg_secoundary inline-block text-black' text={item.messages}/>
                            </div>
                        ))}
                        
                    </div>
                    <div className='flex items-center bg-bg_promary justify-between border-t-2 border-primary py-4 px-5'>
                        <input onChange={(e)=>setInputValue(e.target.value)} type="text" placeholder='write message' className='w-4/5 p-3' value={inputValue} />
                        <Button onclick={handleSendMsg} text='Send'/>
                    </div>
                </div>
            </div>
        </Container>
    </div>
  )
}

export default Message