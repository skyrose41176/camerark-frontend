import {LoadingButton, LoadingButtonProps} from '@mui/lab';
import React, {FC} from 'react';
import {COLORS} from '../../../constants';
import {Color} from '../../types/color';

interface Props extends LoadingButtonProps {
  label: string;
  color?: Color;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  uppercase?: boolean;
}

const ButtonBase: FC<Props> = ({
  label,
  color = 'primary',
  endIcon,
  startIcon,
  variant = 'contained',
  onClick,
  uppercase = false,
  className,
  ...rest
}) => {
  return (
    <LoadingButton
      {...rest}
      children={label}
      title={label}
      // fullWidth
      sx={{
        color: variant === 'contained' ? '#fff' : COLORS[color],
        justifyContent: endIcon || startIcon ? 'space-between' : 'center',
      }}
      onClick={onClick}
      color={color}
      startIcon={startIcon}
      endIcon={endIcon}
      variant={variant}
      className={`${className} font-medium text-xs ${uppercase ? 'uppercase' : 'normal'}`}
    />
  );
};

export default ButtonBase;
