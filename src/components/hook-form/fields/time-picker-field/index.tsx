import {DatePickerProps, LocalizationProvider, TimePicker} from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterMoment';
import {TextField} from '@mui/material';
import {Controller, ControllerProps, FieldPath, FieldValues, UseFormReturn} from 'react-hook-form';

interface Props<T extends FieldValues>
  extends Omit<DatePickerProps<T>, 'onChange' | 'renderInput' | 'value' | 'name'> {
  label: string;
  name: FieldPath<T>;
  form: UseFormReturn<T>;
  rules?: ControllerProps['rules'];
}

const TimePickerField = <T extends FieldValues>(props: Props<T>) => {
  const {label, name, rules, form, views, ...rest} = props;
  const {
    control,
    formState: {errors},
  } = form;
  const error = (): any => {
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
  <LocalizationProvider dateAdapter={DateAdapter}></LocalizationProvider>;
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({field}) => (
        <LocalizationProvider dateAdapter={DateAdapter}>
          <TimePicker
            {...field}
            onChange={(value: any) => {
              field.onChange(value ? new Date(value as Date) : value);
              field.onBlur();
            }}
            value={field.value || null}
            label={
              rules?.required ? (
                <div className="flex flex-row">
                  {label} <div className="text-error">&nbsp;*</div>
                </div>
              ) : (
                label
              )
            }
            renderInput={(params: any) => (
              <TextField
                className="style-icon"
                {...params}
                onBlur={field.onBlur}
                variant="standard"
                margin="none"
                placeholder="hh:mm"
                fullWidth
                error={!!error()}
                helperText={error()?.message}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        </LocalizationProvider>
      )}
    />
  );
};
export default TimePickerField;
