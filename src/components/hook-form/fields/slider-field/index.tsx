import {Slider, TextFieldProps} from '@mui/material';
import React from 'react';
import {Controller, ControllerProps, FieldPath, FieldValues, UseFormReturn} from 'react-hook-form';

// export type FieldPath<TFieldValues extends FieldValues> = Path<TFieldValues>;
interface Props<T extends FieldValues> extends Omit<TextFieldProps, 'name'> {
  name: FieldPath<T>;
  label?: React.ReactNode;
  form: UseFormReturn<T>;
  type?: React.HTMLInputTypeAttribute;
  rules?: ControllerProps['rules'] | any;
  isCapitalize?: boolean;
  onChangeValue?: (value: string) => void;
  formatNumber?: boolean;
  variant?: 'standard' | 'filled' | 'outlined' | undefined;
}

const SliderField = <T extends FieldValues>({
  name,
  rules,
  label,
  form,
  type,
  variant = 'standard',
  onChangeValue,
  InputProps,
  isCapitalize = false,
  formatNumber = true,
  ...rest
}: Props<T>) => {
  const {
    control,
    formState: {errors},
  } = form;

  const error = (): any => {
    // return name.split('.').reduce((prev, curr) => {
    //   return prev[curr];
    // }, errors);
    const fields = name.split('.');

    let result: any;
    fields.forEach((item, index) => {
      if (index > 0 && typeof result === 'object') {
        result = result[item];
      } else {
        result = errors[item];
      }
    });
    return result;
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({field}) => (
        <Slider
          aria-label="Always visible"
          // getAriaValueText={valuetext}
          // step={10}
          // marks={percent}
          valueLabelDisplay="on"
          value={field.value}
          name="phanTram2"
          onChange={(event, value) => {
            field.onChange(value);
          }}
        />
        // <TextField
        //   {...field}
        //   {...rest}
        //   id={name}
        //   label={
        //     rules?.required?.value ? (
        //       <div className="flex flex-row">
        //         {label} <div className="text-error">&nbsp;*</div>
        //       </div>
        //     ) : (
        //       label
        //     )
        //   }
        //   value={field.value ?? ''}
        //   onChange={event => {
        //     isCapitalize
        //       ? field.onChange(capitalize(event.target.value))
        //       : field.onChange(event.target.value);
        //     onChangeValue && onChangeValue(event.target.value);
        //   }}
        //   // onBlur={event => {
        //   //   isCapitalize
        //   //     ? field.onChange(capitalize(event.target.value))
        //   //     : field.onChange(event.target.value);
        //   //   onBlurValue && onBlurValue(event.target.value);
        //   // }}
        //   variant={variant}
        //   margin="none"
        //   type={type === 'number' ? (formatNumber ? 'text' : 'number') : type}
        //   InputProps={{
        //     inputComponent:
        //       type === 'number' ? (formatNumber ? (NumberFormatCustom as any) : 'input') : 'input',

        //     ...InputProps,
        //   }}
        //   InputLabelProps={{
        //     shrink: true,
        //   }}
        //   fullWidth
        //   error={!!error()}
        //   helperText={error()?.message}
        // />
      )}
    />
  );
};

export default SliderField;
