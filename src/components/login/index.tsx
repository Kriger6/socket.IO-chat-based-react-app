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
          <form onSubmit={(e) => e.preventDefault()} className="login-form">
            <label htmlFor="username">Username</label>
            <input required onChange={(e) => setUsername(e.target.value)} id='username' placeholder='Enter username...'></input>
            <label htmlFor="room">Room</label>
            <select onChange={(e) => setOption(e.target.value)} id='room'>
              <option value='Javascript'>Javascript</option>
              <option value='PHP'>PHP</option>
              <option value='C++'>C++</option>
              <option value='Java'>Java</option>
            </select>
            <button type="submit">
              <Link state={{username: username, option: option}} className='button-link' to={username !== null && username !== '' ? 'main' : null}>Join chat</Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login