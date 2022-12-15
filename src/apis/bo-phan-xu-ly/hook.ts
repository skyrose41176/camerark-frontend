import {useMutation, useQuery, useQueryClient} from 'react-query';
import {useAppDispatch} from 'src/redux/hooks';
import {setShowAlert} from 'src/redux/slice/alertSlice';
import {boPhanXuLyApi} from './bo-phan-xu-ly';

export const useGetAllBoPhanXuLyInPYC = (filters: {phieuYeuCauId: string | number}) => {
  const res = useQuery(['listBoPhanXuLyPyc', filters], () => boPhanXuLyApi.getAll(filters), {
    onError: () => console.log('lỗi get all bộ phận xử lý phiếu yêu cầu'),
    select: data => data.data,
  });

  return {data: res.data, isLoading: res.isLoading, isFetching: res.isFetching};
};

export const useCreateBoPhanXuLy = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation(boPhanXuLyApi.create, {
    onSuccess: () => {
      dispatch(setShowAlert({type: 'success', message: 'Thêm bộ phận thành công'}));
      queryClient.invalidateQueries(['listBoPhanNguoiXuLy']);
      queryClient.invalidateQueries(['chiTietPhieuYeuCau']);
      queryClient.invalidateQueries(['listBoPhanXuLyPyc']);
      queryClient.invalidateQueries(['listBoPhan']);
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
