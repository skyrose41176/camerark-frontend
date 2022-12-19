import {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useGetAllProduct} from 'src/apis';
import {
  useCreateModelProduct,
  useGetOneModelProduct,
  useUpdateModelProduct,
} from 'src/apis/modelproduct';
import {DialogBase} from 'src/components/base';
import {
  AutocompleteAsyncField,
  CheckboxField,
  DatePickerField,
  InputField,
} from 'src/components/hook-form/fields';
import FieldLayout from 'src/layouts/FieldLayout';
import {ModelProduct} from 'src/models';

interface Props {
  open: boolean;
  id?: string | undefined;
  onClose: () => void;
}
const DialogModelProduct = ({open, id, onClose}: Props) => {
  const form = useForm<any>();
  const [search, setSearch] = useState<string>('');

  const {data, isLoading, isFetching} = useGetAllProduct({search});
  const {
    handleSubmit,
    reset,
    setValue,
    formState: {isSubmitting},
  } = form;

  useGetOneModelProduct(id, (data: ModelProduct) => {
    setValue('dateAdd', data?.dateAdd);
    setValue('content', data?.content);
    setValue('isSold', data?.isSold);
    setValue('model', data?.model);
    setValue('priceAdd', data?.priceAdd);
    setValue('productId', data?.productId);
    setValue('product', data?.product);
    setValue('content', data?.content);
  });

  const mutationCreate = useCreateModelProduct(() => {
    onClose();
    reset();
  });

  const mutationUpdate = useUpdateModelProduct(() => {
    onClose();
    reset();
  });

  const onSubmit: SubmitHandler<any> = async data => {
    const newData = {
      ...data,
      productId: data.product.value,
      product: data.product,
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
        <AutocompleteAsyncField
          form={form}
          name="product"
          label="Sản phẩm"
          items={
            data?.data.map(item => ({
              ...item,
              label: item.name,
              value: item._id,
            })) ?? []
          }
          loading={isLoading}
          rules={{
            required: {
              value: true,
              message: ' Vui lòng chọn sản phẩm',
            },
          }}
          onSubmit={setSearch}
          valueTypeSelectObject
        />
        <InputField
          form={form}
          name="model"
          label="Mã"
          rules={{
            required: {
              value: true,
              message: ' Vui lòng nhập mã',
            },
          }}
        />
        <InputField
          form={form}
          name="priceAdd"
          label="Giá"
          rules={{
            required: {
              value: true,
              message: ' Vui lòng nhập giá',
            },
          }}
        />
        <DatePickerField
          form={form}
          name="dateAdd"
          label="Ngày nhập"
          rules={{
            required: {
              value: true,
              message: ' Vui lòng nhập ngày nhập',
            },
          }}
        />
        <CheckboxField form={form} name="isSold" label="Đã bán" />
      </FieldLayout>
      <FieldLayout md={12} lg={12} xl={12} className={'mt-2'}>
        <InputField form={form} name="content" label="Mô tả" multiline minRows={3} />
      </FieldLayout>
    </DialogBase>
  );
};
export default DialogModelProduct;
