import React, { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Avatar, Button, Card, Paper, TextField } from '@mui/material';
import { width } from '@mui/system';
import { avatarProps } from './utils';

function ChatThread({username, messages, socket}) {
  const [inputMessage, setInputMessage] = useState('');

  const handleSend = () => {
    const payload = {
      body: inputMessage,
      username,
    };
    console.log('sending', messages, payload);
    socket.emit('message', payload);
    setInputMessage('');
  };

  return (
    <Grid 
      container 
      direction='column'
      display='flex' 
      justifyContent={'space-between'}
      sx={{ height: '100%', width: 'calc(100% - 5px)' }}
    >
      <Grid 
        container 
        spacing={0} 
        direction='column' 
      >
        {messages.map(({body: messageBody, username: messageUsername}) => (
          <Grid 
            key={`${messageUsername}_${messageBody}`} 
            container 
            gap={1}
            display='flex'
            justifyContent={username !== messageUsername ? 'end' : 'start'}
          >
            <Avatar {...avatarProps(messageUsername, true)} />
            <Paper sx={{ display: 'inline-block', padding: '5px 10px' }}>{messageBody}</Paper>
          </Grid>
        ))}
      </Grid>
      <Grid container display='flex' justifyContent={'space-between'}>
        <TextField 
          variant="outlined" 
          value={inputMessage} 
          onChange={e => setInputMessage(e.target.value)}
          sx={{width: 'calc(100% - 80px)'}}
        />
        <Button variant="text" onClick={handleSend}>Send</Button>
      </Grid>
    </Grid>
  );
}

export default ChatThread;