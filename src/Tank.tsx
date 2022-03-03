import React, { useState } from 'react';
import { Controller, FieldValues } from 'react-hook-form';

import Grid from '@mui/material/Grid';
import {
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';

interface TankProps {
  title: string;
  formFields: { volume: string; pressure: string };
  fieldValues: FieldValues;
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

const Tank = ({ title, fieldValues, formFields }: TankProps) => {
  const [isCustom, setIsCustom] = useState(false);

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
            onChange={() => {
              if (
                isCustom &&
                !PREDEFINED_TANKS.map(({ value }) => value.toString()).includes(
                  fieldValues.getValues(formFields.volume),
                )
              ) {
                fieldValues.resetField(formFields.volume);
              }
              setIsCustom(!isCustom);
            }}
          >
            <FormControlLabel value="predefined" control={<Radio />} label="Predefined" />
            <FormControlLabel value="custom" control={<Radio />} label="Custom" />
          </RadioGroup>
        </FormControl>
      </Grid>
      {!isCustom && (
        <Grid item>
          <FormControl variant="filled" sx={{ width: '100%' }}>
            <Controller
              rules={{ required: 'You need to select a tank (or set of tanks)' }}
              defaultValue=""
              name={formFields.volume}
              control={fieldValues.control}
              render={({ field: { onChange, value }, fieldState: { invalid, error } }) => (
                <TextField
                  variant="filled"
                  select
                  label="Tank (or set of tanks)"
                  value={value}
                  onChange={event => {
                    onChange(event);
                    fieldValues.trigger(formFields.volume);
                  }}
                  error={invalid}
                  helperText={error?.message}
                >
                  {PREDEFINED_TANKS.map(({ value, title }) => (
                    <MenuItem key={title} value={value}>
                      {title}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </FormControl>
        </Grid>
      )}
      {isCustom && (
        <Grid item>
          <FormControl sx={{ width: '100%' }}>
            <Controller
              rules={{
                required: 'You need to specify the current pressure',
                min: {
                  value: 0.85,
                  message:
                    'Total volume of tank (or set of tanks) cannot be lower than 0.85 liters',
                },
                max: {
                  value: 18,
                  message: 'Total volume of tank (or set of tanks) cannot be higher than 18 liters',
                },
              }}
              defaultValue=""
              name={formFields.volume}
              control={fieldValues.control}
              render={({ field: { onChange, value }, fieldState: { invalid, error } }) => (
                <TextField
                  label="Total volume of tank (or set of tanks) in liters"
                  type="number"
                  variant="filled"
                  value={value}
                  onChange={event => {
                    onChange(event);
                    fieldValues.trigger(formFields.volume);
                  }}
                  error={invalid}
                  helperText={error?.message}
                />
              )}
            />
          </FormControl>
        </Grid>
      )}
      <Grid item>
        <FormControl sx={{ width: '100%' }}>
          <Controller
            defaultValue=""
            name={formFields.pressure}
            control={fieldValues.control}
            rules={{
              required: 'You need to specify the current pressure',
              min: {
                value: formFields.pressure === 'donorPressure' ? 1 : 0,
                message: `Current pressure cannot be lower than ${
                  formFields.pressure === 'donorPressure' ? 1 : 0
                } bar`,
              },
              max: { value: 300, message: 'Current pressure cannot be higher than 300 bars' },
            }}
            render={({ field: { value, onChange }, fieldState: { invalid, error } }) => (
              <TextField
                label="Current pressure in bars"
                type="number"
                variant="filled"
                value={value}
                onChange={event => {
                  onChange(event);
                  fieldValues.trigger(formFields.pressure);
                }}
                error={invalid}
                helperText={error?.message}
              />
            )}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default Tank;
