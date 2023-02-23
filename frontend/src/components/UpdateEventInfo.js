import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { url, categories } from './constants'; 

function UpdateEventInfo(props) {
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
    category: ''
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${url}/${id}`)
      .then(res => {
        setEvent({
          name: res.data.name,
          location: res.data.location,
          lat: res.data.lat,
          lng: res.data.lng,
          link: res.data.link,
          start: res.data.start,
          end: res.data.end,
          promoter: res.data.promoter,
          description: res.data.description,
          category: res.data.category
        });
      })
      .catch(err => {
        console.log(err.message);
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
      lat: event.lat,
      lng: event.lng,
      link: event.link,
      start: event.start,
      end: event.end,
      promoter: event.promoter,
      description: event.description,
      category: category
    };

    console.log(data);

    axios.put(`${url}/${id}`, data)
      .then(res => {
        navigate(`/show-event/${id}`);
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  return (
    <div className='UpdateEventInfo'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <br />
            <Link to='/' className='btn float-left'>
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
            <br />

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
            <br />

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
            <br />

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
            <br />

            <div className='form-group'>
              <label htmlFor='category'>Category</label>
              <select onChange={e => setCategory(e.target.value)}>
                {categories && categories.map((category, i) => 
                  <option value={category} key={i}>{category}</option>
                )}
              </select>
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
            <br />

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