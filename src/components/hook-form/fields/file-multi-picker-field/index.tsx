import {FormHelperText, Grid, Stack, Typography} from '@mui/material';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
// Import the plugin styles
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
// Import FilePond styles
import 'filepond/dist/filepond.min.css';
// Register the plugin
import React from 'react';
import {FilePond, registerPlugin} from 'react-filepond';
import {Controller, ControllerProps, FieldPath, FieldValues, UseFormReturn} from 'react-hook-form';

registerPlugin(FilePondPluginFileValidateType, FilePondPluginImagePreview);

interface Props<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  form: UseFormReturn<T>;
  rules?: ControllerProps['rules'] | any;
  isCapitalize?: boolean;
  isMulti?: boolean;
  acceptedFileTypes?: string[];
}

const FileMultiPickerField = <T extends FieldValues>(props: Props<T>) => {
  const {label, name, rules, form, isMulti = false, acceptedFileTypes, ...rest} = props;
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
        <Grid item xs={12} marginBottom={1}>
          <Stack direction="row" alignItems="center">
            <Typography variant="h6" color={errors[name] ? '#f44336' : '#6b778c'}>
              {rules?.required?.value ? (
                <div className="flex flex-row">
                  {label} <div className="text-error">&nbsp;*</div>
                </div>
              ) : (
                label
              )}
            </Typography>
          </Stack>
          <FilePond
            {...rest}
            files={field.value}
            allowImagePreview
            acceptedFileTypes={
              acceptedFileTypes ?? [
                'image/png',
                'image/jpg',
                'image/jpeg',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'application/pdf',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'application/vnd.ms-excel',
              ]
            }
            onupdatefiles={e => {
              field.onChange(e.map(fileItem => fileItem.file));
            }}
            allowMultiple={isMulti}
            name={name}
            labelIdle='Kéo & thả tập tin hoặc <span class="filepond--label-action">Chọn tập tin</span>'
          />
          {/* <FormHelperText error={!!errors[name]}>{errors[name]?.message}</FormHelperText> */}
        </Grid>
      )}
    />
  );
};

export default FileMultiPickerField;
