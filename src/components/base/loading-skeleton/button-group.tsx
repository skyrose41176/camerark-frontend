import {Skeleton, SkeletonProps} from '@mui/material';
import React from 'react';

export interface ButtonGroupProps extends SkeletonProps {
  numberOfButtons?: number;
}

export default function ButtonGroup(props: ButtonGroupProps) {
  const {numberOfButtons = 1, width = 100, ...rest} = props;
  return (
    <>
      {Array.from(Array(numberOfButtons).keys()).map(btn => (
        <React.Fragment key={btn}>
          <Skeleton {...rest} height={40} width={width} />
          <div className="mx-2" />
        </React.Fragment>
      ))}
    </>
  );
}
