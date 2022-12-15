// ----------------------------------------------------------------------

import {ThemeOptions} from '@mui/material';

export default function Skeleton(theme: ThemeOptions) {
  return {
    MuiSkeleton: {
      defaultProps: {
        animation: 'wave',
      },
    },
  };
}
