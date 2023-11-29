import React, { useEffect, useState } from 'react'
import Container from '../components/container/Container'
import Images from '../components/images/Images'
import cover from '../assets/cover.jpg'
import img from '../assets/SR-Rony.png'
import Heading from '../components/heading/Heading'
import { useNavigate } from 'react-router-dom'
import Paragraph from '../components/paragraph/Paragraph'
import { IoIosSend } from "react-icons/io";
import { FaComment } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { BiRepost } from "react-icons/bi";
import { MdPermMedia,MdEventNote,MdTextSnippet   } from "react-icons/md";
import { useSelector } from 'react-redux'
import { getDatabase, ref, onValue, set, push,update,remove,  } from "firebase/database";
import Button from '../components/button/Button'


const Home = () => {
  const db = getDatabase();
let navigate =useNavigate()
const [profile,setProfile]=useState([])
const [user,setUser]=useState([])

// handleProfile
const handleProfile =()=>{
  navigate('/profile')
}
let userInfo=useSelector(state=>(state.user.value))
// console.log(userInfo);
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
              if(userInfo.uid!=item.key)
                  array.push({...item.val(),id:item.key})

            })
            setUser(array)
        });
  },[])


  return (
   <div className='pt-28'>
      <Container>
        <div className='grid grid-cols-5 gap-4'>
          <div className="col-span-1 w-full text-white h-screen rounded-xl overflow-hidden">
              <div className=' relative  bg-bg_promary pb-5'>
                <Images className='w-full h-32' src={cover}/>
                <div onClick={handleProfile} className=' w-24 h-24 rounded-full object-cover absolute top-20 left-1/2 translate-x-[-50%] ring-4 ring-bg_promary cursor-pointer overflow-hidden'>
                <Images src={userInfo.photoURL}/>
                </div>
                <Heading className='text-center pt-16' text={userInfo.displayName}/>
                {/* {user.map(item=>item.id==userInfo.uid&&<Paragraph text={userInfo.discription} className='text-center py-3 border-b-2 border-primary'/>)} */}
                <h2 className='text-center cursor-pointer text-xl mt-2' onClick={handleProfile}>Vew Full Profile</h2>
              </div>
          </div>
          <div className="col-span-3 rounded-xl overflow-hidden">
            <div className='bg-bg_promary p-5 rounded-xl mb-5'>
              <div className='grid grid-cols-7 '>
                <div className="col-span-1">
                <div className=' w-16 h-16 rounded-full ring-4 ring-primary overflow-hidden'>
                  <Images src={userInfo.photoURL}/>
                </div>
                </div>
                <div className="col-span-6">
                  <input type="text" className='w-full p-4 rounded-full ring-4 ring-primary' placeholder='Start a Post'  />
                </div>
              </div>
              <div className='flex justify-between pt-5 px-5'>
                  <div className="flex items-center cursor-pointer text-white hover:text-primary">
                    <MdPermMedia className='text-2xl'/>
                    <Paragraph text='Media'/>
                  </div>
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

            <div className='bg-bg_promary  p-5 text-white rounded-xl my-5'>
              <div className='flex gap-4 items-center border-b-2 border-primary pb-4'>
                <div className=' w-10 h-10 rounded-full ring-4 ring-primary overflow-hidden'>
                  <Images src={img}/>
                </div>
                <Paragraph text='SR Rony'/>
              </div>
              <div>
                <Paragraph text='description' className='py-5'/>
                <Images src={cover}/>
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
                <div className="flex items-center cursor-pointer text-white hover:text-primary ">
                <IoIosSend className=' text-2xl' />
                  <Paragraph text='Send'/>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 bg-bg_promary  text-white h-screen rounded-xl p-5">
            <Heading className='text-center border-b-2 border-primary pb-5' text='All User'/>
            {user.map((item)=>(
              <div key={item.id} className='flex justify-between items-center py-5'>
                <div className=' w-10 h-10 rounded-full ring-4 ring-primary overflow-hidden'>
                  <Images src={item.profile_picture}/>
                </div>
                <Paragraph text={item.userName}/>
                <Button text='requst'/>
              </div>
            ))}
          </div>
        </div>
      </Container>
   </div>
  )
}

export default Home