import {useState,useEffect,useContext} from "react"
import {ShopContext} from "../../Context/ShopContext"
import axios from "axios"
import cors from 'cors'
import "./Login.css"
import {useNavigate} from 'react-router-dom'
import {assets} from "../../assets/assets"
import {toast} from "react-toastify"



export const Login=(props)=>{
	const {token,setToken,BASE_URL,setUser}=useContext(ShopContext)
	const [logstate,setLogstate]=useState('signup')
	const [name,setName]=useState("")
	const [email,setEmail]=useState("")
	const [password,setPassword]=useState("")
	const [profilepic,setProfilepic]=useState()

	const navigate=useNavigate()



	const handlesubmit = async (e) => {
  e.preventDefault();
  try {
    if (logstate === "signup") {
      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("email", email);
      formdata.append("password", password);
      if (profilepic) formdata.append("profileimage", profilepic);

      const response = await axios.post(BASE_URL + "/user/signup", formdata, {
        withCredentials: true,
      });

      if (response.data.success) {
        setToken(response.data.token);
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setUser(response.data.user);
        setName("");
        setEmail("");
        setPassword("");
        setProfilepic(null);
        navigate("/");
      } else {
        toast.error(response.data.message || "Signup failed");
        // clear inputs if signup failed
        setName("");
        setEmail("");
        setPassword("");
        setProfilepic(null);
      }
    } else if (logstate === "login") {
      const response = await axios.post(
        BASE_URL + "/user/login",
        { email, password },
        { withCredentials: true }
      );

      if (response.data.success) {
        setToken(response.data.token);
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setUser(response.data.user);
        setName("");
        setEmail("");
        setPassword("");
        navigate("/");
      } else {
        toast.error(response.data.message || "Login failed");
        // clear inputs if login failed
        setEmail("");
        setPassword("");
      }
    }
  } catch (err) {
    console.error("Error:", err);
    toast.error("Something went wrong, please try again");
    // clear inputs if request completely failed
    setName("");
    setEmail("");
    setPassword("");
    setProfilepic(null);
  }
};




	return (
		<form className="login" onSubmit={handlesubmit}>
			<p>WELCOME TO DARASA</p>
			{
				logstate === "signup" ?
				<div className="signup">
					<label htmlFor="profilepic">
				<input id="profilepic" onChange={(e)=>setProfilepic(e.target.files[0])} type="file" hidden/>
				<div className="image">
					<img className="theprofile"  src={profilepic ? URL.createObjectURL(profilepic) : assets.upload} />
					<p>Profile picture</p>
				</div>
			</label>
				 <input className="name" type="text" value={name} onChange={(e)=>setName(e.target.value)}
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