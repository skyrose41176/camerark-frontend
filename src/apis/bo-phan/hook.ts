import {useMutation, useQuery, useQueryClient} from 'react-query';
import {BoPhan} from 'src/models';
import {QueryParams} from 'src/models/common';
import {useAppDispatch} from 'src/redux/hooks';
import {setShowAlert} from 'src/redux/slice/alertSlice';
import {boPhanApi} from './bo-phan';

export const useGetAllBoPhan = (
  filters: QueryParams & {phieuYeuCauId?: number | string; trangThai?: boolean}
) => {
  const res = useQuery(['listBoPhan', filters], () => boPhanApi.getAll(filters), {
    onError: () => console.log('lỗi get all bộ phận'),
  });
  return {data: res.data?.data, isLoading: res.isLoading, isFetching: res.isFetching};
};

export const useGetOneBoPhan = (id?: number, onSuccess?: (data: BoPhan) => void) => {
  const res = useQuery(['chiTietBoPhan', id], () => boPhanApi.getOne(Number(id)), {
    onSuccess: (data: any) => {
      onSuccess && onSuccess(data.data);
    },
    onError: () => console.log('lỗi get one bộ phận'),
    enabled: !!id,
  });
  return {data: res.data?.data, isLoading: res.isLoading, isFetching: res.isFetching};
};

export const useCreateBoPhan = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation(boPhanApi.create, {
    onSuccess: () => {
      dispatch(setShowAlert({type: 'success', message: 'Tạo bộ phận thành công'}));
      queryClient.invalidateQueries('listBoPhan');
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

export const useUpdateBoPhan = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation(boPhanApi.update, {
    onSuccess: () => {
      dispatch(setShowAlert({type: 'success', message: 'Cập nhật bộ phận thành công'}));
      queryClient.invalidateQueries('listBoPhan');
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

export const useUpdateChooseCntt = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation(boPhanApi.chooseCntt, {
    onSuccess: () => {
      dispatch(setShowAlert({type: 'success', message: 'Cập nhật bộ phận thành công'}));
      queryClient.invalidateQueries('listBoPhan');
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

export const useDeleteBoPhan = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation(boPhanApi.delete, {
    onSuccess: () => {
      dispatch(setShowAlert({type: 'success', message: 'Xóa bộ phận thành công'}));
      queryClient.invalidateQueries('listBoPhan');
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
