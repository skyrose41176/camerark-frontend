import {FormHelperText, TextareaAutosize, TextareaAutosizeProps, Typography} from '@mui/material';
import React, {FC, useCallback} from 'react';
import {Controller, ControllerProps, UseFormReturn} from 'react-hook-form';
import {colors} from '../../../../theme';

interface Props extends Omit<TextareaAutosizeProps, 'form' | 'onChange'> {
  name: string;
  label: string;
  form: UseFormReturn<any>;
  rules?: ControllerProps['rules'];
  onChange?: (value: string) => void;
  className?: string;
}
const TextAreaField: FC<Props> = props => {
  const {label, name, rules, form, onChange, className = '', ...rest} = props;
  const {
    control,
    formState: {errors},
  } = form;

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

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({field}) => (
        <div className={className + ' flex flex-col'}>
          <Typography variant="h6">{label}</Typography>
          <TextareaAutosize
            {...field}
            {...rest}
            value={field.value || ''}
            onChange={e => {
              field.onChange(e);
              onChange && onChange(e.target.value);
            }}
            style={{width: '100%', borderRadius: '4px', padding: '8px'}}
            id={name}
            minRows={5}
          />
          {!!error() && (
            <FormHelperText style={{color: colors.error}}>{error()?.message}</FormHelperText>
          )}
        </div>
      )}
    />
  );
};

export default TextAreaField;
