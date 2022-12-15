import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  RadioGroupProps,
} from '@mui/material';
import React, {FC} from 'react';
import {Controller, ControllerProps, UseFormReturn} from 'react-hook-form';
import {COLORS} from 'src/constants';

interface Props extends Omit<RadioGroupProps, 'onChange'> {
  name: string;
  label: string;
  form: UseFormReturn<any>;
  rules?: ControllerProps['rules'];
  onChange?: (value: string) => void;
  items: {label: string; value: string | number}[];
  disabled?: boolean;
  xs?: number;
  md?: number;
  lg?: number;
  xl?: number;
}
const RadioGroupField: FC<Props> = props => {
  const {
    label,
    name,
    rules,
    form,
    onChange,
    disabled,
    items,
    xs = 12,
    md = 6,
    lg = 4,
    xl = 4,
    ...rest
  } = props;
  const {
    control,
    formState: {errors},
  } = form;
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({field}) => (
        <div>
          <FormControl component="fieldset">
            <FormLabel component="legend">{label}</FormLabel>
            <RadioGroup
              row
              aria-label={name}
              {...field}
              {...rest}
              onChange={e => {
                field.onChange(e);
                onChange && onChange(e.target.value);
              }}
            >
              <Grid container spacing={2}>
                {items.map(item => (
                  <Grid
                    item
                    xs={xs}
                    md={md}
                    lg={lg}
                    xl={xl}
                    key={item.value.toString()}
                    className="item-radio"
                  >
                    <FormControlLabel
                      disabled={disabled}
                      value={item.value}
                      checked={field.value?.toString() === item.value?.toString()}
                      control={<Radio />}
                      label={item.label}
                      sx={{border: 'none'}}
                    />
                  </Grid>
                ))}
              </Grid>
            </RadioGroup>
            {errors[name] && (
              <FormHelperText sx={{color: COLORS.error, marginLeft: 0}}>
                {errors[name]?.message as string}
              </FormHelperText>
            )}
          </FormControl>
        </div>
      )}
    />
  );
};

export default RadioGroupField;
