import React, { ReactChild } from 'react';

import Grid from '@mui/material/Grid';
import { Alert, Button, Typography } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export type ResultState = 'input' | 'invalid' | 'result' | 'error';

interface ResultProps {
  resultState: ResultState;
  onSubmit: () => void;
  onReset: () => void;
  onSwap: () => void;
  values: {
    pressure: number;
    donorPressure: number;
    receiverPressure: number;
    donorVolume: number;
    receiverVolume: number;
  };
}

const Result = ({ resultState, values, onSubmit, onReset, onSwap }: ResultProps) => {
  const submit = (
    <Button variant="contained" onClick={onSubmit}>
      Calculate decanting
    </Button>
  );

  if (resultState === 'input') {
    return <>{submit}</>;
  }

  if (resultState === 'invalid') {
    return (
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Alert severity="info">
            You need to input all the parameters first before you can continue with the calculation.
          </Alert>
        </Grid>
        <Grid item>{submit}</Grid>
      </Grid>
    );
  }

  if (resultState === 'result') {
    return (
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Alert severity="warning">
            This calculation is only approximate. Always analyse the final pressure and the final
            gas mix by yourself after doing decanting and before going diving!
          </Alert>
        </Grid>
        <Grid item>
          <Grid container direction="column">
            <Grid item sx={{ marginBottom: '10px' }}>
              <Typography>
                Pressure after decanting in both receiver and donor will be{' '}
                <b>{values.pressure} bars</b>.
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">
                Receiver{' '}
                <ArrowDropUpIcon
                  color={'success'}
                  sx={{ marginRight: '-2px', top: '6px', position: 'relative' }}
                />
                {values.pressure - values.receiverPressure} bars
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">
                Donor{' '}
                <ArrowDropDownIcon
                  color="error"
                  sx={{ marginRight: '-2px', top: '7px', position: 'relative' }}
                />
                {values.donorPressure - values.pressure} bars
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={1}>
            <Grid item sx={{ width: { xs: 1, sm: 'auto' } }}>
              <Button
                variant="contained"
                color="primary"
                sx={{ width: { xs: 1, sm: 'auto' } }}
                onClick={onSubmit}
              >
                Recalculate
              </Button>
            </Grid>
            <Grid item sx={{ width: { xs: 1, sm: 'auto' } }}>
              <Button
                variant="contained"
                color="secondary"
                sx={{ width: { xs: 1, sm: 'auto' } }}
                onClick={onReset}
              >
                New calculation
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  if (resultState === 'error') {
    const isSame = values.donorPressure === values.receiverPressure;

    return (
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Alert severity={isSame ? 'info' : 'error'}>
            {isSame
              ? 'Pressure of receiver is exactly the same as pressure of donor. Potential decanting will have no effect.'
              : 'Pressure of receiver is higher than pressure of donor. If you perform this decanting, donor will receive gas from receiver.'}
          </Alert>
        </Grid>
        <Grid item>
          <Grid container spacing={1}>
            <Grid item sx={{ width: { xs: 1, sm: 'auto' } }}>
              <Button
                variant="contained"
                color={isSame ? 'primary' : 'error'}
                sx={{ width: { xs: 1, sm: 'auto' } }}
                onClick={isSame ? onSubmit : onSwap}
              >
                {isSame ? 'Recalculate' : 'Swap receiver and donor'}
              </Button>
            </Grid>
            <Grid item sx={{ width: { xs: 1, sm: 'auto' } }}>
              <Button
                variant="contained"
                color="secondary"
                sx={{ width: { xs: 1, sm: 'auto' } }}
                onClick={onReset}
              >
                Start again
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  return <></>;
};

export default Result;
