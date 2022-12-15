import {SubmitHandler, useForm} from 'react-hook-form';
import {useCreateBoPhan, useGetOneBoPhan, useUpdateBoPhan} from 'src/apis';
import {DialogBase} from 'src/components/base';
import {CheckboxField, InputField} from 'src/components/hook-form/fields';
import NhanSuField from 'src/components/hook-form/nhan-su-field';
import FieldLayout from 'src/layouts/FieldLayout';

interface Props {
  open: boolean;
  id?: number;
  onClose: () => void;
}
const DialogFormBoPhan = ({open, id, onClose}: Props) => {
  const form = useForm<any>({defaultValues: {nhanSuIds: [], trangThai: true}});
  const {
    handleSubmit,
    reset,
    setValue,
    formState: {isSubmitting},
  } = form;

  useGetOneBoPhan(id, data => {
    setValue('ten', data?.ten);
    setValue('groupMail', data?.groupMail);
    setValue(
      'nhanSuIds',
      data?.nhanSuBoPhans?.map(item => ({
        label: item?.nhanSu?.ten,
        value: item?.nhanSuId,
        id: item?.nhanSuId,
      })) ?? []
    );
    setValue('trangThai', data?.trangThai);
  });

  const mutationCreate = useCreateBoPhan(() => {
    onClose();
    reset({ten: ''});
  });

  const mutationUpdate = useUpdateBoPhan(() => {
    onClose();
    reset({ten: ''});
  });

  const onSubmit: SubmitHandler<any> = async data => {
    const newData = {
      ...data,
      nhanSuIds: data?.nhanSuIds?.map((item: any) => item?.id),
    };

    if (id) await mutationUpdate.mutateAsync({...newData, id: id});
    else await mutationCreate.mutateAsync(newData);
  };
  return (
    <DialogBase
      open={open}
      title={id ? 'Sửa bộ phận' : 'Thêm mới bộ phận'}
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
          label="Tên bộ phận"
          rules={{
            required: {
              value: true,
              message: ' Vui lòng nhập tên bộ phận',
            },
          }}
        />
        <CheckboxField form={form} name="trangThai" label="Active" />
      </FieldLayout>
      <FieldLayout className="mt-1" md={12} lg={12} xl={12}>
        <InputField
          form={form}
          name="groupMail"
          label="Nhóm mail"
          rules={{
            required: {
              value: true,
              message: ' Vui lòng nhập nhóm mail',
            },
          }}
        />
        <NhanSuField form={form} name="nhanSuIds" multiple required valueTypeSelectObject />
      </FieldLayout>
    </DialogBase>
  );
};
export default DialogFormBoPhan;
