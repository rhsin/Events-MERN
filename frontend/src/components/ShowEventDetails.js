import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
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
        console.log('Error from ShowEventDetails');
      });
  }, [id]);

  const onDeleteClick = (id) => {
    axios.delete(`${url}/${id}`)
      .then(res => {
        navigate('/');
      })
      .catch(err => {
        console.log('Error form ShowEventDetails_deleteClick');
      });
  };

  const EventItem = (
    <div>
      <table className='table table-hover table-dark'>
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
            <th scope='row'></th>
            <td>Start</td>
            <td>{event.start}</td>
          </tr>
          <tr>
            <td>End</td>
            <td>{event.end}</td>
          </tr>
          <tr>
            <td>Description</td>
            <td>{event.description}</td>
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
            <Link to='/' className='btn btn-outline-warning float-left'>
              Show Event List
            </Link>
          </div>
          <br />
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Event's Record</h1>
            <p className='lead text-center'>View Event's Info</p>
            <hr /> <br />
          </div>
          <div className='col-md-10 m-auto'>{EventItem}</div>
          <div className='col-md-6 m-auto'>
            <button
              type='button'
              className='btn btn-outline-danger btn-lg btn-block'
              onClick={() => {
                onDeleteClick(event._id);
              }}
            >
              Delete Event
            </button>
          </div>
          <div className='col-md-6 m-auto'>
            <Link
              to={`/edit-event/${event._id}`}
              className='btn btn-outline-info btn-lg btn-block'
            >
              Edit Event
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowEventDetails;