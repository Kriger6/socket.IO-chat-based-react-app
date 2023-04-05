import React, { useEffect, useRef, useState } from 'react'
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faComments, faPaperPlane, faUsers } from '@fortawesome/free-solid-svg-icons'
import { Link, useLocation } from 'react-router-dom'
import { io } from "socket.io-client";

const socket = io()

const Main = () => {

  const location = useLocation()
  const { username, option } = location.state

  const inputRef = useRef<HTMLInputElement | null>(null)


  const [message, setMessage] = useState<string | null>(null)

  const sendMessage = () => {
    socket.emit('message', message)
    setMessage(null)


    inputRef.current.value = ''
  }


  useEffect(() => {    
    socket.on("message", (message) => {
      console.log(message)
    })

    return () => {
      socket.removeListener("message")
    }
  }, [socket])



  return (
    <div>
      <div className="chatbox-container">
        <div className="chatbox-header">
          <div className="logo">
            <FontAwesomeIcon icon={faCode} />
            <h1>DevTime</h1>
          </div>
          <button className='leave-room-button'>
            <Link className='button-link' to={'/'}>Leave room</Link>
          </button>
        </div>
        <div className="chatbox-section">
          <div className="chatbox-sidebar-container">
            <div className="chatbox-sidebar">
              <h3><FontAwesomeIcon icon={faComments} /> Room Name:</h3>
              <h3 className='room-name'>{option}</h3>
              <h3><FontAwesomeIcon icon={faUsers} /> Users</h3>
            </div>
          </div>
          <div className="chatbox">
            <div className="chatbox-messages-container"></div>
          </div>
        </div>
        <div className="chatbox-input-container">
          <form onSubmit={
            (e) => {
              e.preventDefault()
              sendMessage()
              }}>
            <input ref={inputRef} type='text' onChange={(e) => setMessage(e.target.value)} placeholder='Enter message' />
            <button type='submit' onClick={() => sendMessage} className='send-button'><FontAwesomeIcon icon={faPaperPlane} /> Send</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Main