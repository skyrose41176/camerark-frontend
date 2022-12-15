import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
  AutocompleteRenderOptionState,
  CircularProgress,
  TextField,
} from '@mui/material';
import React, {useCallback, useRef, useState} from 'react';
import {Controller, ControllerProps, FieldPath, FieldValues, UseFormReturn} from 'react-hook-form';

interface Item {
  label: string;
  value: string | number;
  [x: string]: any;
}
interface Props<T extends FieldValues> {
  name: FieldPath<T>;
  label: React.ReactNode;
  form: UseFormReturn<T>;
  type?: any;
  rules?: ControllerProps['rules'] | any;
  loading?: boolean;
  placeholder?: string;
  onSubmit?: (value: string) => void;
  onChange?: (
    value: any,
    reason?: AutocompleteChangeReason,
    detail?: AutocompleteChangeDetails<any>
  ) => void;
  multiple?: boolean;
  disabled?: boolean;
  items: Item[];
  keySelected?: string;
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
  renderOption?: (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: any,
    state: AutocompleteRenderOptionState
  ) => React.ReactNode;
  valueTypeSelectObject?: boolean;
}

const AutocompleteAsyncField = <T extends FieldValues>(props: Props<T>) => {
  const {
    label,
    name,
    rules,
    form,
    placeholder,
    items = [],
    loading = false,
    onSubmit,
    onChange,
    multiple = false,
    disabled = false,
    endIcon,
    startIcon,
    keySelected,
    renderOption,
    valueTypeSelectObject = false,
    ...rest
  } = props;
  const {
    control,
    formState: {errors},
    setFocus,
  } = form;
  const [search, setSearch] = useState('');
  const typingTimeoutRef = useRef<any>(null);

  const handleSearchDebounce = (value: string, reason: AutocompleteInputChangeReason) => {
    setSearch(value);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      if (onSubmit && (reason === 'input' || reason === 'clear')) {
        onSubmit(value);
      }
    }, 300);
  };

  const error = useCallback((): any => {
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
  }, [errors, name]);
  // useEffect(() => {
  //   setFocus(name);
  // }, [errors?.[name], name, setFocus]);
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({field}) => (
        <Autocomplete
          {...field}
          {...rest}
          id={name}
          noOptionsText="Không có dữ liệu"
          options={items}
          multiple={multiple}
          disabled={disabled}
          inputValue={search}
          onInputChange={(e, value, reason) => {
            handleSearchDebounce(value, reason);
          }}
          value={(field?.value || (multiple ? [] : '')) as any}
          onChange={(e, newValue, reason, detail) => {
            // console.log(newValue, reason, detail);
            valueTypeSelectObject
              ? field.onChange(newValue)
              : keySelected
              ? field.onChange(
                  !Array.isArray(newValue)
                    ? newValue?.[keySelected]
                    : newValue?.map(item =>
                        typeof item === 'number' || typeof item === 'string'
                          ? item
                          : item[keySelected]
                      ) ?? []
                )
              : field.onChange(
                  !Array.isArray(newValue)
                    ? newValue?.value
                    : newValue?.map(item =>
                        typeof item === 'number' || typeof item === 'string' ? item : item.value
                      ) ?? []
                );
            onChange && onChange(newValue, reason, detail);
          }}
          getOptionLabel={(option: any) =>
            option.label ?? items.find(item => option === item.value)?.label ?? option
          }
          loading={loading}
          loadingText="Đợi tí..."
          fullWidth
          filterOptions={(options, params) => options}
          isOptionEqualToValue={(option, value) =>
            option.value === (valueTypeSelectObject ? value.value : value)
          }
          {...(renderOption ? {renderOption} : {})}
          renderInput={params => (
            <TextField
              {...params}
              label={
                rules?.required?.value ? (
                  <div className="flex flex-row">
                    {label} <div className="text-error">&nbsp;*</div>
                  </div>
                ) : (
                  label
                )
              }
              variant="standard"
              margin="none"
              error={!!error()}
              helperText={error()?.message}
              InputProps={{
                ...params.InputProps,

                endAdornment: (
                  <>
                    {loading ? <CircularProgress color="inherit" size={20} /> : endIcon}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
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

export default AutocompleteAsyncField;
