import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';
import moment from 'moment';
import { Link, useParams } from 'react-router-dom';

import { url } from './constants'; 

function EventDetails() {
  const [event, setEvent] = useState({});

  const isDesktop = useMediaQuery('(min-width: 700px)');

  const imageStyle = isDesktop ? { height: 360 }  : { height: 120 };

  const { id } = useParams();
  
  useEffect(() => {
    axios.get(`${url}/${id}`)
      .then(res => {
        setEvent(res.data);
      })
      .catch(err => {
        console.log(err.message);
      });
  }, [id]);

  const eventList = (
    <Paper elevation={1}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>{event.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Location</TableCell>
            <TableCell>{event.location}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Link</TableCell>
            <TableCell><a href={event.link}>{event.link}</a></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Start</TableCell>
            <TableCell>{moment(event.start).format('MMMM Do, YYYY')}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>End</TableCell>
            <TableCell>{moment(event.end).format('MMMM Do, YYYY')}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Promoter</TableCell>
            <TableCell>{event.promoter}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell>{event.description}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell>{event.category}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );

  return (
    <Container maxWidth='md' sx={{ marginTop: 2 }}>
      <Paper elevation={4} style={{backgroundColor: '#f4f4f9'}}>
        <CardMedia
          sx={imageStyle}
          // image={event.thumbnail}
        />
        <CardContent>
          <Typography sx={{ m: 1 }} variant={isDesktop ? 'h4' : 'h5'} component='div'>
            {event.name}
          </Typography>
          <Typography variant='body1' color='text.secondary'>
            {eventList}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size={isDesktop ? 'large' : 'medium'} color='success'>
            <Link
              to={`/edit-event/${event._id}`}
            >
              Edit Event
            </Link>
          </Button>
          <Button size={isDesktop ? 'large' : 'medium'}>
            <Link to='/'>Back To Map</Link>
          </Button>
        </CardActions>
      </Paper>
    </Container>
  );
}

export default EventDetails;


