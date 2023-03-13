import React, { useReducer, useEffect } from 'react';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import List from '@mui/material/List';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import axios from 'axios';

import AccountMenu from './AccountMenu';
import { url, categories } from './constants';
import EventCard from './EventCard';
import { filteredEvents, getMapBounds, handleSearch, defaultCenter } from './EventFilter';
import Map from './Map';
import SearchBar from './SearchBar';
import { initialState, initialMapState, reducer } from './store/store';

function EventList() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [mapState, dispatchMap] = useReducer(reducer, initialMapState);

  const { events, keyword, date1, date2, category } = state;
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

  const handleChange = (keyword) => {
    dispatch({ type: 'keyword', payload: keyword });
  };

  const searchLocation = () => {
    handleSearch(keyword, dispatchMap, 9);
    dispatch({ type: 'location', payload: keyword });
  };

  const mappedEvents = mapRef ? filteredEvents(state, mapState).mappedEventList :
    events.map((event, k) => <EventCard event={event} key={k} />); 

  return (
    <Grid container>
      <Grid item sm={12}      
        direction='row'
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        sx={{ m: 1, maxHeight: 54 }}
      >
        <Box sx={{ m: 1.5, fontSize: 28, fontWeight: 400, color: '#1a1a77', flexBasis: 0, flexGrow: 1 }}>
          {category} Events
        </Box>

        <Box 
          direction='row'
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <SearchBar 
            handleChange={keyword => handleChange(keyword)} 
            handleClick={searchLocation}  
          />  

          <FormControl size='small'>
            <InputLabel id='select-category'>Category</InputLabel>
            <Select 
              style={{ minWidth: 100 }}
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
          
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box className='date-picker'>
              <DatePicker
                label='Begin Date'
                value={date1}
                onChange={(newValue) => 
                  dispatch({ type: 'date1', payload: Date.parse(newValue.$d) })
                }
                renderInput={(params) => <TextField size='small' {...params} />}
              />
            </Box>
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box className='date-picker'>
              <DatePicker
                label='End Date'
                value={date2}
                onChange={(newValue) => 
                  dispatch({ type: 'date2', payload: Date.parse(newValue.$d) })
                }
                renderInput={(params) => <TextField size='small' {...params} />}
              />
            </Box>
          </LocalizationProvider>
        </Box>
        
        <Box sx={{ m: 1.5, flexBasis: 0, flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <AccountMenu />
        </Box>
      </Grid>

      <Grid item sm={4}> 
        <List 
          style={{ maxHeight: 1000, overflow: 'auto' }}
        >
          {mappedEvents}
        </List>
      </Grid>
      
      <Grid item sm={8}>
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


