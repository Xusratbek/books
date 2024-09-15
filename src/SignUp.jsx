import React, { useState } from 'react'
import logo1 from "./images/Rectangle 2.png"
import { Link, json } from 'react-router-dom'
import {useForm} from "react-hook-form"
import axios from 'axios'
function SignUp() {
    const [users,setUsers]=useState([])
    const {handleSubmit,register,reset}=useForm()
    const [fileImg,setFileImg]=useState("")
    const handleImg=(e)=>{
    let newFolder=new FileReader()
    newFolder.readAsDataURL(e)
    newFolder.onload=()=>{
      setFileImg(newFolder.result)
    }
    }
    const mySubmit=(data)=>{
        if(data.password==data.repeatpassword){
            delete data.repeatpassword
            data.image=fileImg
            axios({
                url:"http://localhost:8080/users",
                method:"post",
                data:data
            }).then((res)=>{
                localStorage.setItem("rasm",JSON.stringify(res.data.image))
                console.log(res.data.image)
                users.push(res.data)
                setUsers(users)
                localStorage.setItem("users",JSON.stringify(users))
                alert("qoshildi")
            })
        }
        else{
            alert("xatolik")
        }
        reset()
    }
  return (
    <div style={{padding:"10px"}}>
    <div style={{width:"1440px",height:"1024px",border:"1px solid",margin:"0 auto",backgroundImage:`url(${logo1})`,backgroundRepeat:"no-repeat"}}>
       <div style={{width:"430px",height:"618px",borderRadius:"12px", border:"none",boxShadow:"1px 1px 12px 0px rgba(0,0,0,0.75)",marginTop:"254px",marginLeft:"505px",background:"white"}}>
            <div style={{position:"relative",left:"150px",top:"48px"}}>
            <h1 >Sign Up</h1>
            </div>
            <form onSubmit={handleSubmit(mySubmit)}>
            <div style={{width:"374px",height:"236px",position:"relative",top:"99px",left:"28px" }}>
                <label>UserName</label>
                <input {...register("username")} required type="text" className='form-control mt-1' placeholder='username' />
                <label className='mt-3' >Password</label>
                <input {...register("password")} required type="text" className='form-control mt-1' placeholder='Enter your password'  />
                <label className='mt-3'>Confirm password</label>
                <input {...register("repeatpassword")} required type="text" className='form-control mt-1' placeholder='enter your confirm password' />
                <label className='mt-3' >Select Image</label>
                <input onChange={(e)=>handleImg(e.target.files[0])} className='mt-1' type="file" />
            </div>
            <div style={{width:"374px",height:"70px",position:"relative",top:"176px",left:"28px"}}>
                    <button style={{width:"100%", color:"white", height:"40px",background:"#6200EE", border:"none", borderRadius:"4px"}}>Submit</button>
                    <div className='d-flex gap-1 justify-content-center'>
                        <Link to={"/signIn"}  style={{textDecoration:"none"}}>Go to sign in</Link>
                    </div>
            </div>  
            </form>
       </div>
    </div>
    </div>
  )
}

export default SignUp