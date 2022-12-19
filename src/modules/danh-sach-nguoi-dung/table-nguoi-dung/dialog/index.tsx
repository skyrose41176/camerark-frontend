import {SubmitHandler, useForm} from 'react-hook-form';
import {useCreateUser, useGetOneUser, useUpdateUser} from 'src/apis';
import {DialogBase} from 'src/components/base';
import {InputField} from 'src/components/hook-form/fields';
import FieldLayout from 'src/layouts/FieldLayout';
import {User} from 'src/models';

interface Props {
  open: boolean;
  id?: string | undefined;
  onClose: () => void;
}
const DialogUser = ({open, id, onClose}: Props) => {
  const form = useForm<User>({defaultValues: {}});
  const {
    handleSubmit,
    reset,
    setValue,
    formState: {isSubmitting},
  } = form;

  useGetOneUser(id, (data: User) => {
    setValue('name', data?.name);
    setValue('address', data?.address);
    setValue('phone', data?.phone);
  });

  const mutationCreate = useCreateUser(() => {
    onClose();
    reset();
  });

  const mutationUpdate = useUpdateUser(() => {
    onClose();
    reset();
  });

  const onSubmit: SubmitHandler<any> = async data => {
    const newData = {
      ...data,
    };
    if (id) await mutationUpdate.mutateAsync({...newData, _id: id});
    else await mutationCreate.mutateAsync(newData);
  };
  return (
    <DialogBase
      open={open}
      title={id ? 'Sửa người dùng' : 'Thêm mới người dùng'}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      loading={isSubmitting}
      maxWidth="lg"
    >
      <FieldLayout md={4} lg={4} xl={4}>
        <InputField
          form={form}
          name="name"
          label="Tên người dùng"
          rules={{
            required: {
              value: true,
              message: ' Vui lòng nhập tên người dùng',
            },
          }}
        />
        <InputField
          form={form}
          name="phone"
          label="Số điện thoại"
          rules={{
            required: {
              value: true,
              message: ' Vui lòng nhập số điện thoại',
            },
          }}
        />
        <InputField
          form={form}
          name="password"
          label="Mật khẩu"
          rules={{
            required: {
              value: true,
              message: ' Vui lòng nhập mật khẩu',
            },
          }}
        />
        <InputField form={form} name="address" label="Địa chỉ" />
      </FieldLayout>
    </DialogBase>
  );
};
export default DialogUser;
