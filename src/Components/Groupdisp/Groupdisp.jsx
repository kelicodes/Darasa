import {useState,useEffect,useContext} from 'react'
import { ShopContext } from "../../Context/ShopContext";



const Groupdisp=()=>{


	const {chats}= useContext(ShopContext)
	console.log(chats)

	const [groups,setGroups]=useState([])


	useEffect(()=>{
		if(chats.isGroupChat){
		setGroups(...prev => prev , groups)
	}
	},[chats])


	return (<div className="groupdisp">
		{
			groups.map((group,index)=>{
				<div key={index} className="group">
					<p>{group.name}</p>
				</div>
			})
		}
	</div>)
}


export default Groupdisp