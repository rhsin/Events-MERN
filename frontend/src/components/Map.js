import React from 'react';

import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { GoogleMap, LoadScript, OverlayView } from '@react-google-maps/api';

import { api_key } from './constants';
import LocationPin from './LocationPin';
import MobileLocationPin from './mobile/MobileLocationPin';

function Map({ events, center, zoomLevel, handleOnLoad, getMapBounds }) {
  const isDesktop = useMediaQuery('(min-width: 700px)');

  const containerStyle = isDesktop ? 
    { width: '100%', height: '100%' } :
    { width: '360px', height: '360px' };

  const mapStyle = isDesktop ? {} :
    { 
      disableDefaultUI: true,
      zoomControl: true,
      fullscreenControl: true 
    };
  
  const MapPin = (event) => isDesktop ? 
    <LocationPin  event={event} lat={event.lat} lng={event.lng} /> : 
    <MobileLocationPin  event={event} lat={event.lat} lng={event.lng} />;

  return (
    <Box className='google-map'>
      <LoadScript
        googleMapsApiKey={api_key}
      >
        <GoogleMap
          onLoad={handleOnLoad}
          onBoundsChanged={getMapBounds}
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoomLevel}
          options={mapStyle} 
        >
          {events && events.map((event, i) => 
            <OverlayView
              position={{ lat: event.lat, lng: event.lng }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              key={i}
            >
              {MapPin(event)}
            </OverlayView>
          )}
        </GoogleMap>
      </LoadScript>
    </Box>
  );
}

export default Map;
