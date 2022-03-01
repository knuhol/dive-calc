import * as React from 'react';
import Typography, { TypographyTypeMap } from '@mui/material/Typography';

import Link from '../Link';

const Copyright = (props: TypographyTypeMap['props']) => {
  const YEAR_OF_CREATION = 2022;
  const currentYear = new Date().getFullYear();

  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://knuhol.tech/">
        Knut Holm
      </Link>{' '}
      {currentYear === YEAR_OF_CREATION ? YEAR_OF_CREATION : `${YEAR_OF_CREATION} - ${currentYear}`}
    </Typography>
  );
};

export default Copyright;
