import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

function EventCard(props) {
  const event = props.event;

  return (
    <div className='card-container'>
      {/* <img
        className='card-img'
        src='http://clipart-library.com/images/gieoXdBzT.jpg'
        alt='Events'
        height={200}
      /> */}
      <div className='desc'>
        <h2>
          <Link to={`/show-event/${event._id}`}>{event.name}</Link>
        </h2>
        <p>{event.location}</p>
        <p><a href={event.link}>{event.link}</a></p>
        <p>{moment(event.start).format('MMMM Do, YYYY')}</p>
        {/* <p>{moment(event.end).format('MMMM Do, YYYY')}</p> */}
        {/* <p>{event.description}</p> */}
      </div>
    </div>
  );
}

export default EventCard;