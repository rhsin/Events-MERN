import React, { useState } from 'react';

import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import { Link } from 'react-router-dom';

const styles = {
  typography: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    position: 'absolute',
    top: '15%',
    left: '25%'
  }
};

function LocationPin({ event }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box>
      <Box onClick={handleClick}>
        <Typography style={styles.typography}>
          {moment(event.start).format('MMM')}
        </Typography>
        <ChatBubbleIcon 
          color='primary.dark' 
          style={{ 
            fontSize: 45
          }} 
        />
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Paper sx={{ maxWidth: 340 }} elevation={2}>
          <CardMedia
            component='img'
            // image={event.thumbnail}
          />
          <CardContent>
            <Typography gutterBottom variant='h7' component='div'>
              <Link to={`/show-event/${event._id}`} className='pin-link'>
                {event.name}
              </Link>
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {event.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size='small' onClick={handleClose}>
              Close
            </Button>
          </CardActions>
        </Paper>
      </Popover>
    </Box>
  );
}

export default LocationPin;