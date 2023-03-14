import React from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { getThumbnail } from './helpers';

function EventCard({ event }) {
  return (
    <Paper elevation={3} sx={{ m: 1.5, mt: 0 }}>
      <Grid container>
        <Grid item sm={5}>
          <Paper
            display='flex'
            component='img'
            sx={{
              height: '100%',
              width: '100%'
            }}
            src={getThumbnail()}
          /> 
        </Grid>
        <Grid item sm={7} className='event-card'>
          <h2>
            <Link to={`/show-event/${event._id}`}>{event.name}</Link>
          </h2>
          <p>{moment(event.start).format('MMMM Do, YYYY')}</p>
          <p>{event.location}</p>
          <p><a href={event.link}>{event.link}</a></p>
          <p>{event.promoter}</p>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default EventCard;