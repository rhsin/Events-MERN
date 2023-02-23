import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
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

  const eventList = (
    <Paper elevation={1}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>{event.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Location</TableCell>
            <TableCell>{event.location}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Link</TableCell>
            <TableCell><a href={event.link}>{event.link}</a></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Start</TableCell>
            <TableCell>{moment(event.start).format('MMMM Do, YYYY')}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>End</TableCell>
            <TableCell>{moment(event.end).format('MMMM Do, YYYY')}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Promoter</TableCell>
            <TableCell>{event.promoter}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell>{event.description}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell>{event.category}</TableCell>
          </TableRow>
          {/* <TableRow>
            <TableCell>Latitude</TableCell>
            <TableCell>{event.lat}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Longitude</TableCell>
            <TableCell>{event.lng}</TableCell>
          </TableRow> */}
        </TableBody>
      </Table>
    </Paper>
  );

  return (
    <div className='ShowEventDetails'>
      <div className='container'>
        <div className='col-md-10 m-auto'>
          <Card>
            <CardMedia
              sx={{ height: 300 }}
              image={event.thumbnail}
            />
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                {event.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {eventList}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">
                <Link
                  to={`/edit-event/${event._id}`}
                >
                  Edit Event
                </Link>
              </Button>
              <Button size="small">
                <Link to='/'>Back To Map</Link>
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ShowEventDetails;