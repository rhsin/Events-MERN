import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { url } from './constants'; 

function ShowEventDetails(props) {
  const [event, setEvent] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${url}/${id}`)
      .then(res => {
        setEvent(res.data);
      })
      .catch(err => {
        console.log(err.message);
      });
  }, [id]);

  const onDeleteClick = (id) => {
    axios.delete(`${url}/${id}`)
      .then(res => {
        navigate('/');
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  const EventItem = (
    <div>
      <table className='table table-hover table-light'>
        <tbody>
          <tr>
            <td>Name</td>
            <td>{event.name}</td>
          </tr>
          <tr>
            <td>Location</td>
            <td>{event.location}</td>
          </tr>
          <tr>
            <td>Link</td>
            <td>{event.link}</td>
          </tr>
          <tr>
            <td>Start</td>
            <td>{moment(event.start).format('MMMM Do YYYY, h:mm a')}</td>
          </tr>
          <tr>
            <td>End</td>
            <td>{moment(event.end).format('MMMM Do YYYY, h:mm a')}</td>
          </tr>
          <tr>
            <td>Promoter</td>
            <td>{event.promoter}</td>
          </tr>
          <tr>
            <td>Description</td>
            <td>{event.description}</td>
          </tr>
          <tr>
            <td>Category</td>
            <td>{event.category}</td>
          </tr>
          <tr>
            <td>Latitude</td>
            <td>{event.lat}</td>
          </tr>
          <tr>
            <td>Longitude</td>
            <td>{event.lng}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div className='ShowEventDetails'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-10 m-auto'>
            <br /> <br />
            <Link to='/' className='btn float-left'>
              Show Event List
            </Link>
          </div>
          <br />
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Event Details</h1>
            <p className='lead text-center'>View Event's Info</p>
            <hr /> <br />
          </div>
          <div className='col-md-10 m-auto'>{EventItem}</div>
          <div className='col-md-4 m-auto'>
            <Link
              to={`/edit-event/${event._id}`}
              className='btn btn-block btn-edit'
            >
              Edit Event
            </Link>
          </div>
          <div className='col-md-4 m-auto'>
            <button
              type='button'
              className='btn btn-block btn-delete'
              onClick={() => {
                onDeleteClick(event._id);
              }}
            >
              Delete Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowEventDetails;