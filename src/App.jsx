import { useContext, useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import Login from "./Components/Login/Login"
import Home from "./Pages/Home/Home"
import Eclass from "./Pages/Class/Eclass"
import Foot from "./Components/Foot/Foot"
import Nav from "./Components/Nav/Nav"
import Chat from "./Components/Chat/Chat"
import Chatdisp from "./Components/Chatdisp/Chatdisp"
import { ShopContext } from "./Context/ShopContext"
import CreateMeetingButton from "./Pages/Class/Create"
import Groupdisp from "./Components/Groupdisp/Groupdisp"
import Group from "./Components/Group/Group"
import Spinner from "./Components/Spinner/Spinner"
import "./App.css"

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export const App = () => {
  const { token } = useContext(ShopContext)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (token) {
      setLoading(true)  // start spinner
      const timer = setTimeout(() => {
        setLoading(false) // stop spinner after 3s
      }, 7000)

      return () => clearTimeout(timer) // cleanup
    }
  }, [token]) // runs when token changes

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      {token ? (
        loading ? (
          <Spinner />
        ) : (
          <>
            <Nav />
            <div className="mainct">
              <Routes>
                <Route path="/" element={<Chatdisp />} />
                <Route path="/eclass" element={<CreateMeetingButton />} />
                <Route path="/group" element={<Groupdisp />} />
                <Route path="/chat/:chatId" element={<Chat />} />
                <Route path="/group/:groupid" element={<Group />} />
                <Route path="/eclass/:roomid" element={<Eclass />} />
              </Routes>
            </div>
            <Foot />
          </>
        )
      ) : (
        <Login />
      )}
    </>
  )
}

export default App
 