import {Box, Stack, Tooltip} from '@mui/material';
import {CloseCircle, Edit, TickCircle} from 'iconsax-react';
import {useState} from 'react';
import {useDeleteLoaiNghiepVu, useGetAllLoaiNghiepVu} from 'src/apis';
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
import {LoaiNghiepVu} from 'src/models';
import {QueryParams} from 'src/models/common';
import {colors} from 'src/theme';
import DialogFormLoaiNghiepVu from './dialog';

const LoaiNghiepVuPage = () => {
  const [filters, setFilters] = useState<QueryParams>({
    pageNumber: 1,
    pageSize: 10,
    search: '',
  });

  const [showDialog, setShowDialog] = useState<{open: boolean; id?: number}>({
    open: false,
    id: undefined,
  });
  const [showConfirm, setShowConfirm] = useState<{open: boolean; data: LoaiNghiepVu | null}>({
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
    {field: 'ten', headerName: 'Tên loại nghiệp vụ', type: 'text', isSortable: true},
    {
      field: 'trangThai',
      headerName: 'Active',
      type: 'text',
      isSortable: true,
      center: true,
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
          </Box>
        );
      },
    },
  ];

  const {data, isLoading, isFetching} = useGetAllLoaiNghiepVu(filters);

  const mutationDelete = useDeleteLoaiNghiepVu();

  const handleCloseDialog = () => {
    setShowDialog(prev => ({id: undefined, open: false}));
  };

  const handleConfirmDelete = () => {
    mutationDelete.mutate(showConfirm?.data?.id as number);
  };

  return (
    <div>
      <Header title="Danh sách loại nghiệp vụ" />
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
              label="Thêm loại nghiệp vụ"
              onClick={() => setShowDialog({open: true, id: undefined})}
            />
          </Box>
        </Stack>
        <Box className="mt-2" />
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
        </div>
        {showConfirm.open && (
          <DialogConfirm
            open={showConfirm.open}
            onClose={() => setShowConfirm({open: false, data: null})}
            title="Thông báo"
            content={`Bạn có chắc chắn muốn xóa loại nghiệp vụ ${showConfirm?.data?.ten}?`}
            onAgree={handleConfirmDelete}
          />
        )}
        {showDialog.open && (
          <DialogFormLoaiNghiepVu
            open={showDialog.open}
            onClose={handleCloseDialog}
            id={showDialog.id}
          />
        )}
      </PageWrapper>
    </div>
  );
};
export default LoaiNghiepVuPage;
