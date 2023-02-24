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
import { url, categories, regions, findCenter, default_location } from './constants'; 

function ShowEventList() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [category, setCategory] = useState('Cycling');
  const [region, setRegion] = useState('TX');
  const [center, setCenter] = useState({ lat: null, lng: null });
  // const [updatedCenter, setUpdatedCenter] = useState({ lat: null, lng: null });
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

  useEffect(() => {
    const newCenter = findCenter(region);
    setCenter(newCenter);
  }, [region]);

  // useEffect(() => {
  //   console.log('CENTER: ' + updatedCenter);
  // }, [updatedCenter]);

  const mappedEvents = events.filter(event => 
    (neBounds.lat - .1) > event.lat && event.lat > (swBounds.lat + .1) &&
    (neBounds.lng - .1) > event.lng && event.lng > (swBounds.lng + .1))
      .sort((a, b) => b.lat - a.lat);

  const handleOnLoad = (map) => {
    setMapRef(map);
  };

  const getMapBounds = () => {
    if (mapref) {
      const ne = mapref.getBounds().getNorthEast();
      const sw = mapref.getBounds().getSouthWest();
  
      setNeBounds({ lat: ne.lat(), lng: ne.lng() });
      setSwBounds({ lat: sw.lat(), lng: sw.lng() });
      // setUpdatedCenter(mapref.getCenter());

      setFilteredEvents(mappedEvents);
      console.log(mappedEvents);
    }
  };

  const mappedEventList = filteredEvents.length === 0 ? 
    events.map((event, k) => <EventCard event={event} key={k} />) : 
      mappedEvents.map((event, k) => <EventCard event={event} key={k} />);

  const defaultCenter = center ? center : default_location;

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
              <Box>
              <FormControl size='small'>
                  <InputLabel id='select-category'>Category</InputLabel>
                  <Select 
                    style={{minWidth: 120}}
                    id="select-category" 
                    label='Category'
                    defaultValue='Cycling'
                    onChange={e => setCategory(e.target.value)}
                  >
                    {categories && categories.map((category, i) => 
                      <MenuItem value={category} key={i}>{category}</MenuItem>
                    )}
                  </Select>
                </FormControl>

                <Button size="small">
                <Link
                  to='/create-event'
                  className='btn ml-2'
                >
                  Register New Event
                </Link>
              </Button>
              </Box>

              <Box>
                <FormControl size='small'>
                  <InputLabel id='select-region'>Region</InputLabel>
                  <Select 
                    style={{minWidth: 120}}
                    id="select-region" 
                    label='Region'
                    defaultValue='TX'
                    onChange={e => setRegion(e.target.value)}
                  >
                    {regions && regions.map((region, i) => 
                      <MenuItem value={region} key={i}>{region}</MenuItem>
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
            {mappedEventList}
          </List>
        </Grid>
        
        <Grid item sm={8.5}>
          <Map
            events={events}
            center={defaultCenter}
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


// const eventList = category && category != 'All' ? 
//   events.filter(event => event.category == category)
//     .map((event, k) => <EventCard event={event} key={k} />) :
//       events.map((event, k) => <EventCard event={event} key={k} />);