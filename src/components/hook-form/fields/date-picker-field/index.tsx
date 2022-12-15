import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import {TextField} from '@mui/material';
import {DatePicker, DatePickerProps, LocalizationProvider} from '@mui/x-date-pickers';
import moment from 'moment';
import {Controller, ControllerProps, FieldPath, FieldValues, UseFormReturn} from 'react-hook-form';

interface Props<T extends FieldValues>
  extends Omit<DatePickerProps<T, T>, 'onChange' | 'renderInput' | 'value' | 'name'> {
  label: string;
  name: FieldPath<T>;
  form: UseFormReturn<T>;
  rules?: ControllerProps['rules'];
}

const DatePickerField = <T extends FieldValues>(props: Props<T>) => {
  const {label, name, rules, form, views, ...rest} = props;
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
        <LocalizationProvider dateAdapter={AdapterMoment} locale={moment.locale('en')}>
          <DatePicker
            {...field}
            {...rest}
            onChange={(date: any) => {
              field.onChange(date ? new Date(date as Date) : date);
              field.onBlur();
            }}
            openTo="day"
            views={views ?? ['year', 'month', 'day']}
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
            inputFormat={
              views && views?.indexOf('month') > -1 && views?.indexOf('year') > -1
                ? 'MM/YYYY'
                : views?.find((item: any) => item === 'year')
                ? 'YYYY'
                : 'DD/MM/YYYY'
            }
            renderInput={(params: any) => (
              <TextField
                className="style-icon"
                {...params}
                onBlur={field.onBlur}
                variant="standard"
                margin="none"
                placeholder="DD/MM/YYYY"
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

export default DatePickerField;
