import {Color} from '../components/types/color';

export const getColor = (color?: Color) => {
  switch (color) {
    case 'primary':
      return {color: 'primary', hover: 'primary-dark'};
    case 'success':
      return {color: 'success', hover: 'success-dark'};
    case 'error':
      return {color: 'error', hover: 'error-dark'};
    case 'info':
      return {color: 'info', hover: 'info-dark'};
    case 'warning':
      return {color: 'warning', hover: 'warning-dark'};
    default:
      return {color: 'primary', hover: 'primary-dark'};
  }
};
