import React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import moment from 'moment';
import { Link } from 'react-router-dom';

function MobileEventCard({ event }) {
  return (
    <Paper elevation={3} sx={{ m: 1.5, mt: 0 }}>
      <Box className='event-card'>
        <h2>
          <Link to={`/show-event/${event._id}`}>{event.name}</Link>
        </h2>
        <p>{moment(event.start).format('MMMM Do, YYYY')}</p>
        <p>{event.location}</p>
        <p><a href={event.link}>{event.link}</a></p>
        <p>{event.promoter}</p>
      </Box>
    </Paper>
  );
}

export default MobileEventCard;