import React, { useEffect, useRef, useState } from 'react'
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faComments, faPaperPlane, faUsers } from '@fortawesome/free-solid-svg-icons'
import { Link, useLocation } from 'react-router-dom'
import { io } from "socket.io-client";

const socket = io({
  autoConnect: false
})


const Main = () => {

  const location = useLocation()
  const { username, option } = location.state

  const [chatMessages, setChatMessages] = useState<any>([])

  const inputRef = useRef<HTMLInputElement | null>(null)
  const scrollDummyRef = useRef<HTMLDivElement | null>(null) 
  const chatBoxRef = useRef<HTMLDivElement | null>(null) 


  const [message, setMessage] = useState<string | null>(null)

  const sendMessage = () => {
    if (message === null || message === undefined) {
      return
    }
    socket.emit('chat message', message, username)
    setMessage(null)


    inputRef.current.value = ''
  }

  useEffect(() => {
    socket.connect()
  }, [socket])

  const scrollToBottom = () => {
    chatBoxRef.current.scrollTo({
      top: scrollDummyRef.current.scrollHeight,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    socket.on("chat message", (message, user) => {
      setChatMessages(
        [...chatMessages, [message, user]]
      )
      // scrollDummyRef.current.scrollIntoView({block: 'start'})
      scrollToBottom()
      console.log(message)
    })
    socket.on("message", (message) => {
      console.log(message)
    })

    return () => {
      socket.removeListener("chat message")
      socket.removeListener("message")
    }
  }, [socket, chatMessages])

  const arrayMessages = chatMessages?.map((chatMessage: any) =>
    <div className='message-box' style={{ background: '#E4E6FE', alignSelf: chatMessage[1] !== username ? 'flex-start' : '' }}>
      <small style={{ color: '#8D99F1' }}>{chatMessage[1]}</small>
      <p>{chatMessage[0]}</p>
    </div>
  )



  return (
    <div>
      <div className="chatbox-container">
        <div className="chatbox-header">
          <div className="logo">
            <FontAwesomeIcon icon={faCode} />
            <h1>DevTime</h1>
          </div>
          <button onClick={() => socket.disconnect()} className='leave-room-button'>
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
          <div ref={chatBoxRef} className="chatbox">
            {arrayMessages}
            <div ref={scrollDummyRef}></div>
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