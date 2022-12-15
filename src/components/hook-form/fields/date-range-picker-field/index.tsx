import {DateRangePicker, LocalizationProvider} from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterMoment';
import {FormControl, FormHelperText, Input, InputLabel, Stack} from '@mui/material';
import moment from 'moment';
import {Controller, ControllerProps, FieldPath, FieldValues, UseFormReturn} from 'react-hook-form';

interface Props<T extends FieldValues> {
  label: string;
  name: FieldPath<T>;
  form: UseFormReturn<any>;
  rules?: ControllerProps['rules'];
}

const DateRangePickerField = <T extends FieldValues>(props: Props<T>) => {
  const {label, name, rules, form, ...rest} = props;
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
        <LocalizationProvider dateAdapter={DateAdapter} locale={moment.locale('en')}>
          <DateRangePicker
            {...field}
            {...rest}
            value={field.value || [null, null]}
            onChange={(dates: any) => {
              field.onChange(
                dates
                  ? dates?.map((date: any) =>
                      date
                        ? new Date(
                            new Date(date).setHours(new Date(date).getHours() + 7)
                          ).toISOString()
                        : date
                    )
                  : dates
              );
            }}
            label={
              rules?.required ? (
                <div className="flex flex-row">
                  {label} <div className="text-error">&nbsp;*</div>
                </div>
              ) : (
                label
              )
            }
            inputFormat="DD/MM/YYYY"
            renderInput={(startProps: any, endProps: any) => (
              <>
                <FormControl
                  className="style-icon"
                  variant="standard"
                  margin="none"
                  error={!!error()}
                  fullWidth
                >
                  <InputLabel htmlFor="component-error" shrink>
                    {rules?.required ? (
                      <div className="flex flex-row">
                        {label} <div className="text-error">&nbsp;*</div>
                      </div>
                    ) : (
                      label
                    )}
                  </InputLabel>

                  <Stack mt={2} direction="row" spacing={1}>
                    <Input
                      ref={startProps.inputRef as React.Ref<HTMLInputElement>}
                      fullWidth
                      inputProps={startProps.inputProps}
                    />
                    <Input
                      ref={endProps.inputRef as React.Ref<HTMLInputElement>}
                      fullWidth
                      inputProps={endProps.inputProps}
                    />
                  </Stack>

                  <FormHelperText>{error()?.message}</FormHelperText>
                </FormControl>
              </>
            )}
          />
        </LocalizationProvider>
      )}
    />
  );
};

export default DateRangePickerField;
