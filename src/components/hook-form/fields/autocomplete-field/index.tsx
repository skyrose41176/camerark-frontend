import {Autocomplete, AutocompleteRenderOptionState, TextField} from '@mui/material';
import React from 'react';
import {Controller, ControllerProps, FieldPath, FieldValues, UseFormReturn} from 'react-hook-form';

interface Props<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  form: UseFormReturn<T>;
  type?: any;
  rules?: ControllerProps['rules'] | any;
  placeholder?: string;
  onSubmit?: (value: string) => void;
  onChange?: (value: any) => void;
  items: {label: string; value: string | number; [x: string]: any}[];
  keySelected?: string;
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
  renderOption?: (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: any,
    state: AutocompleteRenderOptionState
  ) => React.ReactNode;
  valueTypeSelectObject?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  size?: 'small' | 'medium';
  variant?: 'outlined';
  multiline?: boolean;
  [x: string]: any;
}
const AutocompleteField = <T extends FieldValues>(props: Props<T>) => {
  const {
    label,
    name,
    rules,
    form,
    placeholder,
    items = [],
    onSubmit,
    onChange,
    endIcon,
    startIcon,
    keySelected,
    renderOption,
    valueTypeSelectObject = false,
    disabled = false,
    multiple = false,
    size = 'medium',
    variant,
    multiline = false,
    ...rest
  } = props;
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
        <Autocomplete
          {...field}
          {...rest}
          size={size}
          multiple={multiple}
          disabled={disabled}
          id={name}
          noOptionsText="Không có dữ liệu"
          options={items}
          value={(field?.value || (multiple ? [] : '')) as any}
          onChange={(e, newValue) => {
            valueTypeSelectObject
              ? field.onChange(newValue)
              : keySelected
              ? field.onChange(
                  !Array.isArray(newValue)
                    ? newValue?.[keySelected]
                    : newValue.map(item => item[keySelected])
                )
              : field.onChange(
                  !Array.isArray(newValue)
                    ? newValue?.value
                    : newValue.map(item => item?.value && item?.value !== 0)
                );
            onChange && onChange(newValue);
          }}
          getOptionLabel={(option: any) => {
            return (
              option.label ??
              (keySelected
                ? items.find(item => option === item.label)?.label
                : items.find(item => option === item.value)?.label) ??
              ''
            );
          }}
          isOptionEqualToValue={(option, value) =>
            keySelected
              ? option?.[keySelected] === (valueTypeSelectObject ? value?.[keySelected] : value)
              : option.value === (valueTypeSelectObject ? value.value : value)
          }
          fullWidth
          {...(renderOption ? {renderOption} : {})}
          renderInput={params => (
            <TextField
              {...params}
              multiline={multiline}
              label={
                rules?.required?.value ? (
                  <div className="flex flex-row">
                    {label} <div className="text-error">&nbsp;*</div>
                  </div>
                ) : (
                  label
                )
              }
              variant={variant || 'standard'}
              margin="none"
              error={!!error()}
              helperText={error()?.message}
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
        />
      )}
    />
  );
};

export default AutocompleteField;
