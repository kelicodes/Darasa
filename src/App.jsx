import { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from "./Components/Login/Login"
import Home from "./Pages/Home/Home"
import Foot from "./Components/Foot/Foot"
import Nav from "./Components/Nav/Nav"
import Chat from "./Components/Chat/Chat"
import Chatdisp from "./Components/Chatdisp/Chatdisp" 
import { ShopContext } from "./Context/ShopContext"
import "./App.css"

export const App = () => {
  const { token } = useContext(ShopContext)

  return (
    <>
      {token ? (
        <>
          <Nav />
          <div className="mainct">
          <Routes >
            <Route path="/" element={<Chatdisp/>} />
            <Route path='/chat/:chatId' element={<Chat/>}/>
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
