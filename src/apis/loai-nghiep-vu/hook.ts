import {useMutation, useQuery, useQueryClient} from 'react-query';
import {LoaiNghiepVu} from 'src/models';
import {QueryParams} from 'src/models/common';
import {useAppDispatch} from 'src/redux/hooks';
import {setShowAlert} from 'src/redux/slice/alertSlice';
import loaiNghiepVuApi from './loai-nghiep-vu';

export const useGetAllLoaiNghiepVu = (filters: QueryParams & {trangThai?: boolean}) => {
  const res = useQuery(['listLoaiNghiepVu', filters], () => loaiNghiepVuApi.getAll(filters), {
    onError: () => console.log('lỗi get all loại nghiệp vụ'),
  });
  return {data: res.data?.data, isLoading: res.isLoading, isFetching: res.isFetching};
};

export const useGetOneLoaiNghiepVu = (id?: number, onSuccess?: (data: LoaiNghiepVu) => void) => {
  const res = useQuery(['chiTietLoaiNghiepVu', id], () => loaiNghiepVuApi.getOne(Number(id)), {
    onSuccess: data => {
      onSuccess && onSuccess(data.data);
    },
    onError: () => console.log('lỗi get one loại nghiệp vụ'),
    enabled: !!id,
  });
  return {data: res.data?.data, isLoading: res.isLoading, isFetching: res.isFetching};
};

export const useCreateLoaiNghiepVu = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation(loaiNghiepVuApi.create, {
    onSuccess: () => {
      dispatch(setShowAlert({type: 'success', message: 'Tạo loại nghiệp vụ thành công'}));
      queryClient.invalidateQueries('listLoaiNghiepVu');
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

export const useUpdateLoaiNghiepVu = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation(loaiNghiepVuApi.update, {
    onSuccess: () => {
      dispatch(setShowAlert({type: 'success', message: 'Cập nhật loại nghiệp vụ thành công'}));
      queryClient.invalidateQueries('listLoaiNghiepVu');
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

export const useDeleteLoaiNghiepVu = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation(loaiNghiepVuApi.delete, {
    onSuccess: () => {
      dispatch(setShowAlert({type: 'success', message: 'Xóa loại nghiệp vụ thành công'}));
      queryClient.invalidateQueries('listLoaiNghiepVu');
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
