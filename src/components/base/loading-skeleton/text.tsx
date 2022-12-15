import {Skeleton, SkeletonProps} from '@mui/material';
import React from 'react';

export interface TextProps extends SkeletonProps {
  width?: number | string;
  height?: number | string;
}

export default function Text(props: TextProps) {
  const {width = '100%', height = 26, ...rest} = props;
  return <Skeleton {...rest} width={width} height={height} />;
}
