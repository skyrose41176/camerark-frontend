import {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {
  useCreateTransaction,
  useGetAllProduct,
  useGetOneTransaction,
  useUpdateTransaction,
} from 'src/apis';
import {useGetAllModelProduct} from 'src/apis/modelproduct';
import {DialogBase} from 'src/components/base';
import {AutocompleteAsyncField, InputField} from 'src/components/hook-form/fields';
import FieldLayout from 'src/layouts/FieldLayout';
import {Transaction} from 'src/models';

interface Props {
  open: boolean;
  id?: string | undefined;
  onClose: () => void;
}
const DialogTransaction = ({open, id, onClose}: Props) => {
  const form = useForm<any>({defaultValues: {}});
  const {
    handleSubmit,
    reset,
    setValue,
    formState: {isSubmitting},
  } = form;

  useGetOneTransaction(id, (data: Transaction) => {
    setValue('modelProductId', data?.modelProductId);
    setValue('nameCustomer', data?.nameCustomer);
    setValue('phoneCustomer', data?.phoneCustomer);
    setValue('priceIn', data?.priceIn);
    setValue('priceOut', data?.priceOut);
    setValue('profit', data?.profit);
    setValue('content', data?.content);
    setValue('product', data?.product);
    setValue('modelProduct', data?.modelProduct);
  });

  const [search, setSearch] = useState<string>('');
  const {data, isLoading, isFetching} = useGetAllProduct({search});

  const [searchModel, setSearchModel] = useState<string>('');

  const [filters, setFilters] = useState<string>('');
  const {
    data: dataModel,
    isLoading: isLoadingModel,
    isFetching: isFetchingModel,
  } = useGetAllModelProduct({productId: filters, search: searchModel});
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
      title={id ? 'Sửa giao dịch' : 'Thêm mới giao dịch'}
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
          onChange={value => {
            setFilters(value._id);
          }}
          valueTypeSelectObject
        />
        <AutocompleteAsyncField
          form={form}
          name="modelproduct"
          label="Kho sản phẩm"
          items={
            dataModel?.data.map(item => ({
              ...item,
              label: item.model,
              value: item._id,
            })) ?? []
          }
          loading={isLoadingModel}
          rules={{
            required: {
              value: true,
              message: ' Vui lòng chọn sản phẩm',
            },
          }}
          onSubmit={setSearchModel}
          valueTypeSelectObject
        />
        <InputField
          form={form}
          name="modelProductId"
          label="Tên giao dịch"
          rules={{
            required: {
              value: true,
              message: ' Vui lòng nhập tên giao dịch',
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
      <FieldLayout md={12} lg={12} xl={12} className={'mt-2'}>
        <InputField form={form} name="content" label="Mô tả" multiline minRows={3} />
      </FieldLayout>
    </DialogBase>
  );
};
export default DialogTransaction;
