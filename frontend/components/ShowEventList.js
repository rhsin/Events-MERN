import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EventCard from './EventCard';

function ShowEventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8082/api/events')
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        console.log('Error from ShowEventList');
      });
  }, []);

  const eventList =
    events.length === 0 ? 'There is no event record!' : 
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
            <Link
              to='/create-event'
              className='btn btn-outline-warning float-right'
            >
              + Add New Event
            </Link>
            <br />
            <br />
            <hr />
          </div>
        </div>

        <div className='list'>{eventList}</div>
      </div>
    </div>
  );
}

export default ShowEventList;