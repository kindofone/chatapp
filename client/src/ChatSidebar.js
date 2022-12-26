import React, { useEffect, useRef, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Avatar } from '@mui/material';
import { avatarProps } from './utils';

function ChatSidebar({username, socket}) {
  const [participants, setParticipants] = useState([]);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      socket.on('participants', payload => {
        console.log('participants', participants, payload);
        setParticipants(payload);
      });
    }
  }, []);
  
  return (
    <Grid container>
      <Grid xs={12} display='flex' justifyContent='center'>
        <Grid container gap={1} direction='column'>
          <Avatar {...avatarProps(username)} />
          <label style={{ fontWeight: 'bold' }}>{username}</label>
        </Grid>
      </Grid>
      <Grid xs={12}>
        <Grid container direction='column' gap={1}>
          {participants.map(participant => (
            <Grid key={participant} container gap={1} display='flex' alignItems='center'>
              <Avatar {...avatarProps(participant, true)} />{participant}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ChatSidebar;