import React from 'react';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';

import moment from 'moment';

function EventCard(props) {
  const event = props.event;

  return (
    <Paper elevation={4}>
      <div className='desc'>
        <h2>
          <Link to={`/show-event/${event._id}`}>{event.name}</Link>
        </h2>
        <p>{event.location}</p>
        <p><a href={event.link}>{event.link}</a></p>
        <p>{moment(event.start).format('MMMM Do, YYYY')}</p>
      </div>
    </Paper>
  );
}

export default EventCard;