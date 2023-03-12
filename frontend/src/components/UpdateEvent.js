import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

import { url, categories } from './constants'; 
import { getLatLng } from './EventFilter';

function UpdateEvent() {
  const [category, setCategory] = useState('Gravel');
  const [event, setEvent] = useState({
    name: '',
    location: '',
    lat: '',
    lng: '',
    link: '',
    start: '',
    end: '',
    promoter: '',
    description: '',
    category: ''
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${url}/${id}`)
      .then(res => {
        setEvent({
          name: res.data.name,
          location: res.data.location,
          lat: res.data.lat,
          lng: res.data.lng,
          link: res.data.link,
          start: res.data.start,
          end: res.data.end,
          promoter: res.data.promoter,
          description: res.data.description,
          category: res.data.category
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  }, [id]);

  const onChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: event.name,
      location: event.location,
      lat: getLatLng(event.location).lat,
      lng: getLatLng(event.location).lng,
      link: event.link,
      start: event.start,
      end: event.end,
      promoter: event.promoter,
      description: event.description,
      category: category
    };

    axios.put(`${url}/${id}`, data)
      .then(res => {
        navigate(`/show-event/${id}`);
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  return (
    <Container maxWidth='md'>
      <Paper elevation={4} style={{backgroundColor: '#f4f4f9'}}>
        <CardContent>     
          <Typography variant='body1' color='text.secondary'>
            <h1 className='text-center'>Edit Event</h1>
            <br />
            <form noValidate onSubmit={onSubmit}>
              <Box className='form-group'>
                <label htmlFor='name'>Name</label>
                <input
                  type='text'
                  placeholder='Name of the event'
                  name='name'
                  className='form-control'
                  value={event.name}
                  onChange={onChange}
                />
              </Box>
              
              <Box className='form-group'>
                <FormControl size='small'>
                  <InputLabel id='select-category'>Category</InputLabel>
                  <Select 
                    style={{minWidth: 120}}
                    id='select-category' 
                    label='Category'
                    defaultValue='Gravel'
                    onChange={e => setCategory(e.target.value)}
                  >
                    {categories && categories.map((category, i) => 
                      <MenuItem value={category} key={i}>{category}</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Box>

              <Box className='form-group'>
                <label htmlFor='location'>Location</label>
                <input
                  type='text'
                  placeholder='Location'
                  name='location'
                  className='form-control'
                  value={event.location}
                  onChange={onChange}
                />
              </Box>

              <Box className='form-group'>
                <label htmlFor='link'>Link</label>
                <input
                  type='text'
                  placeholder='Link'
                  name='link'
                  className='form-control'
                  value={event.link}
                  onChange={onChange}
                />
              </Box>

              <Box className='form-group'>
                <label htmlFor='start'>Start</label>
                <input
                  type='datetime-local'
                  placeholder='Start'
                  name='start'
                  className='form-control'
                  value={event.start}
                  onChange={onChange}
                />
              </Box>

              <Box className='form-group'>
                <label htmlFor='end'>End</label>
                <input
                  type='datetime-local'
                  placeholder='End'
                  name='end'
                  className='form-control'
                  value={event.end}
                  onChange={onChange}
                />
              </Box>

              <Box className='form-group'>
                <label htmlFor='promoter'>Promoter</label>
                <input
                  type='text'
                  placeholder='Promoter for the event'
                  name='promoter'
                  className='form-control'
                  value={event.promoter}
                  onChange={onChange}
                />
              </Box>

              <Box className='form-group'>
                <label htmlFor='description'>Description</label>
                <textarea
                  type='text'
                  placeholder='Describe this event'
                  name='description'
                  className='form-control'
                  value={event.description}
                  onChange={onChange}
                />
              </Box>
            </form>
          </Typography>
        </CardContent>

        <CardActions>
          <Button 
            onClick={onSubmit} 
            size='large' 
            color='success'
          >
            Update Event
          </Button>
          
          <Button size='large'>
            <Link to='/'>Back To Map</Link>
          </Button>
        </CardActions>
      </Paper>
    </Container>
  );
}

export default UpdateEvent;