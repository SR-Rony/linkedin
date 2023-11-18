import React, { useEffect, useState } from 'react'
import Container from '../components/container/Container'
import Images from '../components/images/Images'
import coverImg from '../assets/cover.jpg'
import SR from '../assets/sr.jpg'
import Hadding from '../components/hadding/Hadding'
import Paragraph from '../components/paragraph/Paragraph'
import {FaLinkedin} from 'react-icons/fa'
import {IoIosSend } from 'react-icons/io'
import {AiOutlineClose} from 'react-icons/ai'
import {BsBrowserChrome} from 'react-icons/bs'
import {BiLogoUpwork,BiSolidEditAlt} from 'react-icons/bi'
import {IoMdSchool} from 'react-icons/io'
import Button from '../components/button/Button'
import Modal from 'react-modal';
import { getDatabase, ref, onValue, set } from "firebase/database";
import { useSelector } from 'react-redux'

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width:'500px',
      background:'black',
    },
  };
  Modal.setAppElement('#root');

const Profile = () => {
    const db = getDatabase();
    const [upProfile,setUpProfile]=useState({name:'',discription:''})
    let {name,discription}=upProfile
    const [profile,setProfile]=useState([])
    const [profileOpen, setProfileOpen] = React.useState(false);
    const [aboutOpen, setAboutOpen] = React.useState(false);
    const [about,setAbout]=useState('')
    const [aboutUp,setAboutUp]=useState([])
    let subtitle;
    let userInfo=useSelector(state=>state.user.value)

    useEffect(()=>{
        const updateProfileRef = ref(db, 'updateProfile');
        onValue(updateProfileRef, (snapshot) => {
            let array=[]
            snapshot.forEach((item)=>{
                if(userInfo.uid==item.val().upId){
                    array.push(item.val())
                }

            })
            setProfile(array)
        });
        // about data
        const aboutRef = ref(db, 'updateAbout');
        onValue(aboutRef, (snapshot) => {
            let array=[]
            snapshot.forEach((item)=>{
                if(userInfo.uid==item.val().upId){
                    array.push(item.val())
                }

            })
            setAboutUp(array)
        });
    },[])
    // about profile input change
    const handleChang =(e)=>{
        setUpProfile({...upProfile,[e.target.name]:e.target.value})
    }
// handle profile update
    const handleUpSubmit =(e)=>{
        set(ref(db, 'updateProfile/'+userInfo.uid), {
          name:upProfile.name,
          discription:upProfile.discription,
          upId:userInfo.uid
        }).then(()=>{
            setProfileOpen(false);
        })
        e.preventDefault()
    }

    function profileModal() {
        setProfileOpen(true);
        // setUpProfile({name:`${name}`,discription:`${discription}`})
      }
      function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#fff';
      }
      function closeModal() {
        setProfileOpen(false);
      }
      
    //   handle about update 
    const handleAbout =()=>{
        setAboutOpen(true);
    }
    function afterOpenModal() {
        subtitle.style.color = '#fff';
    }
    function closeModal() {
        setAboutOpen(false);
    }
    // handle about input  change
    const handleAboutChange =(e)=>{
        setAbout(e.target.value);
    }
