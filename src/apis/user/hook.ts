import {useMutation, useQuery, useQueryClient} from 'react-query';
import {User} from 'src/models';
import {QueryParams} from 'src/models/common';
import {useAppDispatch} from 'src/redux/hooks';
import {setShowAlert} from 'src/redux/slice/alertSlice';
import {userApi} from './user';

export const useGetAllUser = (filters: QueryParams) => {
  const res = useQuery(['listNguoiDung', filters], () => userApi.getAll(filters), {
    onError: () => console.log('lỗi get all người dùng'),
    select: data => {
      return data;
    },
  });
  return {data: res.data, isLoading: res.isLoading, isFetching: res.isFetching};
};

export const useGetOneUser = (id: string | undefined, onSuccess?: (data: User) => void) => {
  const res = useQuery(['chiTietUser', id], () => userApi.getOne(id), {
    onSuccess: (data: any) => {
      onSuccess && onSuccess(data.data);
    },
    onError: () => console.log('lỗi get one người dùng'),
    enabled: !!id,
    select(data) {
      return data;
    },
  });
  return {data: res.data, isLoading: res.isLoading, isFetching: res.isFetching};
};

export const useCreateUser = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation(userApi.create, {
    onSuccess: () => {
      dispatch(setShowAlert({type: 'success', message: 'Tạo người dùng thành công'}));
      queryClient.invalidateQueries('listNguoiDung');
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

export const useUpdateUser = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation(userApi.update, {
    onSuccess: () => {
      dispatch(setShowAlert({type: 'success', message: 'Cập nhật người dùng thành công'}));
      queryClient.invalidateQueries('listNguoiDung');
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
export const useDeleteUser = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation(userApi.delete, {
    onSuccess: () => {
      dispatch(setShowAlert({type: 'success', message: 'Xóa người dùng thành công'}));
      queryClient.invalidateQueries('listNguoiDung');
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
