import React from 'react';

import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { GoogleMap, LoadScript, OverlayView } from '@react-google-maps/api';

import LocationPin from './LocationPin';

function Map({ events, center, zoomLevel, handleOnLoad, getMapBounds }) {
  const isDesktop = useMediaQuery('(min-width: 700px)');

  const containerStyle = isDesktop ? 
    { width: '100%', height: '100%' } :
    { width: '360px', height: '375px' };

  const mapStyle = { 
    disableDefaultUI: true,
    zoomControl: true,
    fullscreenControl: true,
    mapTypeId: 'terrain' 
  };

  return (
    <Box className='google-map'>
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_API_KEY}
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
              <LocationPin event={event} lat={event.lat} lng={event.lng} />
            </OverlayView>
          )}
        </GoogleMap>
      </LoadScript>
    </Box>
  );
}

export default Map;
