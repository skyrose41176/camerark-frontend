import { Box } from '@mui/material';
import React, { FC } from 'react';

interface Props {
  children: React.ReactNode;
  value: number;
  index: number;
}
const TabPanel: FC<Props> = props => {
  const { children, value, index } = props;
  return (
    <div
      role="tabpanel" 
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

export default TabPanel;
