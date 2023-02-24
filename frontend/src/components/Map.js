import React from 'react';
import { Link } from 'react-router-dom';
import { GoogleMap, LoadScript, OverlayView } from '@react-google-maps/api';
import Paper from '@mui/material/Paper';
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
  return (
    <div className="pin">
      <DirectionsBikeIcon color='error' fontSize='large' />
      <Paper elevation={3} stlye={{'background-color': '#f0f8ff'}}>
        <Link className='pin-text' to={`/show-event/${event._id}`}>{event.name}</Link>
      </Paper>
    </div>
  );
}

export default Map;
