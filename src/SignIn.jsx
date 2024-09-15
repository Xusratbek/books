import React, { useEffect, useState } from 'react'
import logo1 from "./images/Rectangle 2.png"
import { Link,useNavigate } from 'react-router-dom'
function SignIn() {
    const [username,setUserName]=useState("")
    const [password,setPassword]=useState("")
    const [user,setUser]=useState("")
    const navigate=useNavigate()
    useEffect(()=>{
      let newArray=JSON.parse(localStorage.getItem("users"))
      setUser(newArray==null?[]:[...newArray])
    },[])
    const controlBtn=()=>{
        user.filter((item)=>{
            item.username==username && item.password==password
            localStorage.setItem("token",item.id)
        })
        navigate("/")
    }
  return (
    <div style={{padding:"10px"}}>
    <div style={{width:"1440px",height:"1024px",border:"1px solid white",boxShadow:"1px 1px 12px 0px rgba(0,0,0,0.75)", margin:"0 auto",backgroundImage:`url(${logo1})`,backgroundRepeat:"no-repeat"}}>
       <div style={{width:"430px",height:"434px",borderRadius:"12px", border:"none",boxShadow:"1px 1px 12px 0px rgba(0,0,0,0.75)",marginTop:"254px",marginLeft:"505px",background:"white"}}>
            <div style={{position:"relative",left:"150px",top:"48px"}}>
            <h1 >Sign In</h1>
            </div>
            <div style={{width:"374px",height:"236px",position:"relative",top:"99px",left:"28px" }}>
                <label>UserName</label>
                <input onChange={(e)=>setUserName(e.target.value)} required type="text" className='form-control mt-1' placeholder='username' />
                <label className='mt-3' >Password</label>
                <input onChange={(e)=>setPassword(e.target.value)} required type="text" className='form-control mt-1' placeholder='Enter your password'  />
                 </div>
            <div style={{width:"374px",height:"70px",position:"relative",top:"56px",left:"28px"}}>
                    <button onClick={controlBtn} style={{width:"100%", height:"40px",background:"#6200EE", color:"white", border:"none", borderRadius:"4px"}}>Button</button>
                    <div className='d-flex gap-1 justify-content-center'>
                        <Link to={"/signUp"} style={{textDecoration:"none"}}>Go to sign up</Link>
                    </div>
            </div>  
       </div>
    </div>
    </div>
  )
}

export default SignIn