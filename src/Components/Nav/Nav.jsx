import {useState,useEffect,useContext} from 'react'
import {ShopContext} from "../../Context/ShopContext"
import { IoMenuSharp } from "react-icons/io5";
import {assets} from "../../assets/assets"
import "./Nav.css"


const Nav=(props)=>{
	const {user,Logout}=useContext(ShopContext)


	return (<>
		<div className="nav">
			<img src={user.profilepic}  />

			<p className="DARASA"> DARASA</p>

			<IoMenuSharp onClick={Logout} className="icon" />
		</div>
	</>)
}


export default Nav