import {Icon} from 'iconsax-react';
import {Color} from './color';

export interface ButtonGroupProps {
  id: number;
  label: string;
  url: string;
  color: Color;
  startIcon?: Icon;
  endIcon?: Icon;
  count?: number | 0;
  countPosition?: 'start' | 'end';
  [x: string]: any;
}
