import React from 'react'
import './index.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCode} from '@fortawesome/free-solid-svg-icons'
import Main from '../main/index'


const Login = () => {
  return (
    <div>
      <div className="login-container">
        <div className="login-header">
          <FontAwesomeIcon icon={faCode} />
          <h1>DevTime</h1>
        </div>
        <div className="login-input-container">
          <form className="login-form">
            <label htmlFor="username">Username</label>
            <input id='username' placeholder='Enter username...'></input>
            <label htmlFor="room">Room</label>
            <select id='room'>
              <option value='javascript'>Javascript</option>
              <option value='php'>PHP</option>
              <option value='c++'>C++</option>
              <option value='java'>Java</option>
            </select>
            <button type="submit">Join Chat</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login