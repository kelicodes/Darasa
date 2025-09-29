import {useState,useEffect,useContext} from 'react'
import {ShopContext} from "../../Context/ShopContext"
import { IoMenuSharp } from "react-icons/io5";
import {assets} from "../../assets/assets"
import {toast} from 'react-toastify'
import { BsFillMoonStarsFill } from "react-icons/bs";
import { BsSunFill } from "react-icons/bs";
import "./Nav.css"


const Nav=(props)=>{
	const {user,Logout}=useContext(ShopContext)
	const [theme,setTheme]=useState('dark')

	const myuser=JSON.parse(localStorage.getItem('user'));


	useEffect(()=>{
		document.documentElement.setAttribute("data-theme",theme)
	},[theme])


	console.log(theme)


	
	


	return (<>
		<div className="nav">
			<img
  src={myuser?.profilepic || assets.upload}
  alt="profile"
/>


			<p className="DARASA"> DARASA</p>


			<div onClick={()=>setTheme(theme === "light" ? "dark" : "light")} className="dark">
				{
					theme === "dark" ? <BsFillMoonStarsFill /> : <BsSunFill />
				}
			</div>

			<IoMenuSharp onClick={Logout} className="icon" />
		</div>
	</>)
}


export default Nav