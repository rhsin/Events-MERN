import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Icon } from '@iconify/react';
import locationIcon from '@iconify/icons-mdi/map-marker';
import { api_key, default_location } from './constants';
import './Map.css';

function Map({ events, zoomLevel }) {
  const location = events.length == 0 ?
   default_location : {
    address: events[0].location,
    lat: events[0].lat,
    lng: events[0].lng,
  };

  return (
    <div className="map">
      <div className="google-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: api_key }}
          defaultCenter={location}
          defaultZoom={zoomLevel}
        >
          {events && events.map(event => 
            <LocationPin 
              event={event} 
              lat={event.lat}
              lng={event.lng} 
            />
          )}
        </GoogleMapReact>
      </div>
    </div>
  );
}

function LocationPin({ event }) {
  return (
    <div>
      <div className="pin">
        <Icon icon={locationIcon} className="pin-icon" />
        <p className="pin-text">{event.name}</p>
      </div>
    </div>
  );
}

export default Map;
