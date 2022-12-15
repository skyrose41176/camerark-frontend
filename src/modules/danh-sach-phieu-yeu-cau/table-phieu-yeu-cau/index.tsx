import {useContext, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useDeletePhieuYeuCau, useGetAllPhieuYeuCau} from 'src/apis';
import {DataTable, DialogConfirm, LoadingSkeleton, NoData} from 'src/components/base';
import {ColumnTableProps} from 'src/components/types';
import {PathParams, QueryParams} from 'src/models/common';
import {colors} from 'src/theme';
import {formatDatetimeDDMMYYYY} from 'src/utils/format';
import {PhieuYeuCauContext} from '..';
import {PhieuYeuCau} from 'src/models';

const TablePhieuYeuCau = () => {
  const {screen = 'tat-ca', subScreen = ''} = useParams<PathParams>();
  const navigate = useNavigate();
  const search = useContext(PhieuYeuCauContext);
  const [filters, setFilters] = useState<QueryParams & {screen: string; subScreen?: string}>({
    pageNumber: 1,
    pageSize: 10,
    search: '',
    screen: screen,
    subScreen: subScreen,
  });

  const {data, isLoading, isFetching} = useGetAllPhieuYeuCau({...filters, search});
  const [showDialog, setShowDialog] = useState<{open: boolean; data?: PhieuYeuCau | null}>({
    open: false,
    data: null,
  });

  const mutationDelete = useDeletePhieuYeuCau();

  const columns: ColumnTableProps[] = [
    {
      field: 'stt',
      headerName: 'STT',
      type: 'text',
      width: '50px',
      renderCell: (row, index) =>
        (Number(filters?.pageNumber) - 1) * Number(filters?.pageSize) + (index + 1),
    },
    {field: 'id', headerName: 'Mã yêu cầu', type: 'text', width: '100px', isSortable: true},
    {
      field: 'loaiYeuCau',
      headerName: 'Loại yêu cầu',
      type: 'text',
      width: '200px',
      isSortable: true,
    },
    {
      field: 'created',
      headerName: 'Ngày tạo',
      type: 'text',
      width: '100px',
      isSortable: true,
      renderCell: row => formatDatetimeDDMMYYYY(row?.created),
    },
    {
      field: 'tenDonVi',
      headerName: 'Tên đơn vị',
      type: 'text',
      width: '160px',
      isSortable: true,
    },
    {
      field: 'nhanSuCreate.ten',
      headerName: 'Người tạo',
      type: 'text',
      center: true,
      width: '140px',
    },
    {
      field: 'nhanSuTdv.ten',
      headerName: 'Trưởng đơn vị',
      type: 'text',
      width: '200px',
      center: true,
    },
    {
      field: 'trangThaiPhu',
      headerName: 'Trạng thái',
      type: 'text',
      width: '140px',
      center: true,
      isSortable: true,
      renderCell: row =>
        row?.trangThaiPhu === 0 ? (
          <p style={{color: colors.success}}>Open</p>
        ) : (
          <p style={{color: colors.error}}>Closed</p>
        ),
    },
    // {
    //   field: 'delete',
    //   headerName: '',
    //   type: 'text',
    //   width: '50px',
    //   center: true,
    //   renderCell: (row: PhieuYeuCau) => {
    //     if (
    //       row?.trangThaiChinh === TrangThaiChinh.TIEP_NHAN &&
    //       row?.trangThaiPhu === TrangThaiPhu.OPEN &&
    //       row?.createdById === Number(infoUser.Id)
    //     )
    //       return (
    //         <Box className="flex flex-row justify-around">
    //           <IconButtonBase
    //             iconName={Trash}
    //             color="error"
    //             rounded
    //             onClick={e => {
    //               e.stopPropagation();
    //               setShowDialog({open: true, data: row});
    //             }}
    //           />
    //         </Box>
    //       );
    //   },
    // },
  ];

  return (
    <>
      {isLoading ? (
        <LoadingSkeleton.Table numberOfColumns={3} numberOfRows={5} widths={[150, 'auto', 130]} />
      ) : [data?.data].length > 0 ? (
        <>
          <DataTable
            columns={columns}
            rows={data?.data || []}
            loading={isFetching}
            onRowClick={(row: any) => navigate(`/chi-tiet-ho-so/${row.id}`)}
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
          {showDialog.open && (
            <DialogConfirm
              open={showDialog.open}
              onClose={() => setShowDialog({open: false, data: null})}
              title="Thông báo"
              content={`Bạn có chắc chắn muốn xóa phiếu yêu cầu số ${showDialog?.data?.id}?`}
              onAgree={() => {
                mutationDelete.mutate(showDialog?.data?.id ?? 0);
                setShowDialog({open: false, data: null});
              }}
            />
          )}
        </>
      ) : (
        <NoData />
      )}
    </>
  );
};

export default TablePhieuYeuCau;
