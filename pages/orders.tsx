import * as React from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import Layout from '../src/Layout';

const Orders = () => (
  <Layout>
    <Grid container spacing={3}>
      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          Orders
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          BBB
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>CCC</Paper>
      </Grid>
    </Grid>
  </Layout>
);

export default Orders;
