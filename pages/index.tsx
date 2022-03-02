import * as React from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Alert, Typography } from '@mui/material';

import Layout from '../src/Layout';
import Tank, { OnTankChange } from '../src/Tank';

const Home = () => {
  const onReceiverChange: OnTankChange = ({ volume, pressure }) => {
    console.log({ volume, pressure });
  };

  const onDonorChange: OnTankChange = ({ volume, pressure }) => {
    console.log({ volume, pressure });
  };

  return (
    <Layout>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" gutterBottom>
            Decanting
          </Typography>
          <Typography variant="subtitle1">
            Use this calculation if want to decant from one tank (or set of tanks) to another and
            you want to know the final pressure and final gas mix beforehand.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <Tank title="Receiver" onChange={onReceiverChange} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <Tank title="Donor" onChange={onDonorChange} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Result
            </Typography>
            <Alert severity="warning">
              This calculation is only approximate. Always analyse the final pressure and the final
              gas mix by yourself after doing decanting and before going diving!
            </Alert>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Home;
