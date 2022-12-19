import {useMutation, useQuery, useQueryClient} from 'react-query';
import {Product} from 'src/models';
import {QueryParams} from 'src/models/common';
import {useAppDispatch} from 'src/redux/hooks';
import {setShowAlert} from 'src/redux/slice/alertSlice';
import {productApi} from './product';

export const useGetAllProduct = (filters: QueryParams) => {
  const res = useQuery(['listSanPham', filters], () => productApi.getAll(filters), {
    onError: () => console.log('lỗi get all sản phẩm'),
    select: data => {
      return data;
    },
  });
  return {data: res.data, isLoading: res.isLoading, isFetching: res.isFetching};
};

export const useGetOneProduct = (id: string | undefined, onSuccess?: (data: Product) => void) => {
  const res = useQuery(['chiTietProduct', id], () => productApi.getOne(id), {
    onSuccess: (data: any) => {
      onSuccess && onSuccess(data.data);
    },
    onError: () => console.log('lỗi get one sản phẩm'),
    enabled: !!id,
    select(data) {
      return data;
    },
  });
  return {data: res.data, isLoading: res.isLoading, isFetching: res.isFetching};
};

export const useCreateProduct = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation(productApi.create, {
    onSuccess: () => {
      dispatch(setShowAlert({type: 'success', message: 'Tạo sản phẩm thành công'}));
      queryClient.invalidateQueries('listSanPham');
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

export const useUpdateProduct = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation(productApi.update, {
    onSuccess: () => {
      dispatch(setShowAlert({type: 'success', message: 'Cập nhật sản phẩm thành công'}));
      queryClient.invalidateQueries('listSanPham');
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
export const useDeleteProduct = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation(productApi.delete, {
    onSuccess: () => {
      dispatch(setShowAlert({type: 'success', message: 'Xóa sản phẩm thành công'}));
      queryClient.invalidateQueries('listSanPham');
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
