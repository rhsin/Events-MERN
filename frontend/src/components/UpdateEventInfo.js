import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { url } from './constants'; 

function UpdateEventInfo(props) {
  const [event, setEvent] = useState({
    name: '',
    location: '',
    start: null,
    end: null,
    description: '',
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${url}/${id}`)
      .then(res => {
        setEvent({
          name: res.data.name,
          location: res.data.location,
          start: res.data.start,
          end: res.data.end,
          description: res.data.description
        });
      })
      .catch(err => {
        console.log('Error from UpdateEventInfo');
      });
  }, [id]);

  const onChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: event.name,
      location: event.location,
      start: event.start,
      end: event.end,
      description: event.description
    };

    axios.put(`${url}/${id}`, data)
      .then(res => {
        navigate(`/show-event/${id}`);
      })
      .catch(err => {
        console.log('Error in UpdateEventInfo!');
      });
  };

  return (
    <div className='UpdateEventInfo'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <br />
            <Link to='/' className='btn btn-outline-warning float-left'>
              Show Event List
            </Link>
          </div>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Edit Event</h1>
            <p className='lead text-center'>Update Event's Info</p>
          </div>
        </div>

        <div className='col-md-8 m-auto'>
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
            <br />

            <div className='form-group'>
              <label htmlFor='start'>Start</label>
              <input
                type='date'
                placeholder='Start'
                name='start'
                className='form-control'
                value={event.start}
                onChange={onChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='end'>End</label>
              <input
                type='date'
                placeholder='End'
                name='end'
                className='form-control'
                value={event.end}
                onChange={onChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='description'>Description</label>
              <textarea
                type='text'
                placeholder='Description of the event'
                name='description'
                className='form-control'
                value={event.description}
                onChange={onChange}
              />
            </div>
            <br />

            <button
              type='submit'
              className='btn btn-outline-info btn-lg btn-block'
            >
              Update Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateEventInfo;