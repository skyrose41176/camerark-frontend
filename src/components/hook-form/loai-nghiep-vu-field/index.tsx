import React, {FC, useState} from 'react';
import {ControllerProps, UseFormReturn} from 'react-hook-form';
import {AutocompleteAsyncField} from 'src/components/hook-form/fields';
import {useGetAllLoaiNghiepVu} from '../../../apis/loai-nghiep-vu/hook';

interface Props {
  form: UseFormReturn<any>;
  rules?: ControllerProps['rules'];
  required?: boolean;
  disabled?: boolean;
  valueTypeSelectObject?: boolean;
}
const LoaiNghiepVuField: FC<Props> = ({
  form,
  required = false,
  rules,
  disabled = false,
  valueTypeSelectObject = false,
}) => {
  const [search, setSearch] = useState('');
  const {data, isLoading} = useGetAllLoaiNghiepVu({
    pageNumber: 1,
    pageSize: 100,
    search,
    trangThai: true,
  });
  return (
    <AutocompleteAsyncField
      form={form}
      disabled={disabled}
      name="loaiNghiepVuId"
      label="Loại nghiệp vụ"
      items={data?.data?.map(item => ({...item, label: item.ten, value: item.id})) || []}
      onSubmit={setSearch}
      rules={{
        required: {
          value: required,
          message: 'Vui lòng chọn loại nghiệp vụ',
        },
        ...rules,
      }}
      loading={isLoading}
      onChange={() => form.setValue('loaiYeuCauId', null)}
      valueTypeSelectObject={valueTypeSelectObject}
    />
  );
};

export default LoaiNghiepVuField;
