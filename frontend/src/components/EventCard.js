import React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import moment from 'moment';
import { Link } from 'react-router-dom';

function EventCard({ event }) {
  return (
    <Paper elevation={3} className='event-paper'>
      <Box className='event-card'>
        <h2>
          <Link to={`/show-event/${event._id}`}>{event.name}</Link>
        </h2>
        <p>{event.location}</p>
        <p><a href={event.link}>{event.link}</a></p>
        <p>{moment(event.start).format('MMMM Do, YYYY')}</p>
      </Box>
    </Paper>
  );
}

export default EventCard;