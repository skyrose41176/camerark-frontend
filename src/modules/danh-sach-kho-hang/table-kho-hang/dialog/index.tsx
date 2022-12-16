import {SubmitHandler, useForm} from 'react-hook-form';
import {useCreateProduct, useGetOneProduct, useUpdateProduct} from 'src/apis';
import {DialogBase} from 'src/components/base';
import {CheckboxField, InputField} from 'src/components/hook-form/fields';
import FieldLayout from 'src/layouts/FieldLayout';
import {Product} from 'src/models';

interface Props {
  open: boolean;
  id?: string | undefined;
  onClose: () => void;
}
const DialogProduct = ({open, id, onClose}: Props) => {
  const form = useForm<Product>({defaultValues: {}});
  const {
    handleSubmit,
    reset,
    setValue,
    formState: {isSubmitting},
  } = form;

  if (id) {
    useGetOneProduct(id, (data: Product) => {
      setValue('name', data?.name);
      setValue('brand', data?.brand);
      setValue('status', data?.status);
    });
  }

  const mutationCreate = useCreateProduct(() => {
    onClose();
    reset();
  });

  const mutationUpdate = useUpdateProduct(() => {
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
          name="name"
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
          name="brand"
          label="Tên nhãn hiệu"
          rules={{
            required: {
              value: true,
              message: ' Vui lòng nhập tên nhãn hiệu',
            },
          }}
        />
        <CheckboxField form={form} name="status" label="Active" />
      </FieldLayout>
    </DialogBase>
  );
};
export default DialogProduct;
