import {Grid} from '@mui/material';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useCreateLoaiYeuCau, useGetOneLoaiYeuCau, useUpdateLoaiYeuCau} from 'src/apis';
import {DialogBase} from 'src/components/base';
import BoPhanField from 'src/components/hook-form/bo-phan-field';
import {CheckboxField, InputField} from 'src/components/hook-form/fields';
import LoaiNghiepVuField from 'src/components/hook-form/loai-nghiep-vu-field';
import FieldLayout from 'src/layouts/FieldLayout';

interface Props {
  open: boolean;
  id?: number;
  onClose: () => void;
}
const DialogFormLoaiYeuCau = ({open, id, onClose}: Props) => {
  const form = useForm<any>({defaultValues: {trangThai: true}});
  const {
    handleSubmit,
    reset,
    setValue,
    formState: {isSubmitting},
  } = form;

  useGetOneLoaiYeuCau(id, data => {
    setValue('ten', data.ten);
    setValue('loaiNghiepVuId', {
      label: data?.loaiNghiepVu?.ten,
      value: data?.loaiNghiepVuId,
    });
    data?.boPhanLoaiYeuCaus &&
      setValue(
        'boPhanIds',
        data?.boPhanLoaiYeuCaus?.map(item => ({label: item?.boPhan?.ten, value: item?.boPhanId}))
      );
    setValue('trangThai', data?.trangThai);
  });

  const mutationCreate = useCreateLoaiYeuCau(() => {
    onClose();
    reset({ten: '', loaiNghiepVuId: null, boPhanIds: null, trangThai: false});
  });

  const mutationUpdate = useUpdateLoaiYeuCau(() => {
    onClose();
    reset({ten: '', loaiNghiepVuId: null, boPhanIds: null, trangThai: false});
  });

  const onSubmit: SubmitHandler<any> = async data => {
    const newData = {
      ...data,
      loaiNghiepVuId: data?.loaiNghiepVuId?.value,
      boPhanIds: data?.boPhanIds?.map((item: any) => item?.value),
    };
    if (id) await mutationUpdate.mutateAsync({...newData, id: id});
    else await mutationCreate.mutateAsync(newData);
  };
  return (
    <DialogBase
      open={open}
      title={id ? 'Sửa loại yêu cầu' : 'Thêm mới loại yêu cầu'}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      loading={isSubmitting}
      maxWidth="sm"
    >
      {/* <CardTitle title="Địa chỉ" /> */}
      <FieldLayout md={12} lg={12} xl={12}>
        <LoaiNghiepVuField form={form} required valueTypeSelectObject />
      </FieldLayout>
      <FieldLayout className="mt-2" md={6} lg={6} xl={6}>
        <InputField
          form={form}
          name="ten"
          label="Tên loại yêu cầu"
          rules={{
            required: {
              value: true,
              message: ' Vui lòng nhập tên loại yêu cầu',
            },
          }}
        />
        <CheckboxField form={form} name="trangThai" label="Active" />
      </FieldLayout>
      <FieldLayout className="mt-2" md={12} lg={12} xl={12}>
        <BoPhanField form={form} multiple valueTypeSelectObject />
      </FieldLayout>
    </DialogBase>
  );
};
export default DialogFormLoaiYeuCau;
