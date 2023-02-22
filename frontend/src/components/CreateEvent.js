import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { url } from './constants'; 

function CreateEvent(props) {
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    name: '',
    location: '',
    start: '',
    end: '',
    description: ''
  });

  const onChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post(url, event)
      .then(res => {
        setEvent({
          name: '',
          location: '',
          start: '',
          end: '',
          description: ''
        });
        navigate('/');
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  return (
    <div className='CreateEvent'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <br />
            <Link to='/' className='btn float-left'>
              Show Event List
            </Link>
          </div>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Add Event</h1>
            <p className='lead text-center'>Create New Event</p>

            <form noValidate onSubmit={onSubmit}>
              <div className='form-group'>
                <label htmlFor='name'>Name</label>
                <input
                  type='text'
                  placeholder='Name of the event'
                  name='name'
                  className='form-control'
                  value={event.name}
                  onChange={onChange}
                />
              </div>
              <br />

              <div className='form-group'>
                <label htmlFor='location'>Location</label>
                <input
                  type='text'
                  placeholder='Location'
                  name='location'
                  className='form-control'
                  value={event.location}
                  onChange={onChange}
                />
              </div>

              <div className='form-group'>
                <label htmlFor='start'>Start</label>
                <input
                  type='datetime-local'
                  placeholder='Start'
                  name='start'
                  className='form-control'
                  value={event.start}
                  onChange={onChange}
                />
              </div>

              <div className='form-group'>
                <label htmlFor='end'>End</label>
                <input
                  type='datetime-local'
                  placeholder='End'
                  name='end'
                  className='form-control'
                  value={event.end}
                  onChange={onChange}
                />
              </div>

              <div className='form-group'>
                <label htmlFor='description'>Description</label>
                <input
                  type='text'
                  placeholder='Describe this event'
                  name='description'
                  className='form-control'
                  value={event.description}
                  onChange={onChange}
                />
              </div>
              <input
                type='submit'
                className='btn btn-block mt-4'
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;