import {useState,useEfect,useContext} from "react"
import { IoHomeSharp } from "react-icons/io5";
import { LiaNetworkWiredSolid } from "react-icons/lia";
import { CgNotes } from "react-icons/cg";
import { IoVideocamSharp } from "react-icons/io5";
import {Link} from 'react-router-dom'
import "./Foot.css"


const Foot=()=>{
	return(
		<div className="foot">
			<Link to="/" className="home ofoot">

				<IoHomeSharp className="footicon" />
			</Link>
            <Link to="/Notes" className="Notes ofoot">
	          
	             <CgNotes className="footicon" />
            </Link>
            <Link to="/projects" className="project ofoot">
	             
	             <LiaNetworkWiredSolid className="footicon" />
            </Link>
			<Link to="/eclass" className="e-class ofoot">
			
				<IoVideocamSharp className="footicon" />
			</Link>
		</div>)
}


export default Foot