import {useMutation, useQuery, useQueryClient} from 'react-query';
import {NhanSu} from 'src/models';
import {QueryParams} from 'src/models/common';
import {useAppDispatch} from 'src/redux/hooks';
import {setShowAlert} from 'src/redux/slice/alertSlice';
import nhanSuApi from './nhan-su';

export const useGetAllNhanSu = (filters: QueryParams & {phieuYeuCauId?: string | number}) => {
  const res = useQuery(['listNhanSu', filters], () => nhanSuApi.getAll(filters), {
    onError: () => console.log('lỗi get all nhân sự'),
  });
  return {data: res.data?.data, isLoading: res.isLoading, isFetching: res.isFetching};
};

export const useGetAllNhanSuBoPhan = (filters: QueryParams) => {
  const res = useQuery(['listNhanSuBoPhan', filters], () => nhanSuApi.getAllNhanSuBoPhan(filters), {
    onError: () => console.log('lỗi get all nhân sự bộ phận'),
  });
  return {data: res.data?.data, isLoading: res.isLoading, isFetching: res.isFetching};
};

export const useGetOneNhanSu = (id: number | string, onSuccess?: (data: NhanSu) => void) => {
  const res = useQuery(['chiTietNhanSu', id], () => nhanSuApi.getOne(id), {
    onSuccess: (data: NhanSu) => {
      onSuccess && onSuccess(data);
    },
    onError: () => console.log('lỗi get one nhân sự'),
    enabled: !!id,
    select: data => {
      return data.data;
    },
  });
  return {data: res.data, isLoading: res.isLoading, isFetching: res.isFetching};
};

export const useUpdateNhanSu = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation(nhanSuApi.update, {
    onSuccess: () => {
      dispatch(setShowAlert({type: 'success', message: 'Cập nhật nhân sự thành công'}));
      queryClient.invalidateQueries('chiTietNhanSu');
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

export const useUpdateRoleNhanSu = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation(nhanSuApi.updateRole, {
    onSuccess: () => {
      dispatch(setShowAlert({type: 'success', message: 'Cập nhật Role nhân sự thành công'}));
      queryClient.invalidateQueries('listNhanSu');
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

export const useSyncNhanSu = () => {
  return useMutation(nhanSuApi.sync, {
    onError: () => console.log('lỗi đồng bộ nhân sự'),
  });
};
