import React, { useState, useEffect } from 'react';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import axios from 'axios';
import Geocode from 'react-geocode';

import EventsModal from './EventsModal';
import SearchBar from './MobileSearchBar';
import { url, categories, default_location, api_key } from '../constants';
import EventCard from '../EventCard';
import { addDays, sortByCenterDistance } from '../helpers';  
import Map from '../Map';

function MobileEventList() {
  const [events, setEvents] = useState([]);
  // const [category, setCategory] = useState('Cycling');
  const [date2, setDate2] = useState(addDays(Date.now(), 60));
  const [center, setCenter] = useState({ lat: null, lng: null });
  const [zoomLevel, setZoomLevel] = useState(7);
  const [updatedCenter, setUpdatedCenter] = useState({ lat: null, lng: null });
  const [keyword, setKeyword] = useState('');
  const [neBounds, setNeBounds] = useState({ lat: null, lng: null });
  const [swBounds, setSwBounds] = useState({ lat: null, lng: null });
  const [mapref, setMapRef] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios.get(url)
      .then(res => {
        setEvents(res.data);
      })
      .catch(err => {
        console.log(err.message);
      });
  }, []);

  const mappedEvents = events.filter(event => 
    (neBounds.lat - .1) > event.lat && event.lat > (swBounds.lat + .1) &&
    (neBounds.lng - .1) > event.lng && event.lng > (swBounds.lng + .1))
      .sort((a, b) => b.lat - a.lat);

  const sortedEventList = !updatedCenter ? mappedEvents :
    sortByCenterDistance(updatedCenter, mappedEvents);

  const dateEventList = sortedEventList.filter(event =>
    Date.parse(event.start) < date2);

  const mappedEventList = !swBounds ? 
    mappedEvents.map((event, k) => <EventCard event={event} key={k} />) : 
    dateEventList.map((event, k) => <EventCard event={event} key={k} />);
    
  // const mappedMarkers = !swBounds ? mappedEvents : dateEventList;

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

  const handleSlider = (days) => {
    setDate2(addDays(Date.now(), days));
  };

  return (
    <Grid container sx={{ flexGrow: 1 }}>
      <Grid item sm={12}>
        <SearchBar 
          handleChange={keyword => handleChange(keyword)} 
          handleClick={handleClick}  
        />

        <Stack 
          spacing={2.75}
          direction='row' 
          sx={{ margin: '1em 1em 1em .75em' }} 
          alignItems='center'
        >
          <Box sx={{ width: 200 }}>
            <Stack 
              spacing={1.5} 
              direction='row' 
              alignItems='center'
            >
              <CalendarMonthIcon />
              <Slider 
                aria-label='Date'
                defaultValue={60}
                step={10}
                max={60}
                valueLabelDisplay='auto'
                valueLabelFormat={value => `${value} days`}
                onChange={e => handleSlider(e.target.value)} />
            </Stack>
          </Box>

          <FormControl size='small'>
            <InputLabel id='select-category'>Category</InputLabel>
            <Select 
              style={{minWidth: 120}}
              id='select-category' 
              label='Category'
              defaultValue='Gravel'
              // onChange={e => setCategory(e.target.value)}
            >
              {categories && categories.map((category, i) => 
                <MenuItem value={category} key={i}>{category}</MenuItem>
              )}
            </Select>
          </FormControl>
        </Stack>
      </Grid>
      
      <Grid item>
        <Map
          events={dateEventList}
          center={defaultCenter}
          zoomLevel={zoomLevel} 
          handleOnLoad={map => handleOnLoad(map)}
          getMapBounds={getMapBounds}
        />
      </Grid>

      <Grid item sm={12}>
        <Button
          size="large"
          style={{ height: 60 }}
          onClick={() => setOpen(true)}
        >
          Open Event List
        </Button>          
      </Grid>

      <EventsModal
        events={mappedEventList}
        open={open}
        handleClose={() => setOpen(false)}
      />
    </Grid>
  );
}

export default MobileEventList;
