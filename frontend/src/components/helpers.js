import { sortByDistance } from 'sort-by-distance';

export function sortByCenterDistance(center, events) {
  const opts = {
    yName: 'lat',
    xName: 'lng'
  }
  
  return sortByDistance(center, events, opts);
}

export function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  
  return result;
}
