import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import EventCard from './EventCard';
import Map from './Map';
import { url, categories } from './constants'; 

function ShowEventList() {
  const [events, setEvents] = useState([]);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    axios.get(url)
      .then(res => {
        setEvents(res.data);
      })
      .catch(err => {
        console.log(err.message);
      });
  }, []);

  const eventList = category ? 
    events.filter(event => event.category == category)
      .map((event, k) => <EventCard event={event} key={k} />) :
         events.map((event, k) => <EventCard event={event} key={k} />);

  return (
    <div className='ShowEventList'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <br />
            <h2 className='display-4 text-center'>Events List</h2>
          </div>

          <div className='col-md-11'>
            <select onChange={e => setCategory(e.target.value)}>
              {categories && categories.map((category, i) => 
                <option value={category} key={i}>{category}</option>
              )}
            </select>
            <select>
              <option value={16000}>10 miles</option>
              <option value={32000}>20 miles</option>
            </select>
            <Link
              to='/create-event'
              className='btn float-right'
            >
              + Add New Event
            </Link>
            <br />
            <br />
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className='list'>{eventList}</div>
          </div>

          <div className="col-md-8">
            <Map events={events} zoomLevel={15} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowEventList;