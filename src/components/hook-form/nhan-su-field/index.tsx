import {Stack, Tooltip, Typography} from '@mui/material';
import React, {FC, useState} from 'react';
import {ControllerProps, UseFormReturn} from 'react-hook-form';
import {useGetAllNhanSu} from 'src/apis';
import {AutocompleteAsyncField} from 'src/components/hook-form/fields';

interface Props {
  form: UseFormReturn<any>;
  rules?: ControllerProps['rules'];
  required?: boolean;
  disabled?: boolean;
  valueTypeSelectObject?: boolean;
  multiple?: boolean;
  label?: string;
  phieuYeuCauId?: string | number;
  name: string;
}
const NhanSuField: FC<Props> = ({
  form,
  required = false,
  rules,
  disabled = false,
  valueTypeSelectObject = false,
  multiple = false,
  label = 'Nhân sự',
  phieuYeuCauId,
  name,
}) => {
  const [search, setSearch] = useState('');
  const {data, isLoading} = useGetAllNhanSu({pageNumber: 1, pageSize: 100, search, phieuYeuCauId});
  return (
    <AutocompleteAsyncField
      form={form}
      disabled={disabled}
      multiple={multiple}
      name={name}
      label={label}
      items={data?.data?.map(item => ({...item, label: item.ten, value: item.id})) || []}
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
                <Typography variant="subtitle2">Email: {option?.email}</Typography>
                <Typography variant="subtitle2">Chức vụ: {option?.chucVu}</Typography>
                <Typography variant="subtitle2">Tên đơn vị: {option?.donVi}</Typography>
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

export default NhanSuField;
