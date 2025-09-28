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
				<p>Home</p>
				<IoHomeSharp className="footicon" />
			</Link>
            <Link to="/Notes" className="Notes ofoot">
	             <p>Notes</p>
	             <CgNotes className="footicon" />
            </Link>
            <Link to="/projects" className="project ofoot">
	             <p>Projects</p>
	             <LiaNetworkWiredSolid className="footicon" />
            </Link>
			<Link to="/eclass" className="e-class ofoot">
				<p>E-class</p>
				<IoVideocamSharp className="footicon" />
			</Link>
		</div>)
}


export default Foot