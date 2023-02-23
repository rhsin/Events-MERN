import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import EventCard from './EventCard';
import Map from './Map';
import { url, categories } from './constants'; 

function ShowEventList() {
  const [events, setEvents] = useState([]);
  const [category, setCategory] = useState('All');

  useEffect(() => {
    axios.get(url)
      .then(res => {
        setEvents(res.data);
      })
      .catch(err => {
        console.log(err.message);
      });
  }, []);

  const eventList = category && category != 'All' ? 
    events.filter(event => event.category == category)
      .map((event, k) => <EventCard event={event} key={k} />) :
         events.map((event, k) => <EventCard event={event} key={k} />);

  return (
    <div className='ShowEventList'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <br />
            <h2 className='display-4 text-center'>{category} Events</h2>
          </div>

          <div className='col-md-11'>
            <select 
              className="form-select form-select-lg mb-3"
              aria-label="Select Category" 
              onChange={e => setCategory(e.target.value)}
            >
              {categories && categories.map((category, i) => 
                <option value={category} key={i}>{category}</option>
              )}
            </select>
            <select             
              className="form-select form-select-lg mb-3"
              aria-label="Select Radius" 
              onChange={e => console.log(e.target.value)}
            >
              <option value={16000}>10 miles</option>
              <option value={32000}>20 miles</option>
            </select>
            <Link
              to='/create-event'
              className='btn float-right'
            >
              Register New Event
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
            <Map events={events} zoomLevel={6} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowEventList;