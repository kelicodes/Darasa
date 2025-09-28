import { createContext, useState, useEffect } from 'react'
import axios from 'axios'


import {useNavigate} from "react-router-dom"

export const ShopContext = createContext()


export const ShopContextProvider = (props) => {
  const BASE_URL = "http://localhost:4000"

  const [token, setToken] = useState("")
  const [user, setUser] = useState([])
  const [chats, setChats] = useState([])
  const [users,setUsers]=useState([])


  const navigate=useNavigate()



  

  //
  const fetchmsg = async () => {
    try {
      const { data } = await axios.get(BASE_URL + "/chat/fetchchat", {
        headers: { Authorization: `Bearer ${token}` } 
      })
      if (data.success) {
        setChats(data.chats)
        console.log(data.chats)
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



const accessChats = async (userId) => {
  try {
    // 1️⃣ Request the backend to access or create the chat
    const { data } = await axios.post(
      `${BASE_URL}/chat/create`, // Backend now handles "access or create"
      { userId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("Chat accessed/created:", data);

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





  const Logout=async()=>{
   
    try{
      const {data}= await axios.post(BASE_URL+ "/user/logout", {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
       console.log(data)
      if(data.success){
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
    accessChats
  }

  return (
    <ShopContext.Provider value={shopValue}>
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider
