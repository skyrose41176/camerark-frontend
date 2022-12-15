import {useMutation, useQuery, useQueryClient} from 'react-query';
import {Transaction} from 'src/models';
import {QueryParams} from 'src/models/common';
import {useAppDispatch} from 'src/redux/hooks';
import {setShowAlert} from 'src/redux/slice/alertSlice';
import {transactionApi} from './transaction';

export const useGetAllTransaction = (filters: QueryParams) => {
  const res = useQuery(['listGiaoDich', filters], () => transactionApi.getAll(filters), {
    onError: () => console.log('lỗi get all giao dịch'),
    select: data => {
      return data.data;
    },
  });
  return {data: res.data, isLoading: res.isLoading, isFetching: res.isFetching};
};

export const useGetOneTransaction = (id: string, onSuccess?: (data: Transaction) => void) => {
  const res = useQuery(['chiTietTransaction', id], () => transactionApi.getOne(id), {
    onSuccess: (data: any) => {
      onSuccess && onSuccess(data.data);
    },
    onError: () => console.log('lỗi get one giao dịch'),
    enabled: !!id,
    select(data) {
      return data.data;
    },
  });
  return {data: res.data, isLoading: res.isLoading, isFetching: res.isFetching};
};

export const useCreateTransaction = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation(transactionApi.create, {
    onSuccess: () => {
      dispatch(setShowAlert({type: 'success', message: 'Tạo giao dịch thành công'}));
      queryClient.invalidateQueries('listGiaoDich');
      queryClient.invalidateQueries('countTransaction');
      queryClient.invalidateQueries('countHopThu');
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

export const useUpdateTransaction = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation(transactionApi.update, {
    onSuccess: () => {
      dispatch(setShowAlert({type: 'success', message: 'Cập nhật giao dịch thành công'}));
      queryClient.invalidateQueries('chiTietTransaction');
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
export const useDeleteTransaction = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation(transactionApi.delete, {
    onSuccess: () => {
      dispatch(setShowAlert({type: 'success', message: 'Xóa giao dịch thành công'}));
      queryClient.invalidateQueries('listGiaoDich');
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
