import React, { useEffect, useState } from 'react'
import Container from '../components/container/Container'
import Sightbar from '../components/sightbar/Sightbar'
import MyFriends from '../components/my-friends/MyFriends'
import Images from '../components/images/Images'
import img from '../assets/sr.jpg'
import Paragraph from '../components/paragraph/Paragraph'
import { useSelector } from 'react-redux'
import Button from '../components/button/Button'
import { getDatabase, ref, onValue, set, push,update,remove,  } from "firebase/database";

const Message = () => {
    const db = getDatabase();
    const [inputValue,setInputValue]=useState('')
    const [messages,setMessages]=useState([])
    let userInfo=useSelector((state)=>(state.user.value))
    // console.log('user',userInfo);
    let activeMsg=useSelector((state)=>(state.active.value))
    // console.log('active',activeMsg);

    useEffect(()=>{
        // firebase message data
        const messageRef = ref(db, 'message');
      onValue(messageRef, (snapshot) => {
          let array=[]
          snapshot.forEach((item)=>{
            if((userInfo.uid==item.val().senderId && activeMsg.senderId==item.val().reciverId)||(userInfo.uid==item.val().reciverId && activeMsg.senderId==item.val().senderId)){
                array.push({...item.val(),msgId:item.key})
            }
          })
          setMessages(array)
      });
    },[])

    // handleSendMsg button
    const handleSendMsg =()=>{
        set(push(ref(db,'message')),{
            senderName:userInfo.displayName,
            senderId:userInfo.uid,
            reciverName:activeMsg.senderName,
            reciverId:activeMsg.senderId,
            messages:inputValue
        }).then(()=>{
            setInputValue('')
        })
    }
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
                        {messages.map((item)=>(
                            item.senderId==userInfo.uid
                            ?<div key={item.msgId} className="text-right">
                                <Paragraph className='p-2 rounded-xl bg-primary inline-block text-white' text={item.messages}/>
                            </div>
                            :<div key={item.msgId} className="text-left">
                                <Paragraph className='p-2 rounded-xl bg-bg_secoundary inline-block text-black' text={item.messages}/>
                            </div>
                        ))}
                        
                    </div>
                    <div className='flex items-center justify-between border-t-2 border-primary pt-4 px-5'>
                        <input onChange={(e)=>setInputValue(e.target.value)} type="text" placeholder='write message' className='w-4/5 p-3' />
                        <Button onclick={handleSendMsg} text='Send'/>
                    </div>
                </div>
            </div>
        </Container>
    </div>
  )
}

export default Message