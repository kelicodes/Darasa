import {useState,useEffect,useContext} from "react"
import {ShopContext} from "../../Context/ShopContext"
import axios from "axios"
import cors from 'cors'
import "./Login.css"
import {useNavigate} from 'react-router-dom'
import {assets} from "../../assets/assets"



export const Login=(props)=>{
	const {token,setToken,BASE_URL,setUser}=useContext(ShopContext)
	const [logstate,setLogstate]=useState('signup')
	const [name,setName]=useState("")
	const [email,setEmail]=useState("")
	const [password,setPassword]=useState("")
	const [profilepic,setProfilepic]=useState()

	const navigate=useNavigate()



	const handlesubmit=async(e)=>{
		try{
			e.preventDefault()
			const formdata=new FormData()
			console.log(logstate)
			

			if(logstate === "signup"){
				formdata.append("name",name)
			    formdata.append('email',email)
			    formdata.append('password',password)
			    if(profilepic) formdata.append('profileimage',profilepic)
			   console.log(Object.fromEntries(formdata.entries()));

				const response = await axios.post(BASE_URL+ "/user/signup",formdata)
				console.log(response.data)
				if(response.data.success){
					setToken(response.data.token)
					localStorage.setItem("token",response.data.token)
					setUser(response.data.user)
					setName('')
					setEmail('')
					setPassword('')
					navigate('/')
					}
			}else if(logstate === "login"){
				formdata.append("password",password)
			    formdata.append('email',email)
				const response= await axios.post(BASE_URL + "/user/login",{
					email,
					password
				})
				console.log(response.data)
				if(response.data.success){
					setToken(response.data.token)
					localStorage.setItem("token",response.data.token)
					setUser(response.data.user)
					setName('')
					setEmail('')

					navigate('/')

				}
			}
		}catch(e){
			console.log(e)
		}
	}


	return (
		<form className="login" onSubmit={handlesubmit}>
			<p>WLECOME TO DARASA</p>
			{
				logstate === "signup" ?
				<div className="signup">
					<label htmlFor="profilepic">
				<input id="profilepic" onChange={(e)=>setProfilepic(e.target.files[0])} type="file" hidden/>
				<img  src={profilepic ? URL.createObjectURL(profilepic) : assets.upload} />
			</label>
				 <input type="text" value={name} onChange={(e)=>setName(e.target.value)}
				  placeholder="enter name"/>
				  </div>
				: ""
			}

			<input type="password" placeholder="enterpassword" value={password} onChange={(e)=>setPassword(e.target.value)}/>
			<input type="email" placeholder="entermail" value={email} onChange={(e)=>setEmail(e.target.value)}/>


			

			{
				logstate === "signup" ?
				<p  onClick={()=>setLogstate("login")}>Have an acc?<span>Login</span>here</p> :
				 <p onClick={()=>setLogstate("signup")}>Dont have an acc? <span>Sign up here</span></p>
			}
			<button className="btn" type="submit">SUBMIT</button>
		</form>)
}


export default Login