import {useInfiniteQuery, useMutation, useQuery, useQueryClient} from 'react-query';
import {QueryParams} from 'src/models/common';
import {useAppDispatch} from 'src/redux/hooks';
import {setShowAlert} from 'src/redux/slice/alertSlice';
import {thaoLuanApi} from './thao-luan';

export const useGetAllThaoLuan = (
  filters: QueryParams & {phieuYeuCauId: number | string; parentId?: number | string},
  option?: {
    queryKey?: string;
    enabled?: boolean;
    [key: string]: any;
  }
) => {
  const res = useInfiniteQuery(
    [option?.queryKey ?? 'listThaoLuan', filters],
    ({pageParam = 1}) => thaoLuanApi.getAll({...filters, pageNumber: pageParam}),
    {
      getNextPageParam: (lastPage, page) => {
        if (lastPage.data && lastPage.data.hasNext) {
          return page.length + 1;
        }
      },
      enabled: option?.enabled === undefined ? true : !!option?.enabled,
      ...option,
      onError: () => console.log('lỗi get all thảo luận'),
    }
  );
  return {
    data: res.data,
    isLoading: res.isLoading,
    isFetching: res.isFetching,
    fetchNextPage: res.fetchNextPage,
    isFetchingNextPage: res.isFetchingNextPage,
    hasNextPage: res.hasNextPage,
  };
};

export const useCreateThaoLuan = (parentId: number, onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation(thaoLuanApi.create, {
    onSuccess: () => {
      dispatch(setShowAlert({type: 'success', message: 'Thêm thảo luận thành công'}));
      queryClient.invalidateQueries('listThaoLuan');
      queryClient.invalidateQueries('listDinhKemThaoLuan');
      if (parentId !== 0) queryClient.invalidateQueries(`listThaoLuanChild${parentId}`);
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

export const useGetAllDinhKemThaoLuan = (phieuYeuCauId: string | number) => {
  const res = useQuery(
    ['listDinhKemThaoLuan', phieuYeuCauId],
    () => thaoLuanApi.getAllDinhKemThaoLuan(phieuYeuCauId),
    {
      onError: () => console.log('lỗi get all đính kèm thảo luận'),
      enabled: !!phieuYeuCauId,
      select: data => {
        return data.data;
      },
    }
  );
  return {data: res.data, isLoading: res.isLoading, isFetching: res.isFetching};
};
