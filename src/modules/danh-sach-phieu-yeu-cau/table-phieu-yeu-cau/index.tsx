import {useContext, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useDeleteProduct, useGetAllProduct} from 'src/apis';
import {
  DataTable,
  DialogConfirm,
  IconButtonBase,
  LoadingSkeleton,
  NoData,
} from 'src/components/base';
import {ColumnTableProps} from 'src/components/types';
import {PathParams, QueryParams} from 'src/models/common';
import {colors} from 'src/theme';
import {formatDatetimeDDMMYYYY} from 'src/utils/format';
import {ProductContext} from '..';
import {Product} from 'src/models';
import {Box} from '@mui/material';
import {Edit, Trash} from 'iconsax-react';

const TableProduct = () => {
  const {screen = 'tat-ca', subScreen = ''} = useParams<PathParams>();
  const navigate = useNavigate();
  const search = useContext(ProductContext);
  const [filters, setFilters] = useState<QueryParams>({
    pageNumber: 1,
    pageSize: 10,
    search: '',
  });

  const {data, isLoading, isFetching} = useGetAllProduct({...filters, search});

  const [showDialog, setShowDialog] = useState<{open: boolean; data?: Product | null}>({
    open: false,
    data: null,
  });

  const mutationDelete = useDeleteProduct();

  const columns: ColumnTableProps[] = [
    {
      field: 'stt',
      headerName: 'STT',
      type: 'text',
      width: '50px',
      renderCell: (row, index) =>
        (Number(filters?.pageNumber) - 1) * Number(filters?.pageSize) + (index + 1),
    },
    {field: '_id', headerName: 'Mã', type: 'text', width: '200px'},
    {
      field: 'name',
      headerName: 'Tên sản phẩm',
      type: 'text',
      width: '200px',
    },
    {
      field: 'brand',
      headerName: 'Nhãn hiệu',
      type: 'text',
      width: '200px',
    },
    {
      field: 'createdAt',
      headerName: 'Ngày tạo',
      type: 'text',
      width: '100px',
      isSortable: true,
      renderCell: row => formatDatetimeDDMMYYYY(row?.created),
    },
    {
      field: 'updatedAt',
      headerName: 'Ngày cập nhật',
      type: 'text',
      width: '100px',
      isSortable: true,
      renderCell: row => formatDatetimeDDMMYYYY(row?.created),
    },
    {
      field: 'status',
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
              iconName={Edit}
              color="primary"
              rounded
              // onClick={() => setShowDialog({open: true, id: row?._id})}
            />
            <IconButtonBase
              iconName={Edit}
              color="primary"
              rounded
              // onClick={() => setShowDialog({open: true, id: row?._id})}
            />
            <IconButtonBase
              iconName={Trash}
              color="error"
              rounded
              // onClick={() => setShowConfirm({open: true, data: row})}
            />
          </Box>
        );
      },
    },
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
              content={`Bạn có chắc chắn muốn xóa sản phẩm ${showDialog?.data?.name}?`}
              onAgree={() => {
                mutationDelete.mutate(showDialog?.data?._id ?? 0);
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

export default TableProduct;
