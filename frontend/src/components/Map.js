import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GoogleMap, LoadScript, OverlayView } from '@react-google-maps/api';
import Paper from '@mui/material/Paper';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import { api_key } from './constants';
import './Map.css';

function Map({ events, center, zoomLevel, handleOnLoad, getMapBounds }) {
  return (
    <div className="map">
      <div className="google-map">
        <LoadScript
          googleMapsApiKey={api_key}
        >
          <GoogleMap
            onLoad={handleOnLoad}
            onBoundsChanged={getMapBounds}
            mapContainerStyle={{width: '100%', height: '100%'}}
            center={center}
            zoom={zoomLevel}
          >
            {events && events.map((event, i) => 
              <OverlayView
                position={{ lat: event.lat, lng: event.lng }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                key={i}
              >
                <LocationPin 
                  event={event} 
                  lat={event.lat}
                  lng={event.lng} 
                />
              </OverlayView>
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}

function LocationPin({ event }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className="pin">
      <DirectionsBikeIcon color='error' fontSize='large' />
        <Paper elevation={3} className='pin-label'>
          <Link onClick={handleClick} className='pin-text'>
            {event.name}
          </Link>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <Paper sx={{ maxWidth: 340 }} elevation={2}>
              <CardMedia
                component="img"
                // height="140"
                image={event.thumbnail}
              />
              <CardContent>
                <Typography gutterBottom variant="h7" component="div">
                  <Link to={`/show-event/${event._id}`} className='pin-link'>
                    {event.name}
                  </Link>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {event.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={handleClose}>
                  Close
                </Button>
              </CardActions>
            </Paper>
          </Popover>
        </Paper>
    </div>
  );
}

export default Map;
