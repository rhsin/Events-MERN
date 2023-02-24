
// export const url = 'http://localhost:8080/events';

export const url = 'https://cycling-events-api.onrender.com/events';

export const categories = ['Cycling', 'Running', 'All'];

export const regions = ['TX', 'CA', 'FL'];

export const default_location = {
  address: '403 Zapalac Rd, Smithville, TX  78957',
  lat: 29.953824,
  lng: -97.154178,
};

export const api_key = 'AIzaSyBqEmfFI3kNdmieWunM_v5TmL5fXGeaIa4';

export function findCenter(region) {
  switch (region) {
    case 'TX':
      return { lat: 29.953824, lng: -97.154178 };
    case 'CA':
      return { lat: 39.163166, lng: -123.226263 };
    case 'FL':
      return { lat: 30.534736, lng: -83.915584 };
    default:
      return { lat: 29.953824, lng: -97.154178 };
  }
}