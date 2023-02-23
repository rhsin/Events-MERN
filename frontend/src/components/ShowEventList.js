import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from "@mui/material/Select";
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import EventCard from './EventCard';
import Map from './Map';
import { url, categories } from './constants'; 

function ShowEventList() {
  const [events, setEvents] = useState([]);
  const [category, setCategory] = useState('All');

  useEffect(() => {
    axios.get(url)
      .then(res => {
        setEvents(res.data);
      })
      .catch(err => {
        console.log(err.message);
      });
  }, []);

  const eventList = category && category != 'All' ? 
    events.filter(event => event.category == category)
      .map((event, k) => <EventCard event={event} key={k} />) :
         events.map((event, k) => <EventCard event={event} key={k} />);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0}>
        <Grid item sm={12}>
          <div>
            <br />
            <h2 className='display-4 text-center'>{category} Events</h2>
            <br />
          </div>

          <Box sx={{ flexGrow: 1 }}>
            <Link
              to='/create-event'
              className='btn float-left'
            >
              Register New Event
            </Link>
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="flex-end"
            >
              <FormControl size='small'>
                <InputLabel id='select-category'>Category</InputLabel>
                <Select 
                  style={{minWidth: 120}}
                  id="select-category" 
                  label='Category'
                  onChange={e => setCategory(e.target.value)}
                >
                  {categories && categories.map((category, i) => 
                    <MenuItem value={category} key={i}>{category}</MenuItem>
                  )}
                </Select>
              </FormControl>
              
              <FormControl size='small'>
                <InputLabel id='select-radius'>Radius</InputLabel>
                  <Select 
                    style={{minWidth: 120}}
                    id="select-radius" 
                    label='Radius'
                    onChange={e => console.log(e.target.value)}
                  >
                    <MenuItem value={16000}>10 miles</MenuItem>
                    <MenuItem value={32000}>20 miles</MenuItem>
                  </Select>
              </FormControl>
            </Box>
          </Box>
        </Grid>

        <Grid item sm={3.5}> 
          <List 
            style={{maxHeight: 1165, overflow: 'auto'}}
          >
            {eventList}
          </List>
        </Grid>
        
        <Grid item sm={8.5}>
          <Map events={events} zoomLevel={6} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ShowEventList;