import {Backdrop, CircularProgress} from '@mui/material';
import React from 'react';

const LoadingOverlay = ({open}: {open: boolean}) => {
  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: theme => theme.zIndex.drawer + 1000,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        backgroundColor: '#00000040',
      }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingOverlay;
