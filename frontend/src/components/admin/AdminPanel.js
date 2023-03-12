import React, { useReducer, useEffect } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { signOut } from 'firebase/auth';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';

import { auth } from '../../firebase';
import { newUrl } from '../constants';
import { initialState, reducer } from '../store/store';

function AdminPanel() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { newEvents } = state;

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(newUrl)
      .then(res => {
        dispatch({ type: 'newEvents', payload: res.data });
      })
      .catch(err => {
        console.log(err.message);
      });
  }, [newEvents]);

  const handleLogout = () => {               
    signOut(auth).then(() => {
      navigate('/');
      console.log('Signed out successfully')
    })      
    .catch(err => {
      console.log(err.message);
    });
  };

  const handleClick = (id) => {
    axios.post(`${newUrl}/${id}`)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    axios.delete(`${newUrl}/${id}`)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Container maxWidth='md' sx={{ marginTop: 2 }}>
      <Paper elevation={4} style={{backgroundColor: '#f4f4f9'}}>
        <br />
        <Typography variant='body1' color='text.secondary'>
          <h1 className='text-center'>Approve Events</h1>
        </Typography>

        <List style={{maxHeight: 1200, overflow: 'auto'}}>
          {newEvents && newEvents.map(event => 
            <Paper elevation={3} className='new-event-paper'>
              <Box className='new-event-card'>
                <Table size='small'>
                  <TableBody>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>{event.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Category</TableCell>
                      <TableCell>{event.category}</TableCell>
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
                      <TableCell>Date</TableCell>
                      <TableCell>
                        {moment(event.start).format('MMMM Do, YYYY')} - {moment(event.end).format('MMMM Do, YYYY')}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Promoter</TableCell>
                      <TableCell>{event.promoter}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Description</TableCell>
                      <TableCell>{event.description}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>

              <Button 
                onClick={id => handleClick(event._id)} 
                sx={{ margin: '0 .75em .75em 1.25em' }}
              >
                Approve
              </Button>
            </Paper>
          )}
        </List>

        <Button sx={{ margin: 1 }}>
          <Link to='/'>Back To Map</Link>
        </Button>

        <Button onClick={handleLogout}>
          Log out
        </Button>
      </Paper>
    </Container>
  );
}

export default AdminPanel;


