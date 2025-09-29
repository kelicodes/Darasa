import { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from "./Components/Login/Login"
import Home from "./Pages/Home/Home"
import Eclass from "./Pages/Class/Eclass"
import Foot from "./Components/Foot/Foot"
import Nav from "./Components/Nav/Nav"
import Chat from "./Components/Chat/Chat"
import Chatdisp from "./Components/Chatdisp/Chatdisp" 
import { ShopContext } from "./Context/ShopContext"
import CreateMeetingButton from "./Pages/Class/Create"
import "./App.css"

// ✅ add imports for react-toastify
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export const App = () => {
  const { token } = useContext(ShopContext)
  console.log(token)

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} /> {/* ✅ enable toasts */}

      {token ? (
        <>
          <Nav />
          <div className="mainct">
            <Routes>
              <Route path="/" element={<Chatdisp />} />
              <Route path="/eclass" element={<CreateMeetingButton />} />
              <Route path="/chat/:chatId" element={<Chat />} />
              <Route path="/eclass/:roomid" element={<Eclass />} />
            </Routes>
          </div>
          <Foot />
        </>
      ) : (
        <Login />
      )}
    </>
  )
}

export default App
