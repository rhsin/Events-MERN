import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import List from '@mui/material/List';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import axios from 'axios';
import Geocode from 'react-geocode';
import { Link } from 'react-router-dom';

import { url, categories, regions, default_location, api_key } from './constants';
import EventCard from './EventCard';
import { findCenter, addDays, sortByCenterDistance } from './helpers';  
import Map from './Map';
import SearchBar from './SearchBar';

function ShowEventList() {
  const [events, setEvents] = useState([]);
  const [category, setCategory] = useState('Cycling');
  const [region, setRegion] = useState('');
  const [date1, setDate1] = useState(addDays(Date.now(), -55));
  const [date2, setDate2] = useState(addDays(Date.now(), 40));
  const [center, setCenter] = useState({ lat: null, lng: null });
  const [zoomLevel, setZoomLevel] = useState(7);
  const [updatedCenter, setUpdatedCenter] = useState({ lat: null, lng: null });
  const [keyword, setKeyword] = useState('');
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

  const mappedEvents = mapref ? events.filter(event => 
    (neBounds.lat - .1) > event.lat && event.lat > (swBounds.lat + .1) &&
    (neBounds.lng - .1) > event.lng && event.lng > (swBounds.lng + .1)) : events;

  const sortedEventList = !updatedCenter ? mappedEvents :
    sortByCenterDistance(updatedCenter, mappedEvents);

  const dateEventList = sortedEventList.filter(event =>
    Date.parse(event.start) > date1 && Date.parse(event.end) < date2);

  const mappedEventList = !swBounds ? 
    mappedEvents.map((event, k) => <EventCard event={event} key={k} />) : 
    dateEventList.map((event, k) => <EventCard event={event} key={k} />);
    
  const mappedMarkers = !swBounds ? mappedEvents : dateEventList;

  const defaultCenter = center.lat ? center : default_location;

  const getMapBounds = () => {
    if (mapref) {
      const ne = mapref.getBounds().getNorthEast();
      const sw = mapref.getBounds().getSouthWest();
  
      setNeBounds({ lat: ne.lat(), lng: ne.lng() });
      setSwBounds({ lat: sw.lat(), lng: sw.lng() });
      setUpdatedCenter({
        lat: mapref.getCenter().lat(),
        lng: mapref.getCenter().lng() 
      });
    }
  };

  const handleClick = () => {
    Geocode.setApiKey(api_key);
    Geocode.fromAddress(keyword).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setCenter({ lat: lat, lng: lng });
        setZoomLevel(9);
        console.log(center);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const handleOnLoad = (map) => {
    setMapRef(map);
  };

  const handleChange = (keyword) => {
    setKeyword(keyword);
  };

  return (
    <Grid container>
      <Grid item sm={12}>
        <Box>
          <br />
          <h2 className='display-4 text-center'>{category} Events</h2>
        </Box>
    
        <Stack
          direction='row'
          display='flex'
          justifyContent='space-between'
          alignItems='flex-end'
        > 
          <Button size='large' style={{ margin: '0em 0em .5em 0em' }}>
            <Link
              to='/create-event'
            >
              Register New Event
            </Link>
          </Button>
          <SearchBar 
            handleChange={keyword => handleChange(keyword)} 
            handleClick={handleClick}  
          />
        </Stack>
        
        <Stack
          direction='row'
          display='flex'
          justifyContent='space-between'
          alignItems='flex-end'
        > 
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className='date-picker'>
                <DatePicker
                  label='Begin Date'
                  value={date1}
                  onChange={(newValue) => {
                    setDate1(Date.parse(newValue.$d));
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </div>
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className='date-picker'>
                <DatePicker
                  label='End Date'
                  value={date2}
                  onChange={(newValue) => {
                    setDate2(Date.parse(newValue.$d));
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </div>
            </LocalizationProvider>
          </Box>

          <Box>
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

            <FormControl size='small'>
              <InputLabel id='select-region'>Region</InputLabel>
              <Select 
                style={{minWidth: 120}}
                id='select-region' 
                label='Region'
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
                  id='select-radius' 
                  label='Radius'
                  onChange={e => setZoomLevel(e.target.value)}
                >
                  <MenuItem value={12}>20 miles</MenuItem>
                  <MenuItem value={10}>50 miles</MenuItem>
                </Select>
            </FormControl>
          </Box>
        </Stack>
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
          events={mappedMarkers}
          center={defaultCenter}
          zoomLevel={zoomLevel} 
          handleOnLoad={map => handleOnLoad(map)}
          getMapBounds={getMapBounds}
        />
      </Grid>
    </Grid>
  );
}

export default ShowEventList;


