import React from 'react'
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode } from '@fortawesome/free-solid-svg-icons'

const Main = () => {
  return (
    <div>
      <div className="chatbox-container">
        <div className="chatbox-header">
          <FontAwesomeIcon icon={faCode} />
          <h1>DevTimess</h1>
          <button>Leave Room</button>
        </div>
        <div className="chatbox-section">
          <div className="chatbox-sidebar"></div>
          <div className="chatbox"></div>
        </div>
        <div className="chatbox-input-container">
          <input type="text" />
          <button>Send</button>
        </div>
      </div>
    </div>
  )
}

export default Main