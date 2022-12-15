import {Avatar, CircularProgress, Collapse, Tooltip, Typography} from '@mui/material';
import {ArrowForward} from 'iconsax-react';
import moment from 'moment';
import {useState} from 'react';
import {QueryParams} from 'src/models/common';
import {capitalizeFirstLetter} from 'src/utils/format';
import ThaoLuanInput from '../../thao-luan-input';
import {useGetAllThaoLuan} from 'src/apis';
import {ThaoLuan} from 'src/models';
import {avatar} from 'src/utils';
import DinhKemItem from '../dinh-kem-item';
import {renderInfoUser} from 'src/utils/render';

export interface ThaoLuanItemProps {
  item: ThaoLuan;
  isChildren?: boolean;
}

export default function ThaoLuanItem({item, isChildren = false}: ThaoLuanItemProps) {
  const [isReply, setIsReply] = useState(false);
  const [isOpenChildren, setIsOpenChildren] = useState(false);
  const [isLoadChild, setIsLoadChild] = useState(false);
  const [filters, setFilters] = useState<QueryParams & {parentId?: number; phieuYeuCauId: number}>({
    pageNumber: 1,
    pageSize: 10,
    search: '',
    parentId: item.id,
    phieuYeuCauId: item.phieuYeuCauId,
  });

  const {data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage} = useGetAllThaoLuan(
    filters,
    {
      queryKey: `listThaoLuanChild${item.id}`,
      enabled: isLoadChild,
      onSuccess: (data: any) => {
        setIsReply(true);
        setIsOpenChildren(true);
      },
    }
  );

  const handleLoadChild = () => {
    if (data) {
      setIsReply(true);
      setIsOpenChildren(true);
    } else {
      setIsLoadChild(true);
    }
  };
  const handleReply = () => {
    setIsReply(true);
    handleLoadChild();
  };
  const handleCollapse = () => {
    setIsOpenChildren(false);
    setIsReply(false);
  };
  const handleLoadMore = () => {
    fetchNextPage();
  };
  return (
    <div className="flex flex-col flex-1 my-2 w-full">
      <div className="flex relative">
        {/* {item.parentId !== 0 && <div className="line-reply absolute"></div>} */}
        <div className="flex flex-col items-center">
          <Tooltip title={renderInfoUser(item?.nhanSu)} placement="left">
            <div
              onMouseEnter={() => {
                // mutationGetUser.mutate(item.createdBy);
              }}
            >
              <Avatar
                // onClick={() => navigate('/thong-tin-ca-nhan')}
                sx={{backgroundColor: avatar.getColor(item.nhanSu.ten), width: 30, height: 30}}
                className={`border-2 border-solid border-[#ececec] font-bold cursor-pointer text-xs`}
              >
                {avatar.generateName(item.nhanSu.ten)}
              </Avatar>
            </div>
          </Tooltip>

          {(item.soLuongPhanHoi !== 0 || isReply) && (
            <div />
            // <div className="w-[1px] bg-[#F0F2F5] h-full" />
          )}
        </div>
        <div className="ml-1 flex flex-col w-full">
          <div className="bg-[#f3f6f9] p-2 rounded-[6px] w-full">
            <div className="flex items-center">
              <Typography variant="subtitle2" component="div">
                {item.nhanSu.ten}
              </Typography>
              <Typography variant="caption">&nbsp;-&nbsp;{item.nhanSu.email}</Typography>
            </div>
            <Typography variant="body2">
              <pre style={{whiteSpace: 'pre-wrap'}}>{item.noiDung}</pre>
            </Typography>
          </div>
          <div className="flex items-center mt-1 px-2">
            {isChildren && (
              <div
                className="hover:underline cursor-pointer flex self-start items-center mr-2"
                onClick={handleReply}
              >
                <Tooltip title="Trả lời thảo luận này">
                  <Typography variant="body2" className="text-[#65676B] text-xs font-bold">
                    Phản hồi
                  </Typography>
                </Tooltip>
              </div>
            )}
            <Tooltip title={capitalizeFirstLetter(moment(item.created).format('LLLL'))}>
              <Typography variant="caption" className="cursor-pointer hover:underline leading-4">
                {moment(new Date(item.created ?? '').getTime())
                  .startOf('minute')
                  .fromNow()}
              </Typography>
            </Tooltip>
            {isLoadChild && isOpenChildren && (
              <div
                className="hover:underline cursor-pointer flex self-start items-center ml-2"
                onClick={handleCollapse}
              >
                <Typography variant="body2" className="text-primary text-xs font-bold">
                  Thu gọn
                </Typography>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex comment-item-child">
        <div className="flex flex-col items-center">
          {isOpenChildren ? (
            <div />
          ) : (
            // <div className="h-full w-[1px] bg-[#F0F2F5]" />
            item.soLuongPhanHoi !== 0 && (
              <div className="flex">
                <div className="h-3" />
                {item.dinhKemThaoLuans.length === 0 && (
                  <div className="h-3 border-0 rounded-bl-lg" />
                )}
              </div>
            )
          )}
        </div>
        <div className="flex flex-col w-full">
          <DinhKemItem
            data={item.dinhKemThaoLuans ?? []}
            showLine={
              (isOpenChildren && item.dinhKemThaoLuans.length > 0) ||
              (item.dinhKemThaoLuans.length > 0 && item.soLuongPhanHoi > 0)
            }
          />

          {isChildren && (
            <>
              {!isOpenChildren ? (
                <div className="flex relative">
                  <div className="flex absolute -left-[34px]">
                    <div className="h-3 w-[48%]" />
                    {((item.dinhKemThaoLuans.length > 0 && isOpenChildren) ||
                      (item.soLuongPhanHoi > 0 && item.dinhKemThaoLuans.length > 0)) && (
                      <div className="h-3 w-[52%] border-0 border-l-[2px] border-b-[2px] border-solid border-b-[#F0F2F5] border-l-[#F0F2F5] rounded-bl-lg" />
                    )}
                  </div>
                  {item.soLuongPhanHoi > 0 && (
                    <div
                      className="hover:underline cursor-pointer mt-0 flex items-center"
                      onClick={handleLoadChild}
                    >
                      <ArrowForward style={{transform: 'scaleY(-1)'}} color="#65676B" />
                      <Typography variant="subtitle1" className="text-[#65676B] text-sm">
                        {`${item.soLuongPhanHoi} phản hồi`}
                      </Typography>

                      {isLoading && <CircularProgress size={16} color="inherit" className="ml-2" />}
                    </div>
                  )}
                </div>
              ) : (
                data?.pages
                  ?.flatMap(i => i?.data?.data ?? [])
                  ?.map(thaoLuan => (
                    <ThaoLuanItem item={thaoLuan} key={thaoLuan.id} isChildren={false} />
                  ))
              )}

              {hasNextPage && (
                <div
                  className="hover:underline cursor-pointer flex self-start items-center"
                  onClick={handleLoadMore}
                >
                  <Typography variant="body2" className="text-[#65676B] text-xs font-bold">
                    Xem thêm thảo luận
                  </Typography>
                  {isFetchingNextPage && (
                    <CircularProgress size={16} color="inherit" className="ml-2" />
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className="flex relative comment-child">
        {/* {isReply && <div className="line-reply absolute"></div>} */}
        <Collapse in={isReply}>
          <ThaoLuanInput data={{parentId: item.id, phieuYeuCauId: item?.phieuYeuCauId}} />
          {isLoadChild && isOpenChildren && (
            <div
              className="hover:underline cursor-pointer flex self-start items-center"
              onClick={handleCollapse}
            >
              <Typography variant="body2" className="text-primary text-xs font-bold mt-2">
                Thu gọn
              </Typography>
            </div>
          )}
        </Collapse>
      </div>
    </div>
  );
}
