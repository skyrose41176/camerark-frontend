import {CircularProgress, IconButton, IconButtonProps} from '@mui/material';
import {Icon} from 'iconsax-react';
import React from 'react';
import {COLORS} from '../../../constants';
import {Color} from '../../types/color';

type IconSize = 'small' | 'medium' | 'large';
interface IconButtonBaseProps extends IconButtonProps {
  rounded?: boolean;
  hasBackground?: boolean;
  color?: Color;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  iconName: Icon | any;
  iconSize?: IconSize;
  tooltip?: string;
  className?: string;
  loading?: boolean;
  variant?: 'Linear' | 'Outline' | 'Broken' | 'Bold' | 'Bulk' | 'TwoTone';
}

const IconButtonBase = ({
  color = 'primary',
  hasBackground = false,
  rounded = true,
  iconName,
  iconSize = 'small',
  onClick,
  tooltip = '',
  className = '',
  variant = 'Linear',
  loading = false,
  ...rest
}: IconButtonBaseProps) => {
  const IconClone: Icon = iconName;
  return (
    <IconButton
      {...rest}
      title={tooltip}
      className={`${rounded ? `rounded-full` : 'rounded-md'} ${className}`}
      sx={
        hasBackground
          ? {
              backgroundColor: COLORS[color],
              '&:hover': {backgroundColor: COLORS[`${color}-dark`]},
            }
          : {}
      }
      size={iconSize}
      edge="start"
      color={color}
      onClick={onClick}
    >
      {loading ? (
        <CircularProgress
          size={iconSize === 'small' ? 16 : iconSize === 'medium' ? 24 : 32}
          color={hasBackground ? 'inherit' : 'primary'}
        />
      ) : (
        <IconClone
          variant={variant}
          size={iconSize === 'small' ? 16 : iconSize === 'medium' ? 24 : 32}
          color={hasBackground ? '#fff' : COLORS[rest.disabled ? 'inherit' : color]}
        />
      )}
    </IconButton>
  );
};

export default IconButtonBase;
