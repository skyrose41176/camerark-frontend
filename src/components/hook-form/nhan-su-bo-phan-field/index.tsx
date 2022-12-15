import {Stack, Tooltip, Typography} from '@mui/material';
import React, {FC, useState} from 'react';
import {ControllerProps, UseFormReturn} from 'react-hook-form';
import {useGetAllNhanSuBoPhan} from 'src/apis';
import {AutocompleteAsyncField} from 'src/components/hook-form/fields';

interface Props {
  form: UseFormReturn<any>;
  rules?: ControllerProps['rules'];
  required?: boolean;
  disabled?: boolean;
  valueTypeSelectObject?: boolean;
  multiple?: boolean;
  label?: string;
}
const NhanSuBoPhanField: FC<Props> = ({
  form,
  required = false,
  rules,
  disabled = false,
  valueTypeSelectObject = false,
  multiple = false,
  label = 'Nhân sự',
}) => {
  const [search, setSearch] = useState('');
  const {data, isLoading} = useGetAllNhanSuBoPhan({pageNumber: 1, pageSize: 100, search});

  return (
    <AutocompleteAsyncField
      form={form}
      disabled={disabled}
      multiple={multiple}
      name={multiple ? 'nhanSuIds' : 'nhanSuId'}
      label={label}
      items={
        data?.data?.map(item => ({
          ...item,
          label: `${item.ten} - ${item.boPhan}`,
          value: item.id,
        })) || []
      }
      onSubmit={setSearch}
      rules={{
        required: {
          value: required,
          message: 'Vui lòng chọn nhân sự',
        },
        ...rules,
      }}
      loading={isLoading}
      valueTypeSelectObject={valueTypeSelectObject}
      renderOption={(props, option, {selected}) => {
        return (
          <Tooltip
            title={
              <Stack>
                <Typography variant="subtitle2">Mã nhân viên: {option?.maNs}</Typography>
                <Typography variant="subtitle2">Tên nhân viên: {option?.ten}</Typography>
                <Typography variant="subtitle2">Chức vụ: {option?.chucVu}</Typography>
                <Typography variant="subtitle2">Bộ phận: {option?.boPhan}</Typography>
              </Stack>
            }
            followCursor
          >
            <Typography {...props}>{option.label}</Typography>
          </Tooltip>
        );
      }}
    />
  );
};

export default NhanSuBoPhanField;
