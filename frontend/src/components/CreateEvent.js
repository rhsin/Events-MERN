import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { url, categories } from './constants'; 

function CreateEvent(props) {
  const navigate = useNavigate();
  const [category, setCategory] = useState('Cycling');
  const [event, setEvent] = useState({
    name: '',
    location: '',
    lat: '',
    lng: '',
    link: '',
    start: '',
    end: '',
    promoter: '',
    description: '',
    category: category
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
          lat: '',
          lng: '',
          link: '',
          start: '',
          end: '',
          promoter: '',
          description: '',
          category: ''
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
            <h1 className='display-4 text-center'>Register Event</h1>
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
                <label htmlFor='link'>Link</label>
                <input
                  type='text'
                  placeholder='Link'
                  name='link'
                  className='form-control'
                  value={event.link}
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
                <label htmlFor='promoter'>Promoter</label>
                <input
                  type='text'
                  placeholder='Promoter for the event'
                  name='promoter'
                  className='form-control'
                  value={event.promoter}
                  onChange={onChange}
                />
              </div>

              <div className='form-group'>
                <label htmlFor='category'>Category</label>
                <select 
                  class="form-select"
                  aria-label="Select Category" 
                  onChange={e => setCategory(e.target.value)}
                >
                  {categories && categories.map((category, i) => 
                    <option value={category} key={i}>{category}</option>
                  )}
                </select>
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

              <div className='form-group'>
                <label htmlFor='lat'>Latitude</label>
                <input
                  type='text'
                  placeholder='Latitude'
                  name='lat'
                  className='form-control'
                  value={event.lat}
                  onChange={onChange}
                />
              </div>

              <div className='form-group'>
                <label htmlFor='lng'>Longitude</label>
                <input
                  type='text'
                  placeholder='Longitude'
                  name='lng'
                  className='form-control'
                  value={event.lng}
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
}

export default CreateEvent;