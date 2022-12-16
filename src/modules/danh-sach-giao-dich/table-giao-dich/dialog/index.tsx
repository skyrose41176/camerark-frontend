import {SubmitHandler, useForm} from 'react-hook-form';
import {useCreateTransaction, useGetOneTransaction, useUpdateTransaction} from 'src/apis';
import {DialogBase} from 'src/components/base';
import {InputField} from 'src/components/hook-form/fields';
import FieldLayout from 'src/layouts/FieldLayout';
import {Transaction} from 'src/models';

interface Props {
  open: boolean;
  id?: string | undefined;
  onClose: () => void;
}
const DialogTransaction = ({open, id, onClose}: Props) => {
  const form = useForm<Transaction>({defaultValues: {}});
  const {
    handleSubmit,
    reset,
    setValue,
    formState: {isSubmitting},
  } = form;

  if (id) {
    useGetOneTransaction(id, (data: Transaction) => {
      setValue('modelProductId', data?.modelProductId);
      setValue('nameCustomer', data?.nameCustomer);
      setValue('phoneCustomer', data?.phoneCustomer);
      setValue('priceIn', data?.priceIn);
      setValue('priceOut', data?.priceOut);
      setValue('profit', data?.profit);
    });
  }

  const mutationCreate = useCreateTransaction(() => {
    onClose();
    reset();
  });

  const mutationUpdate = useUpdateTransaction(() => {
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
      title={id ? 'Sửa sản phẩm' : 'Thêm mới sản phẩm'}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      loading={isSubmitting}
      maxWidth="lg"
    >
      <FieldLayout md={4} lg={4} xl={4}>
        <InputField
          form={form}
          name="modelProductId"
          label="Tên sản phẩm"
          rules={{
            required: {
              value: true,
              message: ' Vui lòng nhập tên sản phẩm',
            },
          }}
        />
        <InputField
          form={form}
          name="nameCustomer"
          label="Tên khách"
          rules={{
            required: {
              value: true,
              message: ' Vui lòng nhập tên khách',
            },
          }}
        />
        <InputField
          form={form}
          name="phoneCustomer"
          label="Số điện thoại khách"
          rules={{
            required: {
              value: true,
              message: ' Vui lòng nhập số điện thoại khách',
            },
          }}
        />
        <InputField
          form={form}
          name="priceIn"
          label="Giá nhập"
          rules={{
            required: {
              value: true,
              message: ' Vui lòng nhập giá nhập',
            },
          }}
        />
        <InputField
          form={form}
          name="priceOut"
          label="Giá xuất"
          rules={{
            required: {
              value: true,
              message: ' Vui lòng nhập giá xuất',
            },
          }}
        />
        <InputField form={form} name="profit" label="Lợi nhuận" />
      </FieldLayout>
    </DialogBase>
  );
};
export default DialogTransaction;
