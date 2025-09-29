import { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'


import {useNavigate} from "react-router-dom"

export const ShopContext = createContext()


export const ShopContextProvider = (props) => {
  const BASE_URL = "https://backdarasa-1.onrender.com"

  const [token, setToken] = useState("")
  const [user, setUser] = useState([])
  const [chats, setChats] = useState([])
  const [users,setUsers]=useState([])
  const [groups,setGroups]=useState([])


  const navigate=useNavigate()



  

  //
  const fetchmsg = async () => {
    try {
      const { data } = await axios.get(BASE_URL + "/chat/fetchchat", {
        headers: { Authorization: `Bearer ${token}` } 
      })
      if (data.success) {
        setChats(data.chats)
        
      }
    } catch (e) {
      console.log(e)
    }
  }


  const fetchusers=async()=>{
    try{
      const { data } = await axios.get(BASE_URL + "/user/allusers", {
        headers: { Authorization: `Bearer ${token}` } 
      })

      if(data.success){
        setUsers(data.users)
      }
    }catch (e) {
      console.log("Error fetching users", e)
    }
  }


  const fetchgroups=async()=>{
    try{
      const {data} = await axios.get(
         `${BASE_URL}/chat/fetchgroups`, // Backend now handles "access or create"
    
      { headers: { Authorization: `Bearer ${token}` } }
        )


      if(data.success){
        setGroups(data.groups)
        console.log(data.groups)
      }
    }catch(e){
      console.log("Error fetching groups", e)
    }
  }



  const createGrp = async ({ name, users }) => {
  try {
    const { data } = await axios.post(
      `${BASE_URL}/chat/creategrp`,
      { name, users },
      { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
    );

    if (data.success) {
      toast.success(data.message);
      setGroups(prev => [...prev, data.fullGroupChat]);

      // Navigate to the group page with group info
      navigate(`/group/${data.fullGroupChat._id}`, { state: { group: data.fullGroupChat } });
    }
  } catch (e) {
    console.log("Error creating group", e);
    toast.error("Failed to create group");
  }
};







const accessChats = async (userId) => {
  try {
    // 1️⃣ Request the backend to access or create the chat
    const { data } = await axios.post(
      `${BASE_URL}/chat/create`, // Backend now handles "access or create"
      { userId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

  
    // 2️⃣ Add the chat to state if it's not already there
    if (data && data._id) {
      setChats((prev) => {
        if (prev.find((c) => c._id === data._id)) return prev;
        return [...prev, data];
      });

      // 3️⃣ Navigate to the chat
      navigate(`/chat/${data._id}`);
    }
  } catch (e) {
    console.log("accessChats failed", e);
  }
};


const accessGroups = async (groupId) => {
  try {
    const { data } = await axios.post(
      `${BASE_URL}/chat/accessgroups`,
      { groupId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log(data.group)

    if (data.success) {
      toast.success(data.message);


      setGroups((prev) => {
        if (prev.find((g) => g._id === data.group._id)) return prev;
        return [...prev, data.group];
      });

      navigate(`/group/${data.group._id}`, { state: { group: data.group } });
    }
  } catch (e) {
    console.log("accessGroups failed", e);
    toast.error("Failed to access group");
  }
};






  const Logout=async()=>{
   
    try{
      const {data}= await axios.post(BASE_URL + "/user/logout", {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
       
      if(data.success){
        toast.success(data.message)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
        setToken('')
        setChats([])
        setUsers([])
      }else{
        console.log("logout failed",data.message)
      }
    }catch(e){
      console.log('logout failed',e)
    }
  }




 

useEffect(() => {
  const savedToken = localStorage.getItem("token")
  const savedUser = localStorage.getItem("user")
  if (savedToken) setToken(savedToken)
  if (savedUser) setUser(JSON.parse(savedUser))
}, [])


useEffect(()=>{
  if(token){
    fetchmsg()
    fetchusers()
    fetchgroups()

  }
},[token])


  const shopValue = {
    BASE_URL,
    token,
    setToken,
    user,
    setUser,
    chats,
    setChats,
    fetchmsg,
    Logout,
    users,
    accessChats,
    groups,
    createGrp,
    accessGroups
  }

  return (
    <ShopContext.Provider value={shopValue}>
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider
