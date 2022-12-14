import {useMutation, useQuery, useQueryClient} from 'react-query';
import {ModelProduct, Product} from 'src/models';
import {QueryParams} from 'src/models/common';
import {useAppDispatch} from 'src/redux/hooks';
import {setShowAlert} from 'src/redux/slice/alertSlice';
import {modelProductApi} from './modelproduct';

export const useGetAllModelProduct = (filters: QueryParams) => {
  const res = useQuery(['listSanPhamModel', filters], () => modelProductApi.getAll(filters), {
    onError: () => console.log('lỗi get all kho sản phẩm'),
    select: data => {
      return data;
    },
  });
  return {data: res.data, isLoading: res.isLoading, isFetching: res.isFetching};
};

export const useGetOneModelProduct = (
  id: string | undefined,
  onSuccess?: (data: ModelProduct) => void
) => {
  const res = useQuery(['chiTietProduct', id], () => modelProductApi.getOne(id), {
    onSuccess: (data: any) => {
      onSuccess && onSuccess(data.data);
    },
    onError: () => console.log('lỗi get one kho sản phẩm'),
    enabled: !!id,
    select(data) {
      return data;
    },
  });
  return {data: res.data, isLoading: res.isLoading, isFetching: res.isFetching};
};

export const useCreateModelProduct = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation(modelProductApi.create, {
    onSuccess: () => {
      dispatch(setShowAlert({type: 'success', message: 'Tạo kho sản phẩm thành công'}));
      queryClient.invalidateQueries('listSanPhamModel');
      onSuccess && onSuccess();
    },
    onError: (error: any) => {
      dispatch(
        setShowAlert({
          type: 'error',
          message: error.Errors?.[0] || error.Message || 'Đã xảy ra lỗi',
        })
      );
    },
  });
};

export const useUpdateModelProduct = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation(modelProductApi.update, {
    onSuccess: () => {
      dispatch(setShowAlert({type: 'success', message: 'Cập nhật kho sản phẩm thành công'}));
      queryClient.invalidateQueries('listSanPhamModel');
      onSuccess && onSuccess();
    },
    onError: (error: any) => {
      dispatch(
        setShowAlert({
          type: 'error',
          message: error.Errors?.[0] || error.Message || 'Đã xảy ra lỗi',
        })
      );
    },
  });
};
export const useDeleteModelProduct = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation(modelProductApi.delete, {
    onSuccess: () => {
      dispatch(setShowAlert({type: 'success', message: 'Xóa kho sản phẩm thành công'}));
      queryClient.invalidateQueries('listSanPhamModel');
      onSuccess && onSuccess();
    },
    onError: (error: any) => {
      dispatch(
        setShowAlert({
          type: 'error',
          message: error.Errors?.[0] || error.Message || 'Đã xảy ra lỗi',
        })
      );
    },
  });
};
