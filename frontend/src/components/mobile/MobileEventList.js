import React, { useReducer, useState, useEffect } from 'react';

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

import EventsModal from './EventsModal';
import SearchBar from './MobileSearchBar';
import { url, categories, api_key } from '../constants';
import { filteredEvents, getMapBounds, handleSearch, defaultCenter } from '../EventFilter';
import { addDays } from '../helpers';  
import Map from '../Map';
import { initialState, initialMobileMapState, reducer } from '../store/store';

function MobileEventList() {
  const [open, setOpen] = useState(false);

  const [state, dispatch] = useReducer(reducer, initialState);
  const [mapState, dispatchMap] = useReducer(reducer, initialMobileMapState);

  const { events, location } = state;
  const { mapRef, center, zoomLevel } = mapState;

  useEffect(() => {
    axios.get(url)
      .then(res => {
        dispatch({ type: 'events', payload: res.data });
      })
      .catch(err => {
        console.log(err.message);
      });
  }, []);

  const handleOnLoad = (map) => {
    dispatchMap({ type: 'mapRef', payload: map });
  };

  const handleChange = (location) => {
    dispatch({ type: 'location', payload: location });
  };

  const handleSlider = (days) => {
    dispatch({ type: 'date2', payload: addDays(Date.now(), days) });
  };

  const mappedEvents = mapRef ? filteredEvents(state, mapState).mappedEventList :
    events.map((event, k) => <EventCard event={event} key={k} />); 

  return (
    <Grid container sx={{ flexGrow: 1 }}>
      <Grid item sm={12}>
        <SearchBar 
          handleChange={keyword => handleChange(keyword)} 
          handleClick={() => handleSearch(api_key, location, dispatchMap, 8)}    
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
              onChange={e => dispatch({ type: 'category', payload: e.target.value })}
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
          events={filteredEvents(state, mapState).mappedMarkers}
          center={defaultCenter(center)}
          zoomLevel={zoomLevel} 
          handleOnLoad={map => handleOnLoad(map)}
          getMapBounds={() => getMapBounds(mapRef, dispatchMap)}
        />
      </Grid>

      <Grid item sm={12}>
        <Stack direction='row'>
          <Button
            size="large"
            style={{ height: 60 }}
            onClick={() => setOpen(true)}
          >
            Open Event List
          </Button>
          <Box display='flex' alignItems='flex-end'>
            <div className='results-count'>
              Results: {mappedEvents.length}
            </div>
          </Box>      
        </Stack>
      </Grid>

      <EventsModal
        events={mappedEvents}
        open={open}
        handleClose={() => setOpen(false)}
      />
    </Grid>
  );
}

export default MobileEventList;
