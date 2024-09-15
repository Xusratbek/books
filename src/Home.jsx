import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import logo1 from "./images/Rectangle 2.png"
import logo2 from "./images/Frame 1.svg"
import logo3 from "./images/profile_photo.svg"
import logo4 from "./images/logo.svg"
import logo5 from "./images/yozuv.svg"
import logo6 from "./images/Icon.svg"
import {useForm} from "react-hook-form"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Home() {
  const {handleSubmit,register,reset}=useForm()
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [todos,setTodos]=useState([])
  const [editingIndex,setEditingIndex]=useState("")
  const navigate=useNavigate()
  let blockPage= ['/app','/payments','/products']


  useEffect(()=>{
    if(blockPage.includes(location.pathname)){
      let token=localStorage.getItem("token")
      axios({
        url:'http://localhost:8080/users/'+token,
        method:"get"
      }).then((res)=>{

      }).catch((err)=>{
        navigate('/404')
      })
    }
  },[location.pathname])

  
  useEffect(()=>{
    getBooks()
  },[])
  const getBooks=()=>{
    axios({
      url:"http://localhost:8080/books",
      method:"get"
    }).then((res)=>{
      setTodos([...res.data])
    })
  }
  const mySubmit=(data)=>{
    if(data.bookname!=""){
      data.id=todos.length==0?1 :todos[todos.length-1].id+1,
      data.year=2012
      data.category="New"
      axios({
        url:"http://localhost:8080/books",
        method:"post",
        data:data
      }).then((res)=>{
        getBooks()
        
      })
    }
    else{
      alert("xatolik")
    }
        reset()
        handleClose()
  }
  const changeStatus=(category)=>{
    todos[editingIndex].category=category
    setEditingIndex("")
    setTodos([...todos])
  }
  const getIndex=(index)=>{
    setEditingIndex(index)
  }
const handleDelete=(id)=>{
  console.log(id);
    axios({
      url:"http://localhost:8080/books/"+id,
      method:"delete"
    }).then((res)=>{
      getBooks()
    })
}
const setSearchInput=(e)=>{
    axios({
      url:"http://localhost:8080/books?bookname_like="+e,
      method:"get"
    }).then((res)=>{
      setTodos([...res.data])
    })
}
let rasm=JSON.parse(localStorage.getItem("rasm"))
console.log(rasm);

  return (
    <div style={{width:"1440px",height:"1024px",border:"1px solid",margin:"0 auto",backgroundImage:`url(${logo1})`,backgroundRepeat:"no-repeat"}}>
        <div style={{width:"100%",height:"72px",display:"flex",alignItems:"center",justifyContent:"space-around"}}>
        <div style={{width:"554px",height:"48px",display:"flex",gap:"24px",alignItems:"center"}}>
          <div style={{width:"150px",height:"36px"}}>
                <img src={logo4} alt="" />
          </div>
          <input onChange={(e)=>setSearchInput(e.target.value)} type="text" className='form-control w-380' />
</div>
<div style={{width:"80px",height:"32px",marginLeft:"250px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div style={{width:"24px",height:"24px"}}>
<img src={logo2} alt="#404" />
</div>
<div style={{width:"32px",height:"32px",border:"5px solid #FD648E",borderRadius:"50%"}}>
    <img style={{width:"23.5px",height:"23.5px",borderRadius:"50%",position:'relative',top:"-3.5px",left:"-0.5px"}} src={rasm}
      
    alt="#404" />
</div>
</div>
        </div>
        <div style={{width:"1180px",display:"flex", justifyContent:"space-between", height:"45px",marginLeft:"130px",marginTop:"36px"}}>
                <div style={{width:"304px",height:"45px"}}>
                      <img src={logo5} alt="" />
                </div>
                <button onClick={handleShow} style={{width:"181px",height:"40px", border:"none",borderRadius:'4px',background:"#6200EE",fontFamily: "Mulish",
fontSize: "16px",fontWeight: "500",lineHeight: '20.08px',textAlign: "center",color:"white"
}}>
                   Create a book
                </button>
        </div>
        <div style={{width:"200px", color:"white", height:"25px",marginTop:"2px",marginLeft:"130px"}}>
        Your books today
        </div>
        <div style={{padding:"10px", marginTop:"30px",  width:"1180px",marginLeft:"125px",display:"flex",gap:"20px"}}>
                  <div onDragOver={(e)=>e.preventDefault()} onDrop={()=> changeStatus("New")} style={{width:"380px",height:"content",borderRadius:"12px" }}>
                    {
                      
                      todos.map((todo,index)=>{
                        if(todo.category=="New"){
                        return <div draggable onDrag={()=>getIndex(index)} style={{width:"380px", padding:"20px", height:"200px", background:"white",  border:"1px solid",borderRadius:"12px"}}>
                           <br />
                           
                           <div style={{font:"Montserrat",fontWeight:600,fontSize:"16px",}}>{todo.bookname}</div> 
                           <div>Cover: {todo.link}</div>
                           <div>Id:{todo.id}</div>
                           <div>Published:{todo.year}</div>
                           
                           <div style={{display:"flex",justifyContent:"space-between",marginTop:"10px"}}>
                                  <div>Eben Upton/2012</div>
                                  <div style={{ textAlign:"center",color:"white",borderRadius:"7px", width:"60px",height:"25px",background:"red"}}>{todo.category}</div>
                           </div>
                           <button onClick={()=>handleDelete(todo.id)}  style={{position:"relative",top:"-175px",left:"320px"}} className='btn btn-danger'>
                     <img src={logo6} alt="" />
                    </button>
                        </div>
                          
                      }
                     
                            
})
                    }
                  </div>
                  <div onDragOver={(e)=>e.preventDefault()} onDrop={()=>{ return changeStatus("reading")}}  style={{width:"380px",height:"content",borderRadius:"12px" }}>
                  {
                              todos.map((todo,index)=>{
                                  if(todo.category=="reading"){
                                    return <div draggable onDrag={()=>getIndex(index)} style={{width:"380px", padding:"20px", height:"200px", background:"white",  border:"1px solid",borderRadius:"12px"}} key={index}>
                                        <br />
                           <div style={{font:"Montserrat",fontWeight:600,fontSize:"16px",}}>{todo.bookname}</div> 
                           <div>Cover: {todo.link}</div>
                           <div>Id:{todo.id}</div>
                           <div>Published:{todo.year}</div>
                           <div style={{display:"flex",justifyContent:"space-between",marginTop:"10px"}}>
                                  <div>Eben Upton/2012</div>
                                  <div style={{ textAlign:"center",color:"black",borderRadius:"7px", width:"60px",height:"25px",background:"yellow"}}>{todo.category}</div>
                           </div>
                           <button onClick={()=>handleDelete(todo.id)} style={{position:"relative",top:"-175px",left:"320px"}} className='btn btn-danger'>
                     <img src={logo6} alt="" />
                    </button>
                                    </div>
                                  }
                              })
                            }
                  </div>
                  <div onDragOver={(e)=>e.preventDefault()} onDrop={()=>{ return  changeStatus("finished")}} style={{width:"380px",height:"content",borderRadius:"12px" }}>
                            {
                              todos.map((todo,index)=>{
                                  if(todo.category=="finished"){
                                    return <div draggable onDrag={()=>getIndex(index)} style={{width:"380px", padding:"20px", height:"200px", background:"white",  border:"1px solid",borderRadius:"12px"}} key={index}>
                                        <br />
                           <div style={{font:"Montserrat",fontWeight:600,fontSize:"16px",}}>{todo.bookname}</div> 
                           <div>Cover: {todo.link}</div>
                           <div>Id:{todo.id}</div>
                           <div>Published:{todo.year}</div>
                           <div style={{display:"flex",justifyContent:"space-between",marginTop:"10px"}}>
                                  <div>Eben Upton/2012</div>
                                  <div style={{ textAlign:"center",color:"white",borderRadius:"7px", width:"60px",height:"25px",background:"green"}}>{todo.category}</div>
                           </div>
                           <button onClick={()=>handleDelete(todo.id)} style={{position:"relative",top:"-175px",left:"320px"}} className='btn btn-danger'>
                     <img src={logo6} alt="" />
                    </button>
                                    </div>
                                  }
                              })
                            }      
                 
                    
                    
                    </div>      
        </div>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(mySubmit)}>
          <label >Link</label>
          <input required {...register("link")} type="text" className='form-control' placeholder='link' />
          <label className='mt-2' >Book Name</label>
          <input required {...register("bookname")} placeholder='book name' type="text" className='form-control' />
          <div className=' mt-3 d-flex gap-2 justify-content-end'>
            <button className='btn btn-outline-danger'>Close</button>
            <button className='btn btn-outline-primary'>Save</button>
          </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
    
  )
}
export default Home


