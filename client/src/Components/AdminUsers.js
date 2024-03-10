import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar3 from './Navbar3';
import './AdminUser.css'

const AdminUsers = () => {
  const[r,setR]=useState(null)
   if(r==null){
    axios.get('http://localhost:8081/show',{
    }).then((res)=>{
        console.log(res.data)
        setR(res.data)
    })
   }
   function handleDelete(event){
    alert(event.currentTarget.getAttribute("ref1"))
    axios.delete('http://localhost:8081/delete',{params:{
        name: event.currentTarget.getAttribute("ref1")
    }}).then((res)=>{
        console.log(res.data)
    })
   }

   if(r!=null){
    return(
      <div>
        <Navbar3/>
        <table border={1}>
            <tr>
                <th> Name </th>
                <th> Email </th>
                <th> Phone number </th>
                <th> Delete </th>
            </tr>
            {r.map((user)=>{
                return(
                        <tr>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.phoneNumber}</td>
                            <td><button  className='delete-user' ref1={user.username} onClick={handleDelete}>Delete</button></td>
                        </tr>                                       
                )
            })} 
        </table>
        </div>
    );
    }
    else{
        return(
            <div>Fetching data... please Wait....</div>
        )
    }
    
};

export default AdminUsers;