//    handle about click
const handleAboutClick =()=>{
    // if(!about){

    // }
    set(ref(db, 'updateAbout/'+userInfo.uid), {
        aboutText:about,
        upId:userInfo.uid
      }).then(()=>{
        setAboutOpen(false);
      })
}

  return (
    <div>
        <Container>
            <div className='relative'>
                <Images className='h-60' src={coverImg}/>
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
                            <div className="flex gap-5 items-center mb-10">
                                {profile.length==0
                                    ?<Hadding text={userInfo.displayName}/>
                                    :profile.map((item)=>(
                                        <div key={item.upId}>
                                            <Hadding text={item.name}/>
                                        </div>
                                    ))
                                }
                                <FaLinkedin className='text-4xl text-primary'/>
                                <BiSolidEditAlt onClick={profileModal} className='text-3xl cursor-pointer' />
                            </div>
                            <div className='flex gap-3'>
                                <IoIosSend className='text-primary'/>
                                <Paragraph text='Saint Petersburg, Russian Federation'/>
                            </div>
                    </div>
                    {profile.length==0
                        ?<Paragraph text='write a description '/>
                        :profile.map((item)=>(
                            <div key={item.upId}>
                                <Paragraph text={item.discription}/>
                            </div>
                        ))
                    }
                    <Button className='mt-10' text='Contact Me'/>
                </div>
            </div>
            <div className="flex gap-2 py-10 my-10 bg-gray-200 justify-center">
                <Paragraph className='w-60 py-5 text-center bg-white text-primary hover:text-white hover:bg-primary' text='PROFILE'/>
                <Paragraph className='w-60 text-center py-5 bg-white text-primary hover:text-white hover:bg-primary' text='FRIENDS'/>
                <Paragraph className='w-60 text-center py-5 bg-white text-primary hover:text-white hover:bg-primary' text='POST'/>
            </div>
            {/*============ about me ===========*/}
            <div className='bg-gray-900 p-10 my-10 text-white relative'>
            <BiSolidEditAlt onClick={handleAbout} className='absolute top-10 right-10 cursor-pointer text-3xl'/>
                <Hadding text='About Me'/>
                {aboutUp&&aboutUp.map((item)=>(
                    <div key={item.upId}>
                        <Paragraph className='my-5 pr-10 text-white' text={item.aboutText}/>
                    </div>
                ))}
                <Button text='Read more'/>
            </div>
            {/*================ project ============= */}
            <div className='bg-gray-900 p-10 my-10 text-white relative'>
            <BiSolidEditAlt className='absolute top-10 right-10 cursor-pointer text-3xl'/>
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
            {/*============ Experience ===============*/}
            <div className='bg-gray-900 p-10 my-10 text-white relative'>
                <BiSolidEditAlt className='absolute top-10 right-10 cursor-pointer text-3xl'/>
                <Hadding className='my-10' text='Experience'/>
                <div className="grid grid-cols-7 my-10">
                    <div className="col-span-1">
                        <div className='p-5 bg-primary rounded-full inline-block'>
                            <BsBrowserChrome className='text-5xl inline-block'/>
                        </div>
                    </div>
                    <div className="col-span-6">
                        <Paragraph className='font-bold text-2xl' text='Freelance UX/UI designer'/>
                        <div className="flex gap-5 my-3">
                            <Paragraph text='Self Employed'/>
                            <Paragraph text='Around the world'/>
                        </div>
                        <div className="flex gap-5 my-3">
                            <Paragraph text='Jun 2016 — Present'/>
                            <Paragraph link='3 yrs 3 mos'/>
                        </div>
                        <Paragraph text='Work with clients and web studios as freelancer.  Work in next areas: eCommerce web projects; creative landing pages; iOs and Android apps; corporate web sites and corporate identity sometimes.'/>
                    </div>
                </div>
                {/* ///// */}
                <div className="grid grid-cols-7 my-10">
                    <div className="col-span-1">
                        <div className='p-5 bg-primary rounded-full inline-block'>
                            <BiLogoUpwork className='text-5xl inline-block'/>
                        </div>
                    </div>
                    <div className="col-span-6">
                        <Paragraph className='font-bold text-2xl' text='Freelance UX/UI designer'/>
                        <div className="flex gap-5 my-3">
                            <Paragraph text='Self Employed'/>
                            <Paragraph text='Around the world'/>
                        </div>
                        <div className="flex gap-5 my-3">
                            <Paragraph text='Jun 2016 — Present'/>
                            <Paragraph link='3 yrs 3 mos'/>
                        </div>
                        <Paragraph text='Work with clients and web studios as freelancer.  Work in next areas: eCommerce web projects; creative landing pages; iOs and Android apps; corporate web sites and corporate identity sometimes.'/>
                    </div>
                </div>
            </div>
            {/*=============== Education =============*/}
            <div className='bg-gray-900 p-10 my-10 text-white relative'>
            <BiSolidEditAlt className='absolute top-10 right-10 cursor-pointer text-3xl'/>
                <Hadding className='my-10' text='Education'/>
                <div className="grid grid-cols-7 my-10">
                    <div className="col-span-1">
                        <div className='p-5 bg-primary rounded-full inline-block'>
                            <IoMdSchool className='text-5xl inline-block'/>
                        </div>
                    </div>
                    <div className="col-span-6">
                        <Paragraph className='font-bold text-2xl' text='Moscow State Linguistic University'/>
                        <Paragraph className='my-3' text={`Bachelor's degree Field Of StudyComputer and Information Systems Security/Information Assurance`}/>
                        <Paragraph className='my-3' text='2013 — 2017'/>
                        <Paragraph text='Additional English classes and UX profile courses​.'/>
                    </div>
                </div>
            </div>
        </Container>
        {/*============profile modal============  */}
        <Modal
        isOpen={profileOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div onClick={closeModal} className='text-xl cursor-pointer text-white'>
            <AiOutlineClose />
        </div>
        <Hadding className='text-center py-3 text-white' text='updete your profile'/>
        <form onSubmit={handleUpSubmit} className='p-5 text-center'>
            <div>
                <Paragraph text='name :' className='py-2'/>
                <input type='text' name='name' className='ring py-2 px-5 w-full' placeholder='name' onChange={handleChang} value={name} />
            </div>
            <div>
                <Paragraph text='discription :' className='py-2'/>
                <input type='text' name='discription' className='ring py-2 px-5 w-full' placeholder='discription' onChange={handleChang} value={discription} />
            </div>
            <Button className='mt-5' text='update'/>
        </form>
        </Modal>
      {/*============about modal============  */}
      <Modal
        isOpen={aboutOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div onClick={closeModal} className='text-xl cursor-pointer text-white'>
            <AiOutlineClose />
        </div>
        <Hadding className='text-center py-4 text-white' text='updete your about'/>
            <div className='text-center'>
                <textarea onChange={handleAboutChange} name="aboutText" id="" cols="50" rows="10" className='bg-transparent text-white ring p-2'/>
                <Button onclick={handleAboutClick} className='mt-5' text='update'/>
            </div>
      </Modal>
    </div>
  )
}

export default Profile