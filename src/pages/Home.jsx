import React, { useEffect, useState } from 'react'
import Container from '../components/container/Container'
import Images from '../components/images/Images'
import Heading from '../components/heading/Heading'
import { useNavigate } from 'react-router-dom'
import Paragraph from '../components/paragraph/Paragraph'
import { IoIosSend } from "react-icons/io";
import { FaComment } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { BiRepost } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";
import { MdPermMedia,MdEventNote,MdTextSnippet   } from "react-icons/md";
import { useSelector } from 'react-redux'
import { getDatabase, ref, onValue, set, push,update,remove,  } from "firebase/database";
import Button from '../components/button/Button'
import { getStorage, ref as uplodRef,uploadBytes,getDownloadURL } from "firebase/storage";
import Sightbar from '../components/sightbar/Sightbar'
import Modal from 'react-modal';

// react modal css style
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    // background:'#111827',
    width:'500px'
  },
};
Modal.setAppElement('#root');


const Home = () => {
  const storage = getStorage();
  const db = getDatabase();
let navigate =useNavigate()
const [user,setUser]=useState([])
const [uplodData,setUplodData]=useState([])
// const [cancle,setCancle]=useState(false)
const [friendReq,setFriendReq]=useState([])
const [friendId,setFriendId]=useState([])
const [friend,setFriend]=useState([])

let userInfo=useSelector(state=>(state.user.value))
  useEffect(()=>{
    if(!userInfo){
      navigate('/login')
    }else{
      navigate('/home')
    }
        // firebase user info================
        const userRef = ref(db, 'users');
        onValue(userRef, (snapshot) => {
            let array=[]
            snapshot.forEach((item)=>{
              array.push({...item.val(),id:item.key})
            })
            setUser(array)
        });
        // user uplod faire base data
        const uplodRef = ref(db, 'uplodData');
        onValue(uplodRef, (snapshot) => {
            let array=[]
            snapshot.forEach((item)=>{
                  array.push({...item.val(),id:item.key})
            })
            setUplodData(array)
        });
        // friend requset faire base data
        const friendReqRef = ref(db, 'friendRequst');
        onValue(friendReqRef, (snapshot) => {
            let array=[]
            snapshot.forEach((item)=>{
                  array.push({...item.val(),reqId:item.key})
            })
            setFriendReq(array)
        });
        // friend firebase info
      const friendRef = ref(db, 'friend');
      onValue(friendRef, (snapshot) => {
          let array=[]
          let FndArray=[]
          snapshot.forEach((item)=>{
            array.push(item.val().senderId+item.val().reciveId)
            if(userInfo.uid==item.val().reciveId || userInfo.uid==item.val().senderId){
              FndArray.push({...item.val(),fid:item.key})
            }
          })
          setFriend(FndArray)
          setFriendId(array)
      });
  },[])

  // handlePost button
  const handlePost =(e)=>{
    const storageRef = uplodRef(storage,e.target.files[0].name);
    uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
      getDownloadURL(storageRef).then((downloadURL) => {
        set(push(ref(db, 'uplodData')),{
          profileImg:userInfo.photoURL,
          senderName: userInfo.displayName,
          senderId: userInfo.uid,
          uplodData : downloadURL
        })
      })
    })
    
  }
  // handleFriendReq button
  const handleFriendReq =(item)=>{
    set(push(ref(db, 'friendRequst')),{
      senderProfile:userInfo.photoURL,
      senderName: userInfo.displayName,
      senderId: userInfo.uid,
      reciveName : item.userName,
      reciveId:item.id,
      reciverProfile:item.profile_picture
    })
  }
  //handleReqCancle button
  const handleReqCancle =(item)=>{
    friendReq.map((id)=>{
      if(id.reciveId==item.id&& userInfo.uid==id.senderId){
        remove(ref(db,'friendRequst/'+id.reqId))
      }
    })
  }
  // handleDeletePost button
  const handleDeletePost =(item)=>{
    remove(ref(db,'uplodData/'+item.id))
  }
  // react mdal all button
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
   <div className='pt-28'>
      <Container>
        <div className='grid grid-cols-5 gap-4'>
          <div className="col-span-1 ">
              <Sightbar/>
          </div>
          <div className="col-span-3 rounded-xl overflow-hidden">
            <div className='bg-bg_promary p-5 rounded-xl mb-5'>
              <div className='grid grid-cols-7 '>
                <div className="col-span-1">
                {user.map((item)=>(
                  userInfo.uid==item.id&&
                  <div className=' w-16 h-16 rounded-full ring-4 ring-primary overflow-hidden'>
                    <Images src={item.profile_picture}/>
                  </div>
                ))}
                </div>
                <div className="col-span-6">
                  <input type="text" className='w-full p-4 rounded-full ring-4 ring-primary' placeholder='Start a Post'  />
                </div>
              </div>
              <div className='flex justify-between pt-5 px-5'>
                    <label>
                      <input onChange={handlePost} type="file" hidden />
                      <div className="flex items-center cursor-pointer text-white hover:text-primary">
                        <MdPermMedia className='text-2xl'/>
                        <Paragraph text='Media'/>
                      </div>
                    </label>
                  <div className="flex cursor-pointer items-center text-white hover:text-primary">
                    <MdEventNote className='text-2xl'/>
                    <Paragraph text='Event'/>
                  </div>
                  <div className="flex cursor-pointer items-center text-white hover:text-primary">
                    <MdTextSnippet  className='e text-2xl'/>
                    <Paragraph text='write Article'/>
                  </div>
              </div>
            </div>
            {uplodData&&uplodData.map((item)=>(
                <div key={item.id} className='bg-bg_promary  p-5 text-white rounded-xl my-5 relative'>
                  <RxCross1 onClick={()=>handleDeletePost(item)}  className='absolute top-5 right-5 cursor-pointer text-white text-2xl' />
                <div className='flex gap-4 items-center border-b-2 border-primary pb-4'>
                  <div className=' w-10 h-10 rounded-full ring-4 ring-primary overflow-hidden'>
                    <Images src={item.profileImg}/>
                  </div>
                  <Paragraph text={item.senderName}/>
                </div>
                <div>
                  <Paragraph text='description' className='py-5'/>
                  <Images src={item.uplodData}/>
                  <div className='flex justify-between py-2'>
                  <span>Like:</span>
                    <span>Comment:</span>
                  </div>
                </div>
                <div className='flex justify-between border-t-2 border-primary p-5'>
                  <div className="flex items-center cursor-pointer text-white hover:text-primary">
                  <AiFillLike className=' text-2xl' />
                    <Paragraph text='Like'/>
                  </div>
                  <div className="flex items-center cursor-pointer text-white hover:text-primary">
                    <FaComment className=' text-2xl' />
                    <Paragraph text='Comment'/>
                  </div>
                  <div className="flex items-center cursor-pointer text-white hover:text-primary">
                  <BiRepost className=' text-3xl' />
                    <Paragraph text='Repost'/>
                  </div>
                  <div onClick={openModal} className="flex items-center cursor-pointer text-white hover:text-primary ">
                  <IoIosSend className=' text-2xl' />
                    <Paragraph text='Send'/>
                  </div>
                </div>
              </div>
            ))
            }
          </div>
          <div className="col-span-1 bg-bg_promary h-screen  text-white rounded-xl p-5">
            <Heading className='text-center border-b-2 border-primary pb-5' text='All User'/>
            {user.map((item)=>(
             userInfo.uid!=item.id&&
             <div key={item.id} className='flex justify-between items-center py-5'>
                <div className=' w-10 h-10 rounded-full ring-4 ring-primary overflow-hidden'>
                  <Images src={item.profile_picture}/>
                </div>
                <Paragraph text={item.userName}/>
                {friendReq.find((e)=>(e.reciveId==item.id))
                  ?<Button className='ring ring-red-600 text-red-600 hover:bg-red-600 px-3' onclick={()=>handleReqCancle(item)} text='Cancle'/>
                  :friendId.includes(item.id+userInfo.uid)||friendId.includes(userInfo.uid+item.id)
                  ?<Button className='ring ring-green-600 text-green-600 hover:bg-green-600 px-3' text='Friend'/>
                  :<Button className='px-3' onclick={()=>handleFriendReq(item)} text='Requst'/>
                }
                
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* react modal */}
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
         */}
        <RxCross1 className='cursor-pointer' onClick={closeModal}/>
         <Heading className='text-center' text='All Friend'/>
        <div>
        {friend.map((item)=>(
          <div key={item.id} className="flex justify-between items-center bg-bg_promary text-white rounded-md my-2 p-2 box-border hover:bg-black">
              <Images className='rounded-full w-14 h-14 ring-2 ring-primary' src={userInfo.uid==item.senderId?item.reciverProfile:item.senderProfile}/>
              <Heading text={userInfo.uid==item.senderId?item.reciveName:item.senderName}/>
              <div className="flex gap-2">
              <Button className='' onclick={()=>handleMessage(item)} text={<IoIosSend/>}/>
              </div>
          </div>
        ))}
        </div>
      </Modal>
   </div>
  )
}

export default Home