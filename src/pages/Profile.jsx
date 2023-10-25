import React, { useEffect, useState } from 'react'
import Container from '../components/container/Container'
import Images from '../components/images/Images'
import coverImg from '../assets/cover.jpg'
import SR from '../assets/sr.jpg'
import Hadding from '../components/hadding/Hadding'
import Paragraph from '../components/paragraph/Paragraph'
import {FaLinkedin} from 'react-icons/fa'
import {ImRocket} from 'react-icons/im'
import {AiOutlineClose} from 'react-icons/ai'
import Button from '../components/button/Button'
import Modal from 'react-modal';
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from 'react-redux'

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  Modal.setAppElement('#root');

const Profile = () => {
    const db = getDatabase();
    const [upProfile,setUpProfile]=useState({name:'',discription:''})
    let {name,discription}=upProfile
    const [profile,setProfile]=useState('')
    const [modalIsOpen, setIsOpen] = React.useState(false);
    let subtitle;
    let userInfo=useSelector(state=>console.log(state.user.value))

    // useEffect(()=>{
    //     const starCountRef = ref(db, 'users');
    //     onValue(starCountRef, (snapshot) => {
    //         let array=[]
    //         snapshot.forEach((item)=>{
    //             array.push(item.val())
    //         })
    //     });
    // },[])


    const handleChang =(e)=>{
        setUpProfile({...upProfile,[e.target.name]:e.target.value})
    }

    const handleSubmit =(e)=>{
        setProfile(upProfile)
        setIsOpen(false);
        setUpProfile({name:'',discription:''})
        e.preventDefault()
    }



    function openModal() {
        setIsOpen(true);
      }
      function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#fff';
      }
      function closeModal() {
        setIsOpen(false);
      }


  return (
    <div>

    <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div onClick={closeModal} className='text-xl cursor-pointer'>
            <AiOutlineClose />
        </div>
        {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>updete your profile</h2> */}
        <Hadding className='text-center py-3' text='updete your profile'/>
        <form onSubmit={handleSubmit} className='p-5'>
            <div>
                <Paragraph text='name :' className='py-2'/>
                <input type='text' name='name' className='ring py-2 px-5' placeholder='your name' onChange={handleChang} value={name} />
            </div>
            <div>
                <Paragraph text='discription :' className='py-2'/>
                <input type='text' name='discription' className='ring py-2 px-5' placeholder='your name' onChange={handleChang} value={discription} />
            </div>
            <Button className='mt-5' text='update'/>
          
        </form>
      </Modal>



{/* modal close */}

        <Container>
            <div className='relative'>
                <Images className='h-60' src={coverImg}/>
                <Button onclick={openModal} on className='absolute top-10 right-10 text-primary' text='Edit Profile'/>
            </div>
            {/*=============== profile =============== */}
            <div className='bg-gray-900 py-10 grid grid-cols-4 px-10 relative'>
                <div className="col-span-1">
                    <div className='w-60 h-60  absolute top-0 left-20 translate-y-[-20px]'>
                        <Images className='h-full rounded-full ring-8 ring-gray-900' src={SR}/>
                    </div>
                </div>

                <div className="col-span-3 text-white">
                    <div className='flex justify-between'>
                        <div className="flex gap-5">
                            <Hadding text={profile.name}/>
                            <FaLinkedin className='text-4xl text-primary mb-10'/>
                        </div>
                        <div className='flex gap-3'>
                            <ImRocket className='text-primary'/>
                            <Paragraph text='Saint Petersburg, Russian Federation'/>
                        </div>
                    </div>
                    <Paragraph text={profile.discription}/>
                    <Button className='mt-10' text='Contact Me'/>
                </div>

                {/* {profile.map((item)=>{
                   
                })} */}
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