import React from 'react';
import { Link } from 'react-router-dom';

function EventCard(props) {
  const event = props.event;

  return (
    <div className='card-container'>
      <img
        src='http://clipart-library.com/image_gallery/451006.jpg'
        alt='Events'
        height={200}
      />
      <div className='desc'>
        <h2>
          <Link to={`/show-event/${event._id}`}>{event.name}</Link>
        </h2>
        <h3>{event.start}</h3>
        <p>{event.description}</p>
      </div>
    </div>
  );
};

export default EventCard;