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
  const [neBounds, setNeBounds] = useState({ lat: null, lng: null });
  const [swBounds, setSwBounds] = useState({ lat: null, lng: null });
  const [mapref, setMapRef] = useState(null);

  useEffect(() => {
    axios.get(url)
      .then(res => {
        setEvents(res.data);
      })
      .catch(err => {
        console.log(err.message);
      });
  }, []);

  const handleOnLoad = (map) => {
    setMapRef(map);
  };

  const getMapBounds = () => {
    if (mapref) {
      const ne = mapref.getBounds().getNorthEast();
      const sw = mapref.getBounds().getSouthWest();
  
      console.log(ne.lat() + "," + ne.lng());
      console.log(sw.lat() + "," + sw.lng());
  
      setNeBounds({ lat: ne.lat(), lng: ne.lng() });
      setSwBounds({ lat: sw.lat(), lng: sw.lng() });

      console.log(events.filter(event => neBounds.lat > event.lat > swBounds.lat &&
        neBounds.lng > event.lng > swBounds.lng));
    }
  };

  const eventsOnMap = () => {
    events.filter(event => neBounds.lat > event.lat > swBounds.lat &&
      neBounds.lng > event.lng > swBounds.lng);
  };

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
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="flex-end"
            >
              <Button size="small">
                <Link
                  to='/create-event'
                  className='btn'
                >
                  Register New Event
                </Link>
              </Button>
              <Box>
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
                      <MenuItem value={32000}>20 miles</MenuItem>
                      <MenuItem value={80000}>50 miles</MenuItem>
                    </Select>
                </FormControl>
              </Box>
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
          <Map
            events={events}
            zoomLevel={7} 
            handleOnLoad={map => handleOnLoad(map)}
            getMapBounds={getMapBounds}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ShowEventList;