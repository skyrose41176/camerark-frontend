import {Checkbox, FormControlLabel, FormGroup, CheckboxProps} from '@mui/material';
import React, {FC} from 'react';
import {Controller, ControllerProps, UseFormReturn} from 'react-hook-form';

interface Props extends Omit<CheckboxProps, 'onChange' | 'form'> {
  name: string;
  label: string;
  form: UseFormReturn<any>;
  rules?: ControllerProps['rules'];
  onChange?: (checked: boolean) => void;
}
const CheckboxField: FC<Props> = props => {
  const {label, name, rules, form, onChange, ...rest} = props;
  const {control} = form;
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({field}) => (
        <FormGroup className="item-checkbox">
          <FormControlLabel
            control={
              <Checkbox
                {...field}
                checked={field.value || null}
                onChange={e => {
                  field.onChange(e);
                  onChange && onChange(e.target.checked);
                }}
                {...rest}
              />
            }
            label={label}
          />
        </FormGroup>
      )}
    />
  );
};

export default CheckboxField;
