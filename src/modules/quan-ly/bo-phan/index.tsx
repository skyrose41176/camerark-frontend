import {useState} from 'react';
import {
  ButtonBase,
  DataTable,
  DialogConfirm,
  IconButtonBase,
  LoadingSkeleton,
  NoData,
  SearchBar,
} from 'src/components/base';
import {ColumnTableProps} from 'src/components/types';
import {PageWrapper} from 'src/components/wrapper';
import Header from 'src/layouts/Header';
import '../nhan-su/index.css';
import {QueryParams} from 'src/models/common';
import {Box, Stack, Tooltip} from '@mui/material';
import {CloseCircle, Edit, TagUser, TickCircle, UserRemove} from 'iconsax-react';
import {BoPhan} from 'src/models';
import DialogFormBoPhan from './dialog';
import {useDeleteBoPhan, useGetAllBoPhan, useUpdateChooseCntt} from 'src/apis';
import {colors} from 'src/theme';

const DanhSachBoPhan = () => {
  const [filters, setFilters] = useState<QueryParams>({
    pageNumber: 1,
    pageSize: 10,
    search: '',
  });

  const [showDialog, setShowDialog] = useState<{open: boolean; id?: number}>({
    open: false,
    id: undefined,
  });
  const [showConfirm, setShowConfirm] = useState<{open: boolean; data: BoPhan | null}>({
    open: false,
    data: null,
  });
  const columns: ColumnTableProps[] = [
    {
      field: 'stt',
      headerName: 'STT',
      type: 'text',
      width: 50,
      center: true,
      renderCell: (row, index) =>
        (Number(filters?.pageNumber) - 1) * Number(filters?.pageSize) + (index + 1),
    },
    {field: 'ten', headerName: 'Tên bộ phận', type: 'text', isSortable: true},
    {field: 'groupMail', headerName: 'Nhóm mail', type: 'text', isSortable: true},
    {
      field: 'nhanSuBoPhans',
      headerName: 'Nhân sự thuộc bộ phận',
      type: 'text',
      center: true,
      // width: '250px',
      renderCell: (row: BoPhan) =>
        // <AvatarGroup sx={{justifyContent: 'center', flexWrap: 'wrap'}} max={100}>
        //   {row?.nhanSuBoPhans?.map(item => (
        //     <Tooltip title={renderInfoUser(item?.nhanSu)}>
        //       <Badge overlap="circular" anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
        //         <Avatar
        //           alt={item?.nhanSu?.ten}
        //           style={{
        //             backgroundColor: avatar.getColor(item?.nhanSu?.ten),
        //           }}
        //           className="w-8 h-8 text-sm border-2 border-solid border-[#ececec]"
        //         >
        //           {avatar.generateName(item?.nhanSu?.ten)}
        //         </Avatar>
        //       </Badge>
        //     </Tooltip>
        //   ))}
        // </AvatarGroup>

        row?.nhanSuBoPhans?.map(item => <p>{item?.nhanSu?.ten}</p>),
    },
    {
      field: 'trangThai',
      headerName: 'Active',
      type: 'text',
      center: true,
      isSortable: true,
      renderCell: row =>
        row?.trangThai ? (
          <Tooltip title="Hoạt động">
            <TickCircle color={colors.success} />
          </Tooltip>
        ) : (
          <Tooltip title="Ngừng hoạt động">
            <CloseCircle color={colors.error} />
          </Tooltip>
        ),
    },
    {
      field: 'thaoTac',
      headerName: 'Thao tác',
      type: 'text',
      width: '100px',
      center: true,
      renderCell: row => {
        return (
          <Box className="flex flex-row justify-around">
            <IconButtonBase
              disabled={!row?.trangThai}
              iconName={Edit}
              color="primary"
              rounded
              onClick={() => setShowDialog({open: true, id: row?.id})}
            />
            {/* <IconButtonBase
              iconName={Trash}
              color="error"
              rounded
              onClick={() => setShowConfirm({open: true, data: row})}
            /> */}
            <IconButtonBase
              disabled={!row?.trangThai}
              iconName={row?.isCntt ? UserRemove : TagUser}
              color={row?.isCntt ? 'error' : 'warning'}
              tooltip={row?.isCntt ? 'Bỏ chọn bộ phận điều phối' : 'Chọn bộ phận điều phối'}
              rounded
              onClick={() => mutationUpdate.mutate({id: row?.id})}
            />
          </Box>
        );
      },
    },
  ];
  const {data, isLoading, isFetching} = useGetAllBoPhan(filters);

  const mutationUpdate = useUpdateChooseCntt();

  const mutationDelete = useDeleteBoPhan();

  return (
    <div>
      <Header title="Danh sách bộ phận" />
      <PageWrapper>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <SearchBar
            placeholder="Vui lòng nhập thông tin cần tìm"
            onSubmit={value => {
              setFilters(prev => ({...prev, search: value}));
            }}
          />
          <Box width="fit-content" height="100%" className="txtUppercase">
            <ButtonBase
              color="success"
              variant="outlined"
              label="Thêm mới bộ phận"
              onClick={() => setShowDialog({open: true, id: undefined})}
            />
          </Box>
        </Stack>
        <div className="mt-2">
          <div className="m-2" />
          {isLoading ? (
            <LoadingSkeleton.Table
              numberOfColumns={3}
              numberOfRows={5}
              widths={[150, 'auto', 130]}
            />
          ) : [data?.data].length > 0 ? (
            <DataTable
              columns={columns}
              rows={data?.data || []}
              loading={isFetching}
              // onRowClick={(row: any) => navigate(`/tai-san/chi-tiet-tai-san/${loaiTaiSan}/${row.id}`)}
              onSortChange={({column, order}) => {
                setFilters(prev => ({...prev, orderBy: column + ' ' + order}));
              }}
              fixedColumn
              pagination={{
                show: true,
                page: (data?.currentPage ?? 1) - 1,
                totalCount: data?.totalCount ?? 0,
                rowsPerPage: data?.pageSize ?? 5,
                onPageChange: page => {
                  setFilters(prev => ({...prev, pageNumber: page + 1}));
                },
                onRowsPerPageChange: value => {
                  setFilters(prev => ({...prev, pageSize: value, pageNumber: 1}));
                },
              }}
            />
          ) : (
            <NoData />
          )}
          {showConfirm.open && (
            <DialogConfirm
              open={showConfirm.open}
              onClose={() => setShowConfirm({open: false, data: null})}
              title="Thông báo"
              content={`Bạn có chắc chắn muốn xóa bộ phận ${showConfirm?.data?.ten}?`}
              onAgree={() => {
                mutationDelete.mutate(showConfirm?.data?.id ?? 0);
                setShowConfirm({open: false, data: null});
              }}
            />
          )}
          {showDialog.open && (
            <DialogFormBoPhan
              open={showDialog.open}
              onClose={() => setShowDialog(prev => ({id: undefined, open: false}))}
              id={showDialog.id}
            />
          )}
        </div>
      </PageWrapper>
    </div>
  );
};

// export default DanhSachPhieuYeuCau;
export default DanhSachBoPhan;
