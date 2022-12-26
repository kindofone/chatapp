import React from 'react';
import Login from './Login';

function Home({socket}) {
  return (
    <div className='home-container'>
      <Login socket={socket} />
    </div>
  )
}

export default Home;