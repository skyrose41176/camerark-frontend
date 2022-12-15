import {Box} from '@mui/material';
import moment from 'moment';
import {useForm} from 'react-hook-form';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {useSearchPhieuYeuCau} from 'src/apis';
import {ButtonBase, CardBase, DataTable} from 'src/components/base';
import {DatePickerField, InputField} from 'src/components/hook-form/fields';
import LoaiNghiepVuField from 'src/components/hook-form/loai-nghiep-vu-field';
import LoaiYeuCauField from 'src/components/hook-form/loai-yeu-cau-field';
import NhanSuField from 'src/components/hook-form/nhan-su-field';
import {ColumnTableProps} from 'src/components/types';
import {PageWrapper} from 'src/components/wrapper';
import FieldLayout from 'src/layouts/FieldLayout';
import Header from 'src/layouts/Header';
import {colors} from 'src/theme';
import {formatDatetimeDDMMYYYY} from 'src/utils/format';

const TimKiemPage = () => {
  const [search, setSearch] = useSearchParams([
    ['pageNumber', '1'],
    ['pageSize', '10'],
    ['search', ''],
    ['begin', ''],
  ]);

  const params = (data: URLSearchParams): any => {
    const rs = [...data.entries()].reduce((o, [key, value]) => {
      if (value !== 'undefined' && value !== 'null') {
        return {...o, [key]: value};
      } else {
        return o;
      }
    }, {});
    return rs;
  };

  const navigate = useNavigate();

  const {data, isFetching} = useSearchPhieuYeuCau(params(search));
  const columns: ColumnTableProps[] = [
    {
      field: 'stt',
      headerName: 'STT',
      type: 'text',
      width: '50px',
      renderCell: (row, index) =>
        (Number(params(search)?.pageNumber) - 1) * Number(params(search)?.pageSize) + (index + 1),
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
  ];

  const form = useForm({
    defaultValues: {
      ...params(search),
      loaiNghiepVuId: params(search)?.loaiNghiepVuId && {
        label: params(search)?.tenloaiNghiepVu,
        value: params(search)?.loaiNghiepVuId,
      },
      loaiYeuCauId: params(search)?.loaiYeuCauId && {
        label: params(search)?.tenLoaiYeuCau,
        value: params(search)?.loaiYeuCauId,
      },
      createdById: params(search)?.createdById && {
        label: params(search)?.tenCreatedBy,
        value: params(search)?.createdById,
      },
      nguoiXuLyId: params(search)?.nguoiXuLyId && {
        label: params(search)?.tenNguoiXuLy,
        value: params(search)?.nguoiXuLyId,
      },
    },
  });
  const {handleSubmit} = form;
  const onSubmit = async (value: any) => {
    const next = {
      ...value,
      loaiYeuCauId: value?.loaiYeuCauId?.value,
      tenLoaiYeuCau: value?.loaiYeuCauId?.label,
      loaiNghiepVuId: value?.loaiNghiepVuId?.value,
      tenloaiNghiepVu: value?.loaiNghiepVuId?.label,
      createdById: value?.createdById?.value,
      tenCreatedBy: value?.createdById?.label,
      nguoiXuLyId: value?.nguoiXuLyId?.value,
      tenNguoiXuLy: value?.nguoiXuLyId?.label,
      created: value?.created ? moment(value?.created).format('yyyy-MM-DD') : '',
      begin: '1',
    };
    setSearch({
      pageNumber: params(search).pageNumber,
      pageSize: params(search).pageSize,
      begin: '1',
      ...params(new URLSearchParams(next)),
    });
  };
  return (
    <div>
      <Header title="Tìm kiếm phiếu yêu cầu" />

      <PageWrapper>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <div style={{width: '50%'}}>
            <CardBase>
              <FieldLayout xs={6} md={6} lg={6} xl={6}>
                <LoaiNghiepVuField form={form} valueTypeSelectObject />
                <LoaiYeuCauField form={form} valueTypeSelectObject />
              </FieldLayout>
              <FieldLayout xs={6} md={6} lg={6} xl={6} className="mt-1">
                <InputField
                  form={form}
                  type="number"
                  formatNumber={false}
                  name="maYc"
                  label="Mã yêu cầu"
                />
                <DatePickerField form={form} name="created" label="Ngày tạo" />
              </FieldLayout>
              <FieldLayout xs={6} md={6} lg={6} xl={6} className="mt-1">
                <NhanSuField
                  form={form}
                  name="createdById"
                  label="Người tạo"
                  valueTypeSelectObject
                />
                <NhanSuField
                  form={form}
                  name="nguoiXuLyId"
                  label="Người xử lý"
                  valueTypeSelectObject
                />
              </FieldLayout>
              <ButtonBase label="Tìm kiếm" className="mt-2" onClick={handleSubmit(onSubmit)} />
            </CardBase>
          </div>
        </div>
        <Box className="mt-2" />
        <DataTable
          columns={columns}
          rows={data?.data || []}
          loading={isFetching}
          onRowClick={(row: any) => navigate(`/chi-tiet-ho-so/${row.id}`)}
          onSortChange={({column, order}) => {
            onSubmit({orderBy: column + ' ' + order});
          }}
          fixedColumn
          pagination={{
            show: true,
            page: (data?.currentPage ?? 1) - 1,
            totalCount: data?.totalCount ?? 0,
            rowsPerPage: data?.pageSize ?? 5,
            onPageChange: page => {
              onSubmit({pageNumber: page + 1});
            },
            onRowsPerPageChange: value => {
              onSubmit({pageSize: value, pageNumber: 1});
            },
          }}
        />
      </PageWrapper>
    </div>
  );
};

export default TimKiemPage;
