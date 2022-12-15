import {SubmitHandler, useForm} from 'react-hook-form';
import {useCreateLoaiNghiepVu, useGetOneLoaiNghiepVu, useUpdateLoaiNghiepVu} from 'src/apis';
import {DialogBase} from 'src/components/base';
import {CheckboxField, InputField} from 'src/components/hook-form/fields';
import FieldLayout from 'src/layouts/FieldLayout';

interface Props {
  open: boolean;
  id?: number;
  onClose: () => void;
}
const DialogFormLoaiNghiepVu = ({open, id, onClose}: Props) => {
  const form = useForm<any>({defaultValues: {trangThai: true}});
  const {
    handleSubmit,
    reset,
    formState: {isSubmitting},
  } = form;

  useGetOneLoaiNghiepVu(id, data => {
    reset({
      trangThai: data.trangThai,
      ten: data.ten,
    });
  });

  const mutationCreate = useCreateLoaiNghiepVu(() => {
    onClose();
    reset({ten: ''});
  });

  const mutationUpdate = useUpdateLoaiNghiepVu(() => {
    onClose();
    reset({ten: ''});
  });

  const onSubmit: SubmitHandler<any> = async data => {
    if (id) await mutationUpdate.mutateAsync({...data, id: id});
    else await mutationCreate.mutateAsync(data);
  };
  return (
    <DialogBase
      open={open}
      title={id ? 'Sửa loại nghiệp vụ' : 'Thêm mới loại nghiệp vụ'}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      loading={isSubmitting}
      maxWidth="sm"
    >
      {/* <CardTitle title="Địa chỉ" /> */}
      <FieldLayout md={6} lg={6} xl={6}>
        <InputField
          form={form}
          name="ten"
          label="Tên loại nghiệp vụ"
          rules={{
            required: {
              value: true,
              message: ' Vui lòng nhập tên loại nghiệp vụ',
            },
          }}
        />
        <CheckboxField form={form} name="trangThai" label="Active" />
      </FieldLayout>
    </DialogBase>
  );
};
export default DialogFormLoaiNghiepVu;
