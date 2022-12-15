import {useMutation, useQuery, useQueryClient} from 'react-query';
import {useAppDispatch} from '../../redux/hooks';
import {setShowAlert} from '../../redux/slice/alertSlice';
import {nguoiXuLyApi} from './nguoi-xu-ly';

export const useGetByPhieuYeuCauId = (phieuYeuCauId: number) => {
  const res = useQuery(
    ['listBoPhanNguoiXuLy', phieuYeuCauId],
    () => nguoiXuLyApi.getByPhieuYeuCauId(Number(phieuYeuCauId)),
    {
      onError: () => console.log('lỗi get all bộ phận người xử lý'),
      select: data => data.data,
    }
  );
  return {data: res.data, isLoading: res.isLoading, isFetching: res.isFetching};
};

export const useCreateNguoiXuLy = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation(nguoiXuLyApi.create, {
    onSuccess: () => {
      dispatch(setShowAlert({type: 'success', message: 'Thêm người xử lý thành công'}));
      queryClient.invalidateQueries('listBoPhanNguoiXuLy');
      queryClient.invalidateQueries(['chiTietPhieuYeuCau']);
      queryClient.invalidateQueries(['listBoPhanXuLyPyc']);
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
