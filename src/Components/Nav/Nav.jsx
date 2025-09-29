import {useState,useEffect,useContext} from 'react'
import {ShopContext} from "../../Context/ShopContext"
import { IoMenuSharp } from "react-icons/io5";
import {assets} from "../../assets/assets"
import {toast} from 'react-toastify'
import "./Nav.css"


const Nav=(props)=>{
	const {user,Logout}=useContext(ShopContext)

	const myuser=JSON.parse(localStorage.getItem('user'));


	
	


	return (<>
		<div className="nav">
			<img
  src={myuser?.profilepic || assets.upload}
  alt="profile"
/>


			<p className="DARASA"> DARASA</p>

			<IoMenuSharp onClick={Logout} className="icon" />
		</div>
	</>)
}


export default Nav