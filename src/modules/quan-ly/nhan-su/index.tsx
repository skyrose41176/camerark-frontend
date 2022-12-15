import {useState} from 'react';
import {ButtonBase, DataTable, LoadingSkeleton, NoData, SearchBar} from 'src/components/base';
import {ColumnTableProps} from 'src/components/types';
import {PageWrapper} from 'src/components/wrapper';
import Header from '../../../layouts/Header';
import './index.css';
import {QueryParams} from 'src/models/common';
import {Box, Checkbox, Stack} from '@mui/material';
import {useGetAllNhanSu, useSyncNhanSu, useUpdateRoleNhanSu} from 'src/apis/nhan-su';
import {NhanSu} from 'src/models';

const DanhSachNhanSu = () => {
  const [filters, setFilters] = useState<QueryParams>({
    pageNumber: 1,
    pageSize: 10,
    search: '',
  });

  const mutationUpdate = useUpdateRoleNhanSu();

  const mutationSync = useSyncNhanSu();

  const columns: ColumnTableProps[] = [
    {
      field: 'stt',
      headerName: 'STT',
      type: 'text',
      width: 100,
      center: true,
      renderCell: (row, index) =>
        (Number(filters?.pageNumber) - 1) * Number(filters?.pageSize) + (index + 1),
    },
    {field: 'maNs', headerName: 'Mã nhân sự', type: 'text', width: '10%'},
    {field: 'ten', headerName: 'Họ và tên', type: 'text', width: '15%'},
    {field: 'email', headerName: 'Email', type: 'text'},
    {field: 'chucVu', headerName: 'Chức vụ', type: 'text'},
    {field: 'donVi', headerName: 'Đơn vị', type: 'text', width: '20%'},
    {field: 'sdt', headerName: 'Số điện thoại', type: 'text', width: 150},
    {
      field: 'role',
      headerName: 'Role admin',
      type: 'text',
      center: true,
      width: 100,
      renderCell: (row: NhanSu) => (
        <Checkbox
          onClick={e => {
            e.stopPropagation();
          }}
          checked={row?.role === 1 ? true : false}
          defaultChecked={false}
          onChange={e => mutationUpdate.mutate({id: row?.id})}
        />
      ),
    },
  ];
  const {data, isLoading, isFetching} = useGetAllNhanSu(filters);

  const handleSyncNhanSu = async () => {
    await mutationSync.mutateAsync();
  };
  return (
    <div>
      <Header title="Danh sách nhân sự" />
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
              color="primary"
              variant="outlined"
              label="Đồng bộ"
              onClick={handleSyncNhanSu}
              loading={mutationSync.isLoading}
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
              // onSortChange={({column, order}) => {
              //   setFilters(prev => ({...prev, sort: column + '_' + order}));
              // }}
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
      </PageWrapper>
    </div>
  );
};

// export default DanhSachPhieuYeuCau;
export default DanhSachNhanSu;
