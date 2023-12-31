import React, { useEffect, useState,createRef } from 'react'
import Container from '../components/container/Container'
import Images from '../components/images/Images'
import coverImg from '../assets/cover.jpg'
import SR from '../assets/sr.jpg'
import Paragraph from '../components/paragraph/Paragraph'
import {FaLinkedin} from 'react-icons/fa'
import { FaPlusMinus } from "react-icons/fa6";
import {IoIosSend } from 'react-icons/io'
import {AiOutlineClose,AiFillDelete } from 'react-icons/ai'
import {BsBrowserChrome} from 'react-icons/bs'
import {BiLogoUpwork,BiSolidEditAlt} from 'react-icons/bi'
import {IoMdSchool} from 'react-icons/io'
import Button from '../components/button/Button'
import Modal from 'react-modal';
import { getDatabase, ref as dataRef, onValue, set, push,update,remove,  } from "firebase/database";
import { useDispatch, useSelector } from 'react-redux'
import EditLogo from '../components/edit-logo/EditLogo'
import {toast } from 'react-toastify';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { getStorage, ref, uploadString,getDownloadURL} from "firebase/storage";
import Heading from '../components/heading/Heading'
import { useNavigate } from 'react-router-dom'
import { userData } from '../slices/userSlice'
import List from '../components/list/List'
import ListItem from '../components/list/ListItem'
import Footer from '../components/footer/Footer'

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width:'500px',
      background:'#111827',
    },
  };
  Modal.setAppElement('#root');

  const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

