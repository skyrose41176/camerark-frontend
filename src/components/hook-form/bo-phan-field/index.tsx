import React, {FC, useState} from 'react';
import {ControllerProps, UseFormReturn} from 'react-hook-form';
import {useGetAllBoPhan} from 'src/apis';
import {AutocompleteAsyncField} from 'src/components/hook-form/fields';

interface Props {
  form: UseFormReturn<any>;
  rules?: ControllerProps['rules'];
  required?: boolean;
  disabled?: boolean;
  valueTypeSelectObject?: boolean;
  multiple?: boolean;
  label?: string;
  phieuYeuCauId?: number | string;
}
const BoPhanField: FC<Props> = ({
  form,
  required = false,
  rules,
  disabled = false,
  valueTypeSelectObject = false,
  multiple = false,
  label = 'Bộ phận',
  phieuYeuCauId,
}) => {
  const [search, setSearch] = useState('');
  const {data, isLoading} = useGetAllBoPhan({
    pageNumber: 1,
    pageSize: 100,
    search,
    phieuYeuCauId,
    trangThai: true,
  });
  return (
    <AutocompleteAsyncField
      form={form}
      disabled={disabled}
      multiple={multiple}
      name={multiple ? 'boPhanIds' : 'boPhanId'}
      label={label}
      items={data?.data?.map(item => ({...item, label: item.ten, value: item.id})) || []}
      onSubmit={setSearch}
      rules={{
        required: {
          value: required,
          message: 'Vui lòng chọn bộ phận',
        },
        ...rules,
      }}
      loading={isLoading}
      valueTypeSelectObject={valueTypeSelectObject}
    />
  );
};

export default BoPhanField;
