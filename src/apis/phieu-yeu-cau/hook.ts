import {useMutation, useQuery, useQueryClient} from 'react-query';
import {CountPyc, PhieuYeuCau} from 'src/models';
import {QueryParams} from 'src/models/common';
import {useAppDispatch} from 'src/redux/hooks';
import {setShowAlert} from 'src/redux/slice/alertSlice';
import {phieuYeuCauApi} from './phieu-yeu-cau';

export const useGetAllPhieuYeuCau = (filters: QueryParams) => {
  const res = useQuery(['listPhieuYeuCau', filters], () => phieuYeuCauApi.getAll(filters), {
    onError: () => console.log('lỗi get all phiếu yêu cầu'),
    select: data => {
      return data.data;
    },
  });
  return {data: res.data, isLoading: res.isLoading, isFetching: res.isFetching};
};

export const useSearchPhieuYeuCau = (
  filters: QueryParams & {
    maYc?: string;
    loaiYeuCauId?: number;
    loaiNghiepVuId?: number;
    created?: string;
    createdBy?: string;
    nguoiXuLy?: string;
  }
) => {
  const res = useQuery(['searchPhieuYeuCau', filters], () => phieuYeuCauApi.search(filters), {
    onError: () => console.log('lỗi search phiếu yêu cầu'),
    select: data => {
      return data.data;
    },
    enabled: !!filters?.begin,
  });
  return {data: res.data, isLoading: res.isLoading, isFetching: res.isFetching};
};

export const useGetOnePhieuYeuCau = (id: number, onSuccess?: (data: PhieuYeuCau) => void) => {
  const res = useQuery(['chiTietPhieuYeuCau', id], () => phieuYeuCauApi.getOne(Number(id)), {
    onSuccess: (data: any) => {
      onSuccess && onSuccess(data.data);
    },
    onError: () => console.log('lỗi get one phiếu yêu cầu'),
    enabled: !!id,
    select(data) {
      return data.data;
    },
  });
  return {data: res.data, isLoading: res.isLoading, isFetching: res.isFetching};
};

export const useCountPhieuYeuCau = (onSuccess?: (data: CountPyc) => void) => {
  const res = useQuery(['countPhieuYeuCau'], () => phieuYeuCauApi.count(), {
    onSuccess: (data: any) => {
      onSuccess && onSuccess(data);
    },
    onError: () => console.log('lỗi count phiếu yêu cầu'),
    select(data) {
      return data.data;
    },
  });
  return {data: res.data, isLoading: res.isLoading, isFetching: res.isFetching};
};
export const useCountHopThu = (filter: {screen: string}, onSuccess?: (data: CountPyc) => void) => {
  const res = useQuery(['countHopThu'], () => phieuYeuCauApi.countHopThu(filter), {
    onSuccess: (data: any) => {
      onSuccess && onSuccess(data);
    },
    onError: () => console.log('lỗi count hộp thư phiếu yêu cầu'),
    select(data) {
      return data.data;
    },
  });
  return {data: res.data, isLoading: res.isLoading, isFetching: res.isFetching};
};

export const useCreatePhieuYeuCau = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation(phieuYeuCauApi.create, {
    onSuccess: () => {
      dispatch(setShowAlert({type: 'success', message: 'Tạo phiếu yêu cầu thành công'}));
      queryClient.invalidateQueries('listPhieuYeuCau');
      queryClient.invalidateQueries('countPhieuYeuCau');
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

export const useUpdatePhieuYeuCau = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation(phieuYeuCauApi.update, {
    onSuccess: () => {
      dispatch(setShowAlert({type: 'success', message: 'Cập nhật phiếu yêu cầu thành công'}));
      queryClient.invalidateQueries('chiTietPhieuYeuCau');
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
export const useUpdateStatusPhieuYeuCau = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation(phieuYeuCauApi.updateStatus, {
    onSuccess: () => {
      dispatch(setShowAlert({type: 'success', message: 'Cập nhật phiếu yêu cầu thành công'}));
      queryClient.invalidateQueries(['listBoPhanNguoiXuLy']);
      queryClient.invalidateQueries(['listBoPhanXuLyPyc']);
      queryClient.invalidateQueries(['chiTietPhieuYeuCau']);
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

export const useDongPhieuYeuCau = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation(phieuYeuCauApi.dongPyc, {
    onSuccess: () => {
      dispatch(setShowAlert({type: 'success', message: 'Đóng phiếu yêu cầu thành công'}));
      queryClient.invalidateQueries(['chiTietPhieuYeuCau']);
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

export const useDeletePhieuYeuCau = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation(phieuYeuCauApi.delete, {
    onSuccess: () => {
      dispatch(setShowAlert({type: 'success', message: 'Xóa phiếu yêu cầu thành công'}));
      queryClient.invalidateQueries('listPhieuYeuCau');
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