const Profile = () => {
    const db = getDatabase();
    let navigate =useNavigate()
    let userInfo=useSelector(state=>(state.user.value))
    let dispatch =useDispatch()
    const [user,setUser]=useState([])
    // profile useState
    const [upProfile,setUpProfile]=useState({name:'',discription:''})
    let {name,discription}=upProfile
    // const [profile,setProfile]=useState([])
    const [profileOpen, setProfileOpen] = React.useState(false);
    // about useState===============
    const [aboutOpen, setAboutOpen] = React.useState(false);
    const [about,setAbout]=useState('')
    const [aboutUp,setAboutUp]=useState([])
    // project useState==========
    const [projectOpen, setProjectOpen] = React.useState(false);
    // const [about,setAbout]=useState('')
    // const [aboutUp,setAboutUp]=useState([])
    // experience useState===========
    const [experienceOpen, setExperienceOpen] = React.useState(false);
    const [addExp,setAddExp]=useState({title:'',company:'',description:''})
    let {title,company,description}=addExp
    const [newExp,setNewExp]=useState([])
    // experienc edit useState===========
    const [expEdit,setExpEdit]=useState(false)
    const [expItemId,setExpItemID]=useState('')
    //Education useState===============
    const [EducationOpen, setEducationOpen] = React.useState(false);
    const [addEducation,setAddEducation]=useState({clgName:'',clgTitle:'',clgDescription:''})
    let {clgName,clgTitle,clgDescription}=addEducation
    const [NewEducation,setNewEducation]=useState([])
    const [educationId,setEducationId]=useState('')
    const [educationUp,setEducationUp]=useState(false)
    // profile img uplod useState===========
    const [profileImgOpen, setProfileImgOpen] = React.useState(false);
    // const [about,setAbout]=useState('')
    // const [aboutUp,setAboutUp]=useState([])
    // img profile uplod img cropper=======================
    const [image, setImage] = useState(defaultSrc);
    const cropperRef = createRef();
    //img uplod 
    const handleImg = (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
          files = e.dataTransfer.files;
        } else if (e.target) {
          files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
      };
 
////////////////
    let subtitle;
    const storage = getStorage();
    const storageRef = ref(storage, userInfo.uid);

    useEffect(()=>{

        if(!userInfo){
            navigate('/login')
          }else{
              navigate('/profile')
          }
          // firebase user info================
        const userRef = dataRef(db, 'users');
        onValue(userRef, (snapshot) => {
            let array=[]
            snapshot.forEach((item)=>{
                if(userInfo.uid==item.key){
                    array.push({...item.val(),id:item.key})
                }

            })
            setUser(array)
        });

        // about data
        const aboutRef = dataRef(db, 'updateAbout');
        onValue(aboutRef, (snapshot) => {
            let array=[]
            snapshot.forEach((item)=>{
                if(userInfo.uid==item.val().upId){
                    array.push(item.val())
                }

            })
            setAboutUp(array)
        });
        // new addExprerience data
        const expRef = dataRef(db, 'addExprerience');
        onValue(expRef, (snapshot) => {
            let array=[]
            snapshot.forEach((item)=>{
                if(userInfo.uid==item.val().upId){
                    array.push({...item.val(),expId:item.key})
                }

            })
            setNewExp(array)
        });
        // add education
        const educationRef = dataRef(db, 'addEducation');
        onValue(educationRef, (snapshot) => {
            let array=[]
            snapshot.forEach((item)=>{
                if(userInfo.uid==item.val().upId){
                    array.push({...item.val(),id:item.key})
                }
            })
            setNewEducation(array)
        });
    },[])
    // about profile input change
    const handleChang =(e)=>{
        setUpProfile({...upProfile,[e.target.name]:e.target.value})
    }
    //=============== handle profile=================
    const handleUpSubmit =(e)=>{
        user.map((item)=>{
            if(item.id==userInfo.uid){
                set(dataRef(db, 'users/'+userInfo.uid), {
                    ...item,
                  userName:name,
                  discription:discription,
                }).then(()=>{
                    setProfileOpen(false);
                })
            }
        })
        e.preventDefault()
    }

    function profileModal() {
        setProfileOpen(true);
        setUpProfile({name:userInfo.displayName,discription:userInfo.discription})
      }
      function profileOpenModal() {
        subtitle.style.color = '#fff';
      }
      function profileCloseModal() {
        setProfileOpen(false);
      }
      
    ///=============== handle about=================
    const handleAbout =()=>{
        setAboutOpen(true);
    }
    function aboutOpenModal() {
        subtitle.style.color = '#fff';
    }
    function aboutCloseModal() {
        setAboutOpen(false);
    }
    // handle about input  change
    const handleAboutChange =(e)=>{
        setAbout(e.target.value);
    }
    //    handle about logo click
    const handleAboutClick =()=>{
        set(dataRef(db, 'updateAbout/'+userInfo.uid), {
            aboutText:about,
            upId:userInfo.uid
        }).then(()=>{
            setAboutOpen(false);
        })
    }
    //=============== handle project=================
    const handleproject =()=>{
        setProjectOpen(true);
    }
    function projectOpenModal() {
        subtitle.style.color = '#fff';
    }
    function projectCloseModal() {
        setProjectOpen(false);
    }
    //=============== handle experience=================
    const handleExperience =()=>{
        setExperienceOpen(true);
        setExpEdit(false)
    }
    function experienceOpenModal() {
        subtitle.style.color = '#fff';
    }
    function experienceCloseModal() {
        setExperienceOpen(false);
    }
    // handle exprerience input chang
    const handleExpChange =(e)=>{
        setAddExp({...addExp,[e.target.name]:e.target.value})
    }
    // handle exprerience form submit
    const submitExp =(e)=>{
        set(push(dataRef(db, 'addExprerience')), {
            title:title,
            company:company,
            description:description,
            upId:userInfo.uid
        }).then(()=>{
            setAddExp({title:'',company:'',description:''})
            setExperienceOpen(false);
        })

        e.preventDefault()
    }
    // exprerience item edit button 
    const handleExpEdit =(item)=>{
        setExpEdit(true)
        setExperienceOpen(true);
        setAddExp({title:item.title,company:item.company,description:item.description})
        setExpItemID(item.expId);
    }
    const updateExp =(e)=>{
        update(dataRef(db, 'addExprerience/'+expItemId),{
            title:title,
            company:company,
            description:description,
            upId:userInfo.uid
        }).then(()=>{
            setAddExp({title:'',company:'',description:''})
            setExperienceOpen(false);
        })
        e.preventDefault()
    }
    // exprerience item delete button 
    const handleExpDelete =(id)=>{
        remove(dataRef(db, 'addExprerience/'+id))
    }
    // handleEducation add button
    const handleEducation =()=>{
        setEducationUp(false)
        setEducationOpen(true)
    }
    function educationOpenModal() {
        subtitle.style.color = '#fff';
    }
    function educationCloseModal() {
        setEducationOpen(false);
    }
    ///educationChange input
    const educationChange =(e)=>{
        setAddEducation({...addEducation,[e.target.name]:e.target.value})

    }
    // submitEducation
    const submitEducation =(e)=>{
        set(push(dataRef(db, 'addEducation')), {
            name:clgName,
            title:clgTitle,
            description:clgDescription,
            upId:userInfo.uid
        }).then(()=>{
            setAddEducation({clgName:'',clgTitle:'',clgDescription:''})
            setEducationOpen(false);
        })
        e.preventDefault()
    }
    // handleEducationEdit button
    const handleEducationEdit =(item)=>{
        setEducationUp(true)
        setEducationOpen(true)
        setAddEducation({clgName:item.name,clgTitle:item.title,clgDescription:item.description})
        setEducationId(item.id)
    }

    // editEducation submit
    const editEducation =(e)=>{
         update(dataRef(db, 'addEducation/'+educationId),{
            name:clgName,
            title:clgTitle,
            description:clgDescription,
            upId:userInfo.uid
        }).then(()=>{
            setAddEducation({clgName:'',clgTitle:'',clgDescription:''})
            setEducationOpen(false);
        })
        e.preventDefault()
    }

    // handleEdcutaionDelete button
    const handleEdcutaionDelete =(id)=>{
        remove(dataRef(db, 'addEducation/'+id))
    }
    // handleImgUplod 
    const handleImgUplod =()=>{
        setProfileImgOpen(true)
    }
    function profileImgOpenModal() {
        subtitle.style.color = '#fff';
    }
    function profileImgCloseModal() {
        setProfileImgOpen(false);
    }
    // img crop data
    const getCropData = () => {
        if (typeof cropperRef.current?.cropper !== "undefined"){
          const message4 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
          uploadString(storageRef, message4, 'data_url').then((snapshot) => {
            console.log('Uploaded a data_url string!');
            getDownloadURL(snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              set(dataRef(db, 'users/' + userInfo.uid), {
                userName:userInfo.displayName,
                email: userInfo.email,
                profile_picture :downloadURL
              }).then(()=>{
                localStorage.setItem('userdata',JSON.stringify({...userInfo,photoURL:downloadURL}))
                dispatch(userData({...userInfo,photoURL:downloadURL}));
                console.log('img chang');
              }).then(()=>{
                setProfileImgOpen(false)
              })
            });
          });
        }
      };

  return (
    <div className='pt-28'>
        <Container>
            <div className='relative'>
                <Images className='h-60' src={coverImg}/>
            </div>
            {/*=============== profile =============== */}
            {user.map((item)=>(
                <div key={item.id} className='bg-bg_promary py-10 grid grid-cols-4 px-10 relative'>
                    <div className="col-span-1">
                        <div onClick={handleImgUplod} className='w-60 h-60  absolute top-0 left-20 translate-y-[-20px] cursor-pointer'>
                            <Images className='h-full rounded-full ring-8 ring-bg_promary' src={item.profile_picture}/>
                        </div>
                    </div>
                    <div className="col-span-3 text-white">
                        <div className='flex justify-between'>
                                <div className="flex gap-5 items-center mb-10">
                                    <Heading text={item.userName}/>
                                    <FaLinkedin className='text-4xl text-primary'/>
                                    <EditLogo  onClick={profileModal} icone={<BiSolidEditAlt/>}/>
                                </div>
                                <div className='flex gap-3'>
                                    <IoIosSend className='text-primary'/>
                                    <Paragraph text='Saint Petersburg, Russian Federation'/>
                                </div>
                        </div>
                        {item.discription&&<Paragraph text={item.discription}/>}
                        <Button className='mt-10' text='Contact Me'/>
                    </div>
                </div>
            ))}
            <List className="flex gap-2 py-10 justify-center items-center">
                <ListItem className='px-16 py-5 text-xl bg-white text-primary hover:text-white hover:bg-primary' text='PROFILE'/>
                <ListItem className='px-16 py-5 text-xl bg-white text-primary hover:text-white hover:bg-primary' text='FRIENDS' path='/friends'/>
                <ListItem className='px-16 py-5 text-xl bg-white text-primary hover:text-white hover:bg-primary' text='POST'/>
            </List>
            {/*============ about me ===========*/}
            <div className='bg-bg_promary p-10 text-white relative'>
                <EditLogo className={`absolute top-10 right-10`} onClick={handleAbout} icone={<BiSolidEditAlt/>}/>
                <Heading text='About Me'/>
                {aboutUp&&aboutUp.map((item)=>(
                    <div key={item.upId}>
                        <Paragraph className='my-5 pr-10 text-white' text={item.aboutText}/>
                    </div>
                ))}
                <Button text='Read more'/>
            </div>
            {/*================ project ============= */}
            <div className='bg-bg_promary p-10 my-5 text-white relative'>
            <EditLogo className={`absolute top-10 right-10`} onClick={handleproject} icone={<BiSolidEditAlt/>}/>
                <Heading className='my-10' text='Porject'/>
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
            <div className='bg-bg_promary p-10 my-5 text-white relative'>
                <EditLogo className={`absolute top-10 right-10`} onClick={handleExperience} icone={<FaPlusMinus />}/>
                <Heading className='my-10' text='Experience'/>
                    {newExp&&
                        newExp.map((item)=>(
                        <div className="grid grid-cols-7 my-10 relative">
                            <EditLogo className={`absolute top-10 right-20`} onClick={()=>handleExpEdit(item)} icone={<BiSolidEditAlt />}/>
                            <EditLogo className={`absolute top-10 right-10 `} onClick={()=>handleExpDelete(item.expId)} icone={<AiFillDelete  />}/>
                            <div className="col-span-1">
                                <div className='p-5 bg-primary rounded-full inline-block'>
                                    <BsBrowserChrome className='text-5xl inline-block'/>
                                </div>
                            </div>
                            <div key={item.upId} className="col-span-6">
                                <h3 className='text-2xl text-white'>{item.title}</h3>
                                <Paragraph className='my-3' text={item.company}/>
                                <Paragraph text={item.description}/>
                            </div> 
                       </div>
                        ))
                    }
            </div>
            {/*=============== Education =============*/}
            <div className='bg-bg_promary p-10 my-5 text-white relative'>
            <EditLogo className={`absolute top-10 right-20`} onClick={handleEducation} icone={<FaPlusMinus />}/>
                <Heading className='my-10' text='Education'/>
                {NewEducation&& NewEducation.map((item)=>(
                    <div key={item.id} className="grid grid-cols-7 my-10 relative">
                        <EditLogo className={`absolute top-10 right-20`} onClick={()=>handleEducationEdit(item)} icone={<BiSolidEditAlt />}/>
                            <EditLogo className={`absolute top-10 right-10 `} onClick={()=>handleEdcutaionDelete(item.id)} icone={<AiFillDelete  />}/>
                        <div className="col-span-1">
                            <div className='p-5 bg-primary rounded-full inline-block'>
                                <IoMdSchool className='text-5xl inline-block'/>
                            </div>
                        </div>
                        <div className="col-span-6">
                            <h3 className='font-bold text-2xl'>{item.name}</h3>
                            <Paragraph className='my-3' text={item.title}/>
                            {/* <Paragraph className='my-3' text='2013 — 2017'/> */}
                            <Paragraph text={item.description}/>
                        </div>
                    </div>
                ))}
            </div>
            {/* footer */}
            <Footer/>
        </Container>
        {/*============profile modal============  */}
        <Modal
        isOpen={profileOpen}
        onAfterOpen={profileOpenModal}
        onRequestClose={profileCloseModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div onClick={profileCloseModal} className='text-xl cursor-pointer text-white'>
            <AiOutlineClose />
        </div>
        <Heading className='text-center py-3 text-white' text='updete your profile'/>
        <form onSubmit={handleUpSubmit} className='p-5 text-center text-white'>
            <div>
                <Paragraph text='name :' className='py-2'/>
                <input type='text' name='name' className='ring bg-transparent py-2 px-5 w-full' placeholder='name' onChange={handleChang} value={name} required />
            </div>
            <div>
                <Paragraph text='discription :' className='py-2'/>
                <textarea type='text' name='discription' className='ring bg-transparent py-2 px-5 w-full' cols="50" rows="5" placeholder='discription' onChange={handleChang} value={discription} required />
            </div>
            <Button className='mt-5' text='update'/>
        </form>
        </Modal>
      {/*============about modal============  */}
      <Modal
        isOpen={aboutOpen}
        onAfterOpen={aboutOpenModal}
        onRequestClose={aboutCloseModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div onClick={aboutCloseModal} className='text-xl cursor-pointer text-white'>
            <AiOutlineClose />
        </div>
        <Heading className='text-center py-4 text-white' text='updete your about'/>
            <div className='text-center'>
                <textarea onChange={handleAboutChange} name="aboutText" id="" cols="50" rows="10" className='bg-transparent text-white ring p-2' required/>
                <Button onclick={handleAboutClick} className='mt-5' text='update'/>
            </div>
      </Modal>
      {/*============project modal============  */}
      <Modal
        isOpen={projectOpen}
        onAfterOpen={projectOpenModal}
        onRequestClose={projectCloseModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div onClick={projectCloseModal} className='text-xl cursor-pointer text-white'>
            <AiOutlineClose />
        </div>
        <Heading className='text-center py-4 text-white' text='updete your project'/>
        {/* <div className='text-center'>
            <textarea onChange={handleAboutChange} name="aboutText" id="" cols="50" rows="10" className='bg-transparent text-white ring p-2'/>
            <Button onclick={handleAboutClick} className='mt-5' text='update'/>
        </div> */}
      </Modal>
      {/*============Experience modal============  */}
      <Modal
        isOpen={experienceOpen}
        onAfterOpen={experienceOpenModal}
        onRequestClose={experienceCloseModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div onClick={experienceCloseModal} className='text-xl cursor-pointer text-white'>
            <AiOutlineClose />
        </div>
        <Heading className='text-center py-4 text-white' text='Add your experience'/>
            <form onSubmit={expEdit? updateExp : submitExp} action="">
                <div className='text-white my-5'>
                    <Paragraph text='Title'/>
                    <input className='bg-transparent ring py-2 px-2 w-full mt-2' type="text" name='title' placeholder='title' onChange={handleExpChange} value={title} required />
                </div>
                <div className='text-white my-5'>
                    <Paragraph text='Company'/>
                    <input className='bg-transparent ring py-2 px-2 w-full mt-2' type="text" name='company' placeholder='company' onChange={handleExpChange} value={company} required />
                </div>
                <div className='text-white my-5'>
                    <Paragraph text='description'/>
                    <textarea className='bg-transparent ring py-2 px-2 w-full mt-2' type="text" name='description' placeholder='description' cols="50" rows="5" onChange={handleExpChange} value={description} required />
                </div>
                <div className=' my-5'>
                    {expEdit
                    ?<Button text='Update'/>
                    :<Button text='Add'/>
                    }
                </div>
               
            </form>
      </Modal>
       {/*============Education modal ============  */}
       <Modal
        isOpen={EducationOpen}
        onAfterOpen={educationOpenModal}
        onRequestClose={educationCloseModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div onClick={educationCloseModal} className='text-xl cursor-pointer text-white'>
            <AiOutlineClose />
        </div>
        <Heading className='text-center py-4 text-white' text='Add your education'/>
            <form onSubmit={educationUp?editEducation:submitEducation} action="">
                <div className='text-white my-5'>
                    <Paragraph text='clgName'/>
                    <input className='bg-transparent ring py-2 px-2 w-full mt-2' type="text" name='clgName' placeholder='clgName' onChange={educationChange} value={clgName} required />
                </div>
                <div className='text-white my-5'>
                    <Paragraph text='clgTitle'/>
                    <input className='bg-transparent ring py-2 px-2 w-full mt-2' type="text" name='clgTitle' placeholder='clgTitle' onChange={educationChange} value={clgTitle} required />
                </div>
                <div className='text-white my-5'>
                    <Paragraph text='clgDescription'/>
                    <textarea className='bg-transparent ring py-2 px-2 w-full mt-2' type="text" name='clgDescription' placeholder='description' cols="50" rows="5" onChange={educationChange} value={clgDescription} required />
                </div>
                <div className=' my-5'>
                    {educationUp
                    ? <Button text='Update'/>
                    : <Button text='Add'/>
                    }
                </div>
               
            </form>
      </Modal>
      {/*============profile img uplod modal ============  */}
      <Modal
        isOpen={profileImgOpen}
        onAfterOpen={profileImgOpenModal}
        onRequestClose={profileImgCloseModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div onClick={profileImgCloseModal} className='text-xl cursor-pointer text-white'>
            <AiOutlineClose />
        </div>
        <Heading className='text-center py-4 text-white' text='profile img uplod'/>
        {/* ////////////////// */}
        <input className='cursor-pointer mb-5 w-24' onChange={handleImg} type="file" />
            <Cropper
              ref={cropperRef}
              style={{ height: 200, width: "100%" }}
              zoomTo={0.5}
              initialAspectRatio={1}
              preview=".img-preview"
              src={image}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false}
              guides={true}
            />
            <div>
              <div className="croppbox" style={{ width: "50%", float: "right" }}>
                <h1>Preview</h1>
                <div
                  className="img-preview"
                  style={{ width: "100%", float: "left", height: "300px" }}
                />
              </div>
              <div
                className="croppbox"
                style={{ width: "50%", float: "right", height: "300px" }}
              >
                <Button onclick={getCropData} className='mt-5' text='Img Uplod'/>
              </div>
            </div>
        {/* /////////////////// */}
      </Modal>
    </div>
  )
}

export default Profile