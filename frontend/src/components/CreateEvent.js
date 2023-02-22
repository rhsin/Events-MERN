import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateEvent(props) {
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    name: '',
    location: '',
    start: null,
    end: null,
    description: ''
  });

  const onChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/events', event)
      .then(res => {
        setEvent({
          name: '',
          location: '',
          start: null,
          end: null,
          description: ''
        });
        navigate('/');
      })
      .catch(err => {
        console.log('Error in CreateEvent!');
      });
  };

  return (
    <div className='CreateEvent'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <br />
            <Link to='/' className='btn btn-outline-warning float-left'>
              Show Event List
            </Link>
          </div>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Add Event</h1>
            <p className='lead text-center'>Create New Event</p>

            <form noValidate onSubmit={onSubmit}>
              <div className='form-group'>
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
                <input
                  type='date'
                  placeholder='Start'
                  name='start'
                  className='form-control'
                  value={event.start}
                  onChange={onChange}
                />
              </div>

              <div className='form-group'>
                <input
                  type='date'
                  placeholder='End'
                  name='end'
                  className='form-control'
                  value={event.end}
                  onChange={onChange}
                />
              </div>

              <div className='form-group'>
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
                className='btn btn-outline-warning btn-block mt-4'
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;