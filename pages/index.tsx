import React, { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

import Layout from '../src/Layout';
import Tank from '../src/Tank';
import Result, { ResultState } from '../src/Decanting/Result';

type FormField = 'receiverPressure' | 'receiverVolume' | 'donorPressure' | 'donorVolume';

const FORM_FIELDS: { [key: string]: { pressure: FormField; volume: FormField } } = {
  receiver: {
    pressure: 'receiverPressure',
    volume: 'receiverVolume',
  },
  donor: {
    pressure: 'donorPressure',
    volume: 'donorVolume',
  },
};

const getValue = (fieldValues: FieldValues, field: FormField): number =>
  parseFloat(fieldValues.getValues(field));

const Home = () => {
  const fieldValues = useForm();
  const [result, setResult] = useState<ResultState>('input');
  const [values, setValues] = useState({
    pressure: 0,
    donorPressure: 0,
    receiverPressure: 0,
    donorVolume: 0,
    receiverVolume: 0,
  });

  const handleOnSubmit = async () => {
    await fieldValues.trigger();

    if (Object.keys(fieldValues.formState.errors).length !== 0) {
      setResult('invalid');
      return;
    }

    setResult('result');

    const receiverPressure = getValue(fieldValues, 'receiverPressure');
    const receiverVolume = getValue(fieldValues, 'receiverVolume');
    const donorPressure = getValue(fieldValues, 'donorPressure');
    const donorVolume = getValue(fieldValues, 'donorVolume');

    const receiver = receiverPressure * receiverVolume;
    const donor = donorPressure * donorVolume;
    const pressure = Math.round((receiver + donor) / (receiverVolume + donorVolume));

    setValues({ pressure, receiverPressure, donorPressure, receiverVolume, donorVolume });

    if (receiverPressure >= donorPressure) {
      setResult('error');
      return;
    }
  };

  const handleReset = () => {
    setResult('input');
    fieldValues.reset();
  };

  const handleSwap = async () => {
    const receiverPressure = fieldValues.getValues('receiverPressure');
    const receiverVolume = fieldValues.getValues('receiverVolume');
    const donorPressure = fieldValues.getValues('donorPressure');
    const donorVolume = fieldValues.getValues('donorVolume');

    fieldValues.setValue('receiverPressure', donorPressure);
    fieldValues.setValue('receiverVolume', donorVolume);
    fieldValues.setValue('donorPressure', receiverPressure);
    fieldValues.setValue('donorVolume', receiverVolume);

    await handleOnSubmit();
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
          <Paper sx={{ p: 2 }}>
            <Tank title="Receiver" formFields={FORM_FIELDS.receiver} fieldValues={fieldValues} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 1,
            }}
          >
            <Tank title="Donor" formFields={FORM_FIELDS.donor} fieldValues={fieldValues} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Grid container spacing={2} direction="column">
              <Grid item>
                <Typography variant="h5" component="h2">
                  Result
                </Typography>
              </Grid>
              <Grid item>
                <Result
                  resultState={result}
                  values={values}
                  onSubmit={handleOnSubmit}
                  onReset={handleReset}
                  onSwap={handleSwap}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Home;
