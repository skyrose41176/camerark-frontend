import {Box, Card} from '@mui/material';
import {Edit, Trash} from 'iconsax-react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDeleteModelProduct, useGetAllModelProduct} from 'src/apis/modelproduct';
import {
  DataTable,
  DialogConfirm,
  IconButtonBase,
  LoadingSkeleton,
  NoData,
  SearchBar,
} from 'src/components/base';
import {ColumnTableProps} from 'src/components/types';
import {ModelProduct} from 'src/models';
import {QueryParams} from 'src/models/common';
import {colors} from 'src/theme';
import {formatDatetimeDDMMYYYY} from 'src/utils/format';
import DialogModelProduct from './dialog';

const TableModelProduct = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<QueryParams>({
    pageNumber: 1,
    pageSize: 10,
    search: '',
  });
  const [search, setSearch] = useState<string>('');

  const {data, isLoading, isFetching} = useGetAllModelProduct({...filters, search});

  const [showDialog, setShowDialog] = useState<{open: boolean; data?: ModelProduct | null}>({
    open: false,
    data: null,
  });
  const [showForm, setShowForm] = useState<{open: boolean; data?: ModelProduct | null}>({
    open: false,
    data: null,
  });

  const mutationDelete = useDeleteModelProduct();

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
      field: 'product.name',
      headerName: 'Tên sản phẩm',
      type: 'text',
      width: '200px',
    },
    {
      field: 'model',
      headerName: 'Mã',
      type: 'text',
      width: '200px',
    },
    {
      field: 'priceAdd',
      headerName: 'Giá ',
      type: 'text',
      width: '200px',
    },
    {
      field: 'dateAdd',
      headerName: 'Ngày thêm',
      type: 'text',
      width: '100px',
      isSortable: true,
      renderCell: row => formatDatetimeDDMMYYYY(row?.dateAdd),
    },
    {
      field: 'content',
      headerName: 'Mô tả',
      type: 'text',
      width: '200px',
    },
    {
      field: 'createdAt',
      headerName: 'Ngày tạo',
      type: 'text',
      width: '100px',
      isSortable: true,
      renderCell: row => formatDatetimeDDMMYYYY(row?.createdAt),
    },
    {
      field: 'updatedAt',
      headerName: 'Ngày cập nhật',
      type: 'text',
      width: '100px',
      isSortable: true,
      renderCell: row => formatDatetimeDDMMYYYY(row?.updatedAt),
    },
    {
      field: 'isSold',
      headerName: 'Trạng thái',
      type: 'text',
      width: '140px',
      center: true,
      isSortable: true,
      renderCell: row =>
        row?.isSold ? (
          <p style={{color: colors.success}}>Đã bán</p>
        ) : (
          <p style={{color: colors.error}}>Chưa bán</p>
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
              onClick={() => setShowForm({open: true, data: row})}
            />
            <IconButtonBase
              iconName={Trash}
              color="error"
              rounded
              onClick={() => setShowDialog({open: true, data: row})}
            />
          </Box>
        );
      },
    },
  ];

  return (
    <>
      <Card style={{padding: 15}} className={'mb-2'}>
        <SearchBar onSubmit={setSearch} />
      </Card>
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
              content={`Bạn có chắc chắn muốn xóa sản phẩm ${showDialog?.data?._id}?`}
              onAgree={() => {
                mutationDelete.mutate(showDialog?.data?._id ?? 0);
                setShowDialog({open: false, data: null});
              }}
            />
          )}
          {showForm.open && (
            <DialogModelProduct
              open={showForm.open}
              onClose={() => setShowForm({data: null, open: false})}
              id={showForm.data?._id || ''}
            />
          )}
        </>
      ) : (
        <NoData />
      )}
    </>
  );
};

export default TableModelProduct;
