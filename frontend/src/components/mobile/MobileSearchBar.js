import * as React from 'react';

import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import useMediaQuery from '@mui/material/useMediaQuery';

function MobileSearchBar({ handleChange, handleClick }) {
  const isDesktop = useMediaQuery('(min-width: 700px)');

  return (
    <Box sx={{ margin: '1em 1em 0em 0em' }}>
      <FormControl fullWidth={isDesktop ? false : true} sx={{ m: 1 }}>
        <InputLabel htmlFor='outlined-adornment'>Location</InputLabel>
        <OutlinedInput
          id='outlined-adornment'
          startAdornment={
            <InputAdornment position='start'>
              <SearchIconButton handleClick={handleClick} />
            </InputAdornment>}
          label='Location'
          onChange={e => handleChange(e.target.value)} 
        />
      </FormControl>
    </Box>
  );
}

function SearchIconButton({ handleClick }) {
  return (
    <IconButton
      onClick={handleClick}
      size='small'
      style={{ margin: 0, padding: 0 }}
    >
      <SearchIcon />
    </IconButton>
  );
}

export default MobileSearchBar;