import { addDays } from '../helpers';

export const initialState = { 
  events: [],
  location: '',
  date1: addDays(Date.now(), -55),
  date2: addDays(Date.now(), 40),
  category: 'Cycling'
};

export const initialMapState = { 
  mapRef: null,
  center: { lat: null, lng: null },
  updatedCenter: { lat: null, lng: null },
  zoomLevel: 7,
  neBounds: { lat: null, lng: null },
  swBounds: { lat: null, lng: null },
};

export const reducer = (state, action) => {
  const { type, payload } = action;

  return { ...state, [type]: payload };
};
