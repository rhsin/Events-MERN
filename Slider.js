import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Input from '@mui/material/Input';

function RangeSlider({ date1, date2, setDate1, setDate2 }) {

  const handleSliderChange = (event, newDate) => {
    setDate1(newDate[0]);
    setDate2(newDate[1]);
  };

  const handleInputChange = (event) => {
    setDate1(event.target.date === '' ? '' : Number(event.target.date));
  };

  return (
    <Box sx={{ width: 250 }}>
      <Typography id="input-slider" gutterBottom>
        Volume
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
        <Input
            value={date1}
            size="small"
            onChange={handleInputChange}
            inputProps={{
              step: 10,
              min: 0,
              max: 100,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof date === 'number' ? date1 : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            value={date2}
            size="small"
            onChange={handleInputChange}
            inputProps={{
              step: 10,
              min: 0,
              max: 100,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default RangeSlider;