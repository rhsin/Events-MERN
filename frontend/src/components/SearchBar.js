import React from 'react';

import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

function InputWithIcon({ handleChange, handleClick }) {
  return (
    <Box sx={{ '& > :not(style)': { m: .5 } }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <IconButton
          onClick={handleClick}
          size='medium'
          style={{ padding: '0em .25em' }}
        >
          <SearchIcon />
        </IconButton>
        <TextField 
          id='input-with-sx' 
          label='Search Location' 
          variant='standard' 
          onChange={e => handleChange(e.target.value)} 
        />
      </Box>
    </Box>
  );
}

export default InputWithIcon;