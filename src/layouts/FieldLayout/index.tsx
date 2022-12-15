import {Grid, GridProps} from '@mui/material';
import React, {FC, ReactNode} from 'react';

export interface FieldLayoutProps extends GridProps {
  children: ReactNode;
}

const FieldLayout: FC<FieldLayoutProps> = ({
  children,
  xs = 12,
  md = 6,
  lg = 3,
  xl = 2,
  className,
  ...rest
}) => {
  return (
    <Grid className={className} container spacing={2}>
      {React.Children.map(children, (child, index) => {
        return child ? (
          <Grid key={index} item xs={xs} md={md} lg={lg} xl={xl} {...rest}>
            {child}
          </Grid>
        ) : null;
      })}
    </Grid>
  );
};

export default FieldLayout;
