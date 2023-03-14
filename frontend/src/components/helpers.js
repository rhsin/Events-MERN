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

export function getThumbnail() {
  const thumbnails = [
    'https://images.pexels.com/photos/14537977/pexels-photo-14537977.jpeg?auto=compress&cs=tinysrgb&w=1060&h=850&dpr=1',
    'https://images.pexels.com/photos/5970279/pexels-photo-5970279.jpeg?auto=compress&cs=tinysrgb&w=1060&h=850&dpr=1',
    'https://images.pexels.com/photos/5807796/pexels-photo-5807796.jpeg?auto=compress&cs=tinysrgb&w=1060&h=850&dpr=1',
    'https://images.pexels.com/photos/5807572/pexels-photo-5807572.jpeg?auto=compress&cs=tinysrgb&w=1060&h=850&dpr=1'
  ];
  const random = Math.floor(Math.random() * thumbnails.length);
  
  return thumbnails[random];
}
