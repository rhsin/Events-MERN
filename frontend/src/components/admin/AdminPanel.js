import React, { useReducer, useEffect } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { newUrl } from '../constants';
import { initialState, reducer } from '../store/store';

function AdminPanel() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { newEvents } = state;

  useEffect(() => {
    axios.get(newUrl)
      .then(res => {
        dispatch({ type: 'newEvents', payload: res.data });
      })
      .catch(err => {
        console.log(err.message);
      });
  }, []);

  const handleClick = (id) => {
    axios.post(`${newUrl}/main/${id}`)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err.message);
    });
  };

  return (
    <Container maxWidth='md' sx={{ marginTop: 2 }}>
      <Paper elevation={4} style={{backgroundColor: '#f4f4f9'}}>
        <br />
        <h2 className='display-4 text-center'>Admin Panel</h2>
        <br />
        <List 
            style={{maxHeight: 1165, overflow: 'auto'}}
          >
          {newEvents && newEvents.map(event => 
            <Paper elevation={3} className='event-paper'>
              <Box className='new-event-card'>
                <h2>
                  {event.name}
                </h2>
                <p>{event.location}</p>
                <p><a href={event.link}>{event.link}</a></p>
                <p>
                  {moment(event.start).format('MMMM Do, YYYY')} -
                  {moment(event.end).format('MMMM Do, YYYY')}
                </p>
                <p>{event.promoter}</p>
                <p>{event.description}</p>
              </Box>
              <Button onClick={id => handleClick(id)} sx={{ margin: '0 .75em .75em .75em' }}>
                Approve
              </Button>
            </Paper>
          )}
        </List>

        <Button sx={{ margin: 1 }}>
          <Link to='/'>Back To Map</Link>
        </Button>
      </Paper>
    </Container>
  );
}

export default AdminPanel;


