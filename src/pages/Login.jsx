import React,{useState} from 'react'
import Hadding from '../components/hadding/Hadding'
import {FaLinkedin} from 'react-icons/fa'
import {AiFillEyeInvisible,AiFillEye} from 'react-icons/ai'
import Button from '../components/button/Button'
import Paragraph from '../components/paragraph/Paragraph'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import { RotatingLines } from 'react-loader-spinner'
import {toast } from 'react-toastify';

const Login = () => {
  const auth = getAuth();
  const [inputValue,setInputValue]=useState({email:'',password:''})
  let {email,password}=inputValue
  const [passworeShow,setPasswordShow]=useState(false)
  const [lodding,setLodding]=useState(false)
  // all error state
  const [emailError,setEmailError]=useState('')
  const [passwordError,setPasswordError]=useState('')
  let navigate =useNavigate()

  // input change
  const handleChange =(e)=>{
    setInputValue({...inputValue,[e.target.name]:e.target.value})
    if(e.target.name=='email'){
      setEmailError('')
    }
    if(e.target.name=='password'){
      setPasswordError('')
    }
  }
 // form submit
 const handleSubmit =(e)=>{
    if(!email){
      setEmailError('please inter your email')
    }
    if(!password){
      setPasswordError('please inter your passwod')
    }
    if(email&&password){
      setLodding(true)
      setInputValue({email:'',password:''})
      signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        setLodding(false)
        if(user.user.emailVerified){
          navigate('/home')
        }else{
            toast.error('🦄 please your email varify', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
        }
      })
      .catch((error) => {
        setLodding(false)
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        if(errorMessage.includes('auth')){
          toast.error('🦄 invaild email !', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      });
    }
    e.preventDefault()
 } 



  return (
    <div className='grid justify-center items-center bg-gray-900 h-screen'>
      <div className='bg-white p-10 text-center'>
        <FaLinkedin className='inline-block mx-auto text-4xl text-primary mb-10'/>
        <Hadding text={`Get started with easily`} span=' login'/>
        <form onSubmit={handleSubmit} className='my-10' action="">
          <div>
            <input className='w-full py-3 px-5 ring ring-primary focus-visible:ring-0 my-5' onChange={handleChange} type="email" name='email' value={email} placeholder='email'/>
            {emailError&& <Paragraph className='text-red-500' text={emailError}/>}
          </div>
          <div>
          <div className='relative'>
            <input className='w-full py-3 px-5 ring ring-primary focus-visible:ring-0 my-5' onChange={handleChange} type={passworeShow ? 'text' : 'password'} name='password' value={password} placeholder='password'/>
              {passworeShow 
                ? <AiFillEye onClick={()=>setPasswordShow(false)} className='absolute top-1/2 right-5 translate-y-[-50%] cursor-pointer' /> 
                :<AiFillEyeInvisible onClick={()=>setPasswordShow(true)} className='absolute top-1/2 right-5 translate-y-[-50%] cursor-pointer' />
              }
          </div>
            {passwordError&& <Paragraph className='text-red-500 mb-3' text={passwordError}/>}
          </div>
          {lodding 
              ?<Button className='bg-primary px-12'text={<RotatingLines
                strokeColor="white"
                strokeWidth="1"
                animationDuration="0.75"
                width="30"
                visible={true}
              />}/>
              :<Button  text='Sing Up'/>
            }
        </form>
        <Paragraph text='Dont have an acount ? ' link='Register' path='/'/>
      </div>
    </div>
  )
}

export default Login