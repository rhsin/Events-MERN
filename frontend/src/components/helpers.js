
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

export function sortDistanceCenter(point, array) {
  const sortedEvents = array.sort((a, b) =>
    (a.x - point.x) * (a.y - point.y) -
    (b.x - point.x) * (b.y - point.y)
  );

  return sortedEvents;
}

export function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  
  return result;
}