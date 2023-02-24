import React from 'react';
import { GoogleMap, LoadScript, OverlayView } from '@react-google-maps/api';
import Paper from '@mui/material/Paper';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import { api_key, default_location } from './constants';
import './Map.css';

function Map({ events, zoomLevel, handleOnLoad, getMapBounds }) {

  // useEffect(() => {
  //   if (mapref) {
  //     getMapBounds(mapref);
  //   }
  // }, [mapref]);

  // const center = events.length == 0 ?
  //   default_location : {
  //   address: events[0].location,
  //   lat: events[0].lat,
  //   lng: events[0].lng,
  // };

  return (
    <div className="map">
      <div className="google-map">
        <LoadScript
          googleMapsApiKey={api_key}
        >
          <GoogleMap
            // ref={onMapMounted}
            // onZoomChanged={handleMapChanged}
            // onDragEnd={handleMapChanged}
            // onBoundsChanged={handleMapFullyLoaded}
            onLoad={handleOnLoad}
            onCenterChanged={getMapBounds}
            mapContainerStyle={{width: '100%', height: '100%'}}
            center={default_location}
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
        <p className="pin-text">{event.name}</p>
      </Paper>
    </div>
  );
}

export default Map;
