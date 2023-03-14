import Geocode from 'react-geocode';

import { default_location } from "./constants";
import EventCard from './EventCard';
import { sortByCenterDistance } from './helpers';  
import MobileEventCard from './mobile/MobileEventCard';

export function filteredEvents(state, mapState) {
  const { events, date1, date2 } = state;
  const { mapRef, updatedCenter, neBounds, swBounds } = mapState;

  const mappedEvents = mapRef ? events.filter(event => 
    (neBounds.lat - .1) > event.lat && event.lat > (swBounds.lat + .1) &&
    (neBounds.lng - .1) > event.lng && event.lng > (swBounds.lng + .1)) : events;

  const sortedEventList = !updatedCenter ? mappedEvents :
    sortByCenterDistance(updatedCenter, mappedEvents);

  const dateEventList = sortedEventList.filter(event =>
    Date.parse(event.start) > date1 && Date.parse(event.end) < date2);

  const mappedEventList = !swBounds ? 
    mappedEvents.map((event, k) => <EventCard event={event} key={k} />) : 
    dateEventList.map((event, k) => <EventCard event={event} key={k} />);
    
  const mappedMarkers = !swBounds ? mappedEvents : dateEventList;

  return { mappedEventList: mappedEventList, mappedMarkers: mappedMarkers };
};

export const defaultCenter = (center) => center.lat ? center : default_location;

export const getMapBounds = (mapRef, dispatchMap) => {
  if (mapRef) {
    const ne = mapRef.getBounds().getNorthEast();
    const sw = mapRef.getBounds().getSouthWest();

    dispatchMap({ type: 'neBounds', payload: { lat: ne.lat(), lng: ne.lng() }});
    dispatchMap({ type: 'swBounds', payload: { lat: sw.lat(), lng: sw.lng() }});
    dispatchMap({ type: 'updatedCenter', payload: {
      lat: mapRef.getCenter().lat(),
      lng: mapRef.getCenter().lng() 
    }});
  }
};

export const handleSearch = (location, dispatchMap, zoom) => {
  Geocode.setApiKey(process.env.REACT_APP_API_KEY);
  Geocode.fromAddress(location).then(
    (res) => {
      const { lat, lng } = res.results[0].geometry.location;
      dispatchMap({ type: 'center', payload: { lat: lat, lng: lng }});
      dispatchMap({ type: 'zoomLevel', payload: zoom });
    },
    (err) => {
      console.log(err);
    }
  );
};

export const getLatLng = (location) => {
  Geocode.setApiKey(process.env.REACT_APP_API_KEY);
  Geocode.fromAddress(location).then(
    (res) => {
      console.log(res.results[0].geometry.location)
      const result = res.results[0].geometry.location;
      return result;
    },
    (err) => {
      console.log(err);
    }
  );
};