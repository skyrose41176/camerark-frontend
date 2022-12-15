import {Typography} from '@mui/material';
import React from 'react';
import {COLORS} from 'src/constants';

const NoData = () => {
  return (
    <div className="text-center my-2 p-2 border border-solid border-warning rounded-[4px]">
      <Typography variant="h6" color={COLORS['warning-dark']}>
        Không có dữ liệu
      </Typography>
    </div>
  );
};

export default NoData;
