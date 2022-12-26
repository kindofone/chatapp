import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({socket}) {
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const handleLogin = () => {
    const username = inputRef.current.value;
    localStorage.setItem('username', username);
    socket.emit('login', {username});
    navigate('/chat');
  };

  return (
    <div className='login-container'>
      <input ref={inputRef}></input>
      <button onClick={handleLogin}>Sign In</button>
    </div>
  )
}

export default Login;