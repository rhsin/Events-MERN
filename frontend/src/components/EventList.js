import React, { useReducer, useEffect } from 'react';

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
import { Link } from 'react-router-dom';

import { url, categories, api_key } from './constants';
import { filteredEvents, getMapBounds, handleSearch, defaultCenter } from './EventFilter';
import Map from './Map';
import SearchBar from './SearchBar';
import { initialState, initialMapState, reducer } from './store/store';

function EventList() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [mapState, dispatchMap] = useReducer(reducer, initialMapState);

  const { location, date1, date2, category } = state;
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
            handleChange={location => handleChange(location)} 
            handleClick={() => handleSearch(api_key, location, dispatchMap)}  
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
                  onChange={(newValue) => 
                    dispatch({ type: 'date1', payload: Date.parse(newValue.$d) })
                  }
                  renderInput={(params) => <TextField {...params} />}
                />
              </div>
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className='date-picker'>
                <DatePicker
                  label='End Date'
                  value={date2}
                  onChange={(newValue) => 
                    dispatch({ type: 'date2', payload: Date.parse(newValue.$d) })
                  }
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
                onChange={e => dispatch({ type: 'category', payload: e.target.value })}
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
                  id='select-radius' 
                  label='Radius'
                  onChange={e => dispatchMap({ type: 'zoomLevel', payload: e.target.value })}
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
          {filteredEvents(state, mapState).mappedEventList}
        </List>
      </Grid>
      
      <Grid item sm={8.5}>
        <Map
          events={filteredEvents(state, mapState).mappedMarkers}
          center={defaultCenter(center)}
          zoomLevel={zoomLevel} 
          handleOnLoad={map => handleOnLoad(map)}
          getMapBounds={() => getMapBounds(mapRef, dispatchMap)}
        />
      </Grid>
    </Grid>
  );
}

export default EventList;


