import {Rating, RatingProps, Typography} from '@mui/material';
import {FC} from 'react';
import {Controller, ControllerProps, UseFormReturn} from 'react-hook-form';

interface Props extends Omit<RatingProps, 'onChange'> {
  name: string;
  label: string;
  form: UseFormReturn<any>;
  rules?: ControllerProps['rules'];
  labelWidth?: number;
  className?: string;
}
const RatingField: FC<Props> = props => {
  const {label, name, rules, form, labelWidth, className = '', ...rest} = props;
  const {control} = form;
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({field}) => (
        <div className={className + ' flex items-center'}>
          <Typography component="legend" style={{width: labelWidth}}>
            {label}:
          </Typography>
          <Rating
            className="ml-2"
            size="large"
            {...rest}
            {...field}
            onChange={(e, value) => {
              field.onChange(value);
            }}
          />
        </div>
      )}
    />
  );
};

export default RatingField;
