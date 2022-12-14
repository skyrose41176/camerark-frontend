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
      title={id ? 'S???a giao d???ch' : 'Th??m m???i giao d???ch'}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      loading={isSubmitting}
      maxWidth="lg"
    >
      <FieldLayout md={4} lg={4} xl={4}>
        <AutocompleteAsyncField
          form={form}
          name="product"
          label="S???n ph???m"
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
              message: ' Vui l??ng ch???n s???n ph???m',
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
          label="Kho s???n ph???m"
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
              message: ' Vui l??ng ch???n s???n ph???m',
            },
          }}
          onSubmit={setSearchModel}
          valueTypeSelectObject
        />
        <InputField
          form={form}
          name="modelProductId"
          label="T??n giao d???ch"
          rules={{
            required: {
              value: true,
              message: ' Vui l??ng nh???p t??n giao d???ch',
            },
          }}
        />
        <InputField
          form={form}
          name="nameCustomer"
          label="T??n kh??ch"
          rules={{
            required: {
              value: true,
              message: ' Vui l??ng nh???p t??n kh??ch',
            },
          }}
        />
        <InputField
          form={form}
          name="phoneCustomer"
          label="S??? ??i???n tho???i kh??ch"
          rules={{
            required: {
              value: true,
              message: ' Vui l??ng nh???p s??? ??i???n tho???i kh??ch',
            },
          }}
        />
        <InputField
          form={form}
          name="priceIn"
          label="Gi?? nh???p"
          rules={{
            required: {
              value: true,
              message: ' Vui l??ng nh???p gi?? nh???p',
            },
          }}
        />
        <InputField
          form={form}
          name="priceOut"
          label="Gi?? xu???t"
          rules={{
            required: {
              value: true,
              message: ' Vui l??ng nh???p gi?? xu???t',
            },
          }}
        />
        <InputField form={form} name="profit" label="L???i nhu???n" />
      </FieldLayout>
      <FieldLayout md={12} lg={12} xl={12} className={'mt-2'}>
        <InputField form={form} name="content" label="M?? t???" multiline minRows={3} />
      </FieldLayout>
    </DialogBase>
  );
};
export default DialogTransaction;
