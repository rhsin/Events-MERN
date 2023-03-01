import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  padding: 3,
  overflow:'scroll',
  height:'100%',
  display:'block'
};

function EventsModal({ events, open, handleClose }) {
  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper sx={style}>
          <Button onClick={handleClose}>Back to Map</Button>
          <List 
            style={{maxHeight: 1165, overflow: 'auto'}}
          >
            {events}
          </List>
          <Button onClick={handleClose}>Close</Button>
        </Paper>
      </Modal>
    </Box>
  );
}

export default EventsModal;