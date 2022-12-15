import {useMutation, useQuery, useQueryClient} from 'react-query';
import {LoaiYeuCau} from 'src/models';
import {QueryParams} from 'src/models/common';
import {useAppDispatch} from 'src/redux/hooks';
import {setShowAlert} from 'src/redux/slice/alertSlice';
import loaiYeuCauApi from './loai-yeu-cau';

export const useGetAllLoaiYeuCau = (
  filters: QueryParams & {loaiNghiepVuId?: number; trangThai?: boolean}
) => {
  const res = useQuery(['listLoaiYeuCau', filters], () => loaiYeuCauApi.getAll(filters), {
    onError: () => console.log('lỗi get all loại yêu cầu'),
  });
  return {data: res.data?.data, isLoading: res.isLoading, isFetching: res.isFetching};
};

export const useGetOneLoaiYeuCau = (id?: number, onSuccess?: (data: LoaiYeuCau) => void) => {
  const res = useQuery(['chiTietLoaiYeuCau', id], () => loaiYeuCauApi.getOne(Number(id)), {
    onSuccess: data => {
      onSuccess && onSuccess(data.data);
    },
    onError: () => console.log('lỗi get one loại yêu cầu'),
    enabled: !!id,
  });
  return {data: res.data?.data, isLoading: res.isLoading, isFetching: res.isFetching};
};

export const useCreateLoaiYeuCau = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation(loaiYeuCauApi.create, {
    onSuccess: () => {
      dispatch(setShowAlert({type: 'success', message: 'Tạo loại yêu cầu thành công'}));
      queryClient.invalidateQueries('listLoaiYeuCau');
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

export const useUpdateLoaiYeuCau = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation(loaiYeuCauApi.update, {
    onSuccess: () => {
      dispatch(setShowAlert({type: 'success', message: 'Cập nhật loại yêu cầu thành công'}));
      queryClient.invalidateQueries('listLoaiYeuCau');
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

export const useDeleteLoaiYeuCau = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation(loaiYeuCauApi.delete, {
    onSuccess: () => {
      dispatch(setShowAlert({type: 'success', message: 'Xóa loại yêu cầu thành công'}));
      queryClient.invalidateQueries('listLoaiYeuCau');
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
