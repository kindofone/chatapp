import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import ChatSidebar from './ChatSidebar';
import ChatThread from './ChatThread';
import { Card, CardContent, Container, Paper } from '@mui/material';

function Chat({socket}) {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [messages, setMessages] = useState([]);
  const initialized = useRef(false);

  useEffect(() => {
    const lsUsername = localStorage.getItem('username');
    if (lsUsername != null) {
      setUsername(lsUsername);
    } else {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      socket.on('messageResponse', payload => {
        console.log('receiving', messages, payload);
        setMessages(state => {
          console.log(state);
          return [...state, payload];
        });
      });
    }
  }, []);

  return (
    <Container maxWidth="md" sx={{ marginTop: '50px' }}>
      <Paper sx={{ minWidth: '500px', height: '500px' }}>
        <Grid container spacing={2} sx={{ height: '100%' }}>
          <Grid xs={12} md={4}>
            <ChatSidebar socket={socket} username={username} />
          </Grid>
          <Grid xs={12} md={8}>
            <ChatThread socket={socket} username={username} messages={messages} />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

export default Chat;