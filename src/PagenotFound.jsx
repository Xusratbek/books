import React from 'react'
import logo1 from "./images/Rectangle 2.png"
import logo2 from "./images/404.png"
import { Link } from 'react-router-dom'
function PagenotFound() {
  return (
    <div style={{padding:"10px"}}>
    <div style={{width:"1440px",height:"1024px",border:"1px solid white",boxShadow:"1px 1px 12px 0px rgba(0,0,0,0.75)", margin:"0 auto",backgroundImage:`url(${logo1})`,backgroundRepeat:"no-repeat"}}>
       <div style={{width:"720px",height:"476px",marginTop:"218px",marginLeft:"360px"}}>
        <img src={logo2} alt="" />
       </div>
       <div style={{display:"flex",justifyContent:"center",marginTop:"40px"}}>
        <Link className='btn btn-primary' to={"/"}>Go Home Page</Link>
       </div>
    </div>
    </div>
  )
}

export default PagenotFound