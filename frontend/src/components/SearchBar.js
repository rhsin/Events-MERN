import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';

function InputWithIcon({ handleChange, handleClick }) {
  return (
    <Box sx={{ '& > :not(style)': { m: .5 } }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <IconButton
          onClick={handleClick}
          size='small'
          style={{ padding: '0px 6px' }}
        >
          <SearchIcon />
        </IconButton>
        <TextField 
          id="input-with-sx" 
          label="Search Location" 
          variant="standard" 
          onChange={e => handleChange(e.target.value)} 
        />
      </Box>
    </Box>
  );
}

export default InputWithIcon;