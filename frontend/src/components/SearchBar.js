import React from 'react';

import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';

function SearchBar({ handleChange, handleClick }) {
  return (
    <Paper
      component='form'
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 200 }}
    >
      <IconButton 
        onClick={handleClick} 
        type='button' 
        sx={{ p: '.22em' }} 
      >
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: .5, flex: 1 }}
        placeholder='Search Location'
        onChange={e => handleChange(e.target.value)} 
      />
    </Paper>
  );
}

export default SearchBar;