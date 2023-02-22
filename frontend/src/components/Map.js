import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Icon } from '@iconify/react';
import locationIcon from '@iconify/icons-mdi/map-marker';
import { convertAddress } from './helpers';
import { api_key } from './constants';
import './Map.css';

function Map({ events, zoomLevel }) {
  const location = convertAddress(events[0].location);

  return (
    <div className="map">
      <div className="google-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: api_key }}
          defaultCenter={location}
          defaultZoom={zoomLevel}
        >
          <LocationPins events={events} />
        </GoogleMapReact>
      </div>
    </div>
  );
}

function LocationPins({ events }) {
  return (
    <div>
      {events && events.map(event => 
        <div>
          <div className="pin">
            <Icon icon={locationIcon} className="pin-icon" />
            <p className="pin-text">{event.name}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function LocationPin({ text }) {
  return (
    <div className="pin">
      <Icon icon={locationIcon} className="pin-icon" />
      <p className="pin-text">{text}</p>
    </div>
  );
}

export default Map;
