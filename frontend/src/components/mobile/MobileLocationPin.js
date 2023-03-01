import React, { useState } from 'react';

import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

function MobileLocationPin({ event }) {
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
    <Box className='pin'>
      <IconButton onClick={handleClick}>
        <DirectionsBikeIcon
          color='error'
          fontSize='large' 
          style={{
            textAlign: 'center',
            transform: 'translate(-50%, -50%)',
            position: 'absolute'
          }}
        />
      </IconButton>
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

export default MobileLocationPin;