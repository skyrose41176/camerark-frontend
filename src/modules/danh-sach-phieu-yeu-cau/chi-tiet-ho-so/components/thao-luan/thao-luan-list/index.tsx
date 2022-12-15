// const {data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage} =
//     useGetAllThaoLuan(filters);
import {CircularProgress, Typography} from '@mui/material';
import {useState} from 'react';
import {useGetAllThaoLuan} from 'src/apis';
import {QueryParams} from 'src/models/common';
import SkeletonThaoLuan from './skeleton';
import ThaoLuanItem from './thao-luan-item';

export interface ThaoLuanListProps {
  phieuYeuCauId: number;
}

export default function ThaoLuanList({phieuYeuCauId}: ThaoLuanListProps) {
  const [filters, setFilters] = useState<QueryParams & {parentId?: number; phieuYeuCauId: number}>({
    pageNumber: 1,
    pageSize: 10,
    search: '',
    parentId: undefined,
    phieuYeuCauId,
  });
  const {data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage} =
    useGetAllThaoLuan(filters);
  const handleLoadMore = () => {
    fetchNextPage();
  };
  return (
    <div>
      {isLoading ? (
        <SkeletonThaoLuan />
      ) : (
        data?.pages
          ?.flatMap(i => i?.data?.data ?? [])
          .map(item => <ThaoLuanItem item={item} key={item.id} isChildren />)
      )}
      {hasNextPage && (
        <div
          className="hover:underline cursor-pointer flex self-start items-center"
          onClick={handleLoadMore}
        >
          <Typography variant="body2" className="text-[#65676B] text-xs font-bold">
            Xem thêm thảo luận
          </Typography>
          {isFetchingNextPage && <CircularProgress size={16} color="inherit" className="ml-2" />}
        </div>
      )}
    </div>
  );
}
