import React, {FC, useEffect, useState} from 'react';
import {ControllerProps, UseFormReturn} from 'react-hook-form';
import {useQuery} from 'react-query';
import {useGetAllLoaiYeuCau} from 'src/apis';
import {AutocompleteAsyncField} from 'src/components/hook-form/fields';

interface Props {
  form: UseFormReturn<any>;
  rules?: ControllerProps['rules'];
  required?: boolean;
  disabled?: boolean;
  valueTypeSelectObject?: boolean;
}
const LoaiYeuCauField: FC<Props> = ({
  form,
  required = false,
  rules,
  disabled = false,
  valueTypeSelectObject = false,
}) => {
  const [search, setSearch] = useState('');
  const {watch, reset} = form;
  const loaiNghiepVuId = valueTypeSelectObject
    ? watch('loaiNghiepVuId')?.value
    : watch('loaiNghiepVuId');
  const {data, isFetching} = useGetAllLoaiYeuCau({
    pageNumber: 1,
    pageSize: 100,
    loaiNghiepVuId,
    search,
    trangThai: true,
  });
  useEffect(() => {
    if (!loaiNghiepVuId) {
      reset({
        loaiYeuCauId: null,
      });
    }
  }, [loaiNghiepVuId, reset]);

  return (
    <AutocompleteAsyncField
      form={form}
      name="loaiYeuCauId"
      label="Loại yêu cầu"
      items={data?.data?.map(item => ({...item, label: item.ten, value: item.id})) || []}
      onSubmit={setSearch}
      rules={{
        required: {
          value: required,
          message: 'Vui lòng chọn loại yêu cầu',
        },
        ...rules,
      }}
      loading={isFetching}
      disabled={disabled || !loaiNghiepVuId}
      valueTypeSelectObject={valueTypeSelectObject}
    />
  );
};

export default LoaiYeuCauField;
