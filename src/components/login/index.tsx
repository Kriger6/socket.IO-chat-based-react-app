import React, { useState } from 'react'
import './index.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCode} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'


const Login = () => {

  const [username, setUsername] = useState(null)
  const [option, setOption] = useState('Javascript')

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
            <input onChange={(e) => setUsername(e.target.value)} id='username' placeholder='Enter username...'></input>
            <label htmlFor="room">Room</label>
            <select onChange={(e) => setOption(e.target.value)} id='room'>
              <option value='javascript'>Javascript</option>
              <option value='php'>PHP</option>
              <option value='c++'>C++</option>
              <option value='java'>Java</option>
            </select>
            <button type="submit">
              <Link state={{username: username, option: option}} className='button-link' to={'main'}>Join chat</Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login