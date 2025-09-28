import {useState,useEffect,useContext} from "react"
import Nav from "../../Components/Nav/Nav"
import Chat from "../../Components/Chat/Chat"
import Chatdisp from "../../Components/Chatdisp/Chatdisp"
import {Routes,Route} from 'react-router-dom'


 const Home=()=>{
	return (
		<div className="Home">
		<Routes>
		<Route path='/chats' element={<Chatdisp/>}/>
		</Routes>
		</div>)
}


export default Home