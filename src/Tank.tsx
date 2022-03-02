import React, { useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material';

export type OnTankChange = (props: {
  volume: number | undefined;
  pressure: number | undefined;
}) => void;

interface TankProps {
  title: string;
  onChange: OnTankChange;
}

const PREDEFINED_TANKS: Array<{ value: number; title: string }> = [
  { value: 0.85, title: 'Single 0.85' },
  { value: 1, title: 'Single 1' },
  { value: 11.32675, title: 'Single S80' },
  { value: 12, title: 'Single 12' },
  { value: 15, title: 'Single 15' },
  { value: 14, title: 'Twinset 2x7' },
  { value: 17, title: 'Twinset 2x8.5' },
  { value: 24, title: 'Twinset 2x12' },
  { value: 30, title: 'Twinset 2x15' },
];

const Tank = ({ title, onChange }: TankProps) => {
  const [isCustom, setIsCustom] = useState(false);
  const [volume, setVolume] = useState('');
  const [pressure, setPressure] = useState('');

  useEffect(() => {
    const volumeNumber = parseFloat(volume);
    const pressureNumber = parseFloat(pressure);

    onChange({
      volume: isNaN(volumeNumber) ? undefined : volumeNumber,
      pressure: isNaN(pressureNumber) ? undefined : pressureNumber,
    });
  }, [volume, pressure, onChange]);

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
      </Grid>
      <Grid item>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={isCustom ? 'custom' : 'predefined'}
            onChange={() => setIsCustom(!isCustom)}
          >
            <FormControlLabel value="predefined" control={<Radio />} label="Predefined" />
            <FormControlLabel value="custom" control={<Radio />} label="Custom" />
          </RadioGroup>
        </FormControl>
      </Grid>
      {!isCustom && (
        <Grid item>
          <FormControl variant="filled" sx={{ width: '100%' }}>
            <InputLabel id="demo-simple-select-label">Tank (or set of tanks)</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Tank (or set of tanks)"
              value={volume}
              onChange={event => setVolume(event.target.value.toString())}
            >
              {PREDEFINED_TANKS.map(({ value, title }) => (
                <MenuItem key={title} value={value}>
                  {title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      )}
      {isCustom && (
        <Grid item>
          <FormControl sx={{ width: '100%' }}>
            <TextField
              label="Total volume of tank (or set of tanks) in liters"
              type="number"
              variant="filled"
              value={volume}
              onChange={event => setVolume(event.target.value.toString())}
            />
          </FormControl>
        </Grid>
      )}
      <Grid item>
        <FormControl sx={{ width: '100%' }}>
          <TextField
            label="Current pressure in bars"
            type="number"
            variant="filled"
            value={pressure}
            onChange={event => setPressure(event.target.value.toString())}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default Tank;
