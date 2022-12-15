import {Box, Grid} from '@mui/material';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  ButtonBase,
  CardBase,
  CardCollapse,
  DialogConfirm,
  TableThongTin,
} from 'src/components/base';
import DinhKemItem, {
  ItemFileProp,
} from 'src/components/hook-form/fields/dinh-kem-field/dinh-kem-item';
import {PageWrapper} from 'src/components/wrapper';
import Header from 'src/layouts/Header';
import CardMoreInfo from './components/card-thong-tin-them';
import CardLichSuThaoTac from './components/card-lich-su-thao-tac';
import KetQuaXuLy from './components/ket-qua-xu-ly';
import ThaoLuan from './components/thao-luan';
import TienDoXuly from './components/tien-do-xu-ly';
import {
  useCreateBoPhanXuLy,
  useCreateNguoiXuLy,
  useDeletePhieuYeuCau,
  useDongPhieuYeuCau,
  useGetAllDinhKemThaoLuan,
  useGetByPhieuYeuCauId,
  useGetOneNhanSu,
  useGetOnePhieuYeuCau,
  useUpdateStatusPhieuYeuCau,
} from 'src/apis';
import {useNavigate, useParams} from 'react-router-dom';
import {PathParams} from 'src/models/common';
import {formatDatetimeHHmmDDMMYYYY} from 'src/utils/format';
import {useAppSelector} from 'src/redux/hooks';
import {selectInfoUser} from 'src/redux/slice/authSlice';
import {
  DialogChuyenTiep,
  DialogConfirmCntt,
  DialogConfirmCustom,
  DialogMoiThemBoPhan,
  DialogMoiThemNguoiPheDuyet,
  DialogUpdatePyc,
  DialogXuatFilePdf,
} from './components/dialog';
import {colors} from 'src/theme';
import {BoPhanVaiTro, ThaoTac, TrangThaiPhu, TrangThaiXuLy} from 'src/constants';
import AlertXuLy from './components/card-alert-xu-ly';
import {DinhKemKetQua, PhieuYeuCau} from 'src/models';
import uploadFiles, {FileUpload} from 'src/apis/upload';
import {DocumentDownload, Slash} from 'iconsax-react';
import generatePdf from 'src/components/generate-pdf';
export interface FormConfirm {
  role: string;
  noiDung: string;
  xuLy: string;
  dinhKemKetQuas?: [];
}
const ThongTinChiTietPage = () => {
  const navigate = useNavigate();
  const infoUser = useAppSelector(selectInfoUser);
  const {idHoSo} = useParams<PathParams>();
  const formConfirmCustom = useForm<any>({defaultValues: {noiDung: ''}});
  const formConfirmCntt = useForm<FormConfirm>({defaultValues: {noiDung: '', xuLy: ''}});
  const formMoiThem = useForm<any>();
  const formMoiThemNgPheDuyet = useForm<any>();
  const formChuyenTiep = useForm<any>();
  const {handleSubmit: handleSubmitConfirmCustom} = formConfirmCustom;
  const {handleSubmit: handleSubmitConfirmCntt, reset} = formConfirmCntt;
  const {handleSubmit: handleSubmitMoiThem} = formMoiThem;
  const {handleSubmit: handleSubmitMoiPheDuyet} = formMoiThemNgPheDuyet;
  const {handleSubmit: handleSubmitChuyenTiep} = formChuyenTiep;

  const [showConfirm, setShowConfirm] = useState({open: false, type: '', role: ''});
  const [showConfirmCntt, setShowConfirmCntt] = useState({open: false, type: '', role: ''});
  const [showConfirmCustom, setShowConfirmCustom] = useState({open: false, type: '', role: ''});
  const [showDialogMoiThemBoPhan, setShowDialogMoiThemBoPhan] = useState({open: false, type: ''});
  const [showDialogMoiThemNguoiPheDuyet, setShowDialogMoiThemNguoiPheDuyet] = useState({
    open: false,
    role: '',
  });
  const [showDialogUpdatePyc, setShowDialogUpdatePyc] = useState({
    open: false,
  });
  const [showDialogChuyenTiep, setShowDialogChuyenTiep] = useState({open: false, type: ''});
  const [showDialog, setShowDialog] = useState<{open: boolean; data?: PhieuYeuCau | null}>({
    open: false,
    data: null,
  });
  const [showDialogXuatFile, setShowDialogXuatFile] = useState<{
    open: boolean;
    fileUrl: string;
  }>({
    open: false,
    fileUrl: '',
  });
  const {data, isLoading} = useGetOnePhieuYeuCau(Number(idHoSo));
  const {data: dataNguoiXuLys} = useGetByPhieuYeuCauId(Number(idHoSo));
  const {data: dataDinhKemThaoLuans} = useGetAllDinhKemThaoLuan(Number(idHoSo));

  const renderAction = (
    status:
      | 'dong-y'
      | 'tu-choi'
      | 'chuyen-tiep'
      | 'chon-xu-ly'
      | 'moi-bo-phan'
      | 'moi-phe-duyet'
      | 'cap-tren-dong-y'
      | 'cap-tren-tu-choi'
      | 'cap-nhat-pyc'
      | 'dieu-phoi',
    role: string
  ) => {
    switch (status) {
      case ThaoTac.DONG_Y:
      case ThaoTac.CAP_TREN_DONG_Y:
        return (
          <div className="min-w-fit mx-1">
            <ButtonBase
              label="Đồng ý"
              variant="outlined"
              color="success"
              onClick={() => {
                if (role === BoPhanVaiTro.CNTT || role === BoPhanVaiTro.NGHIEP_VU)
                  setShowConfirmCntt({open: true, type: status, role});
                else setShowConfirmCustom({open: true, type: status, role});
              }}
            />
          </div>
        );
      case ThaoTac.TU_CHOI:
      case ThaoTac.CAP_TREN_TU_CHOI:
        return (
          <div className="min-w-fit mx-1">
            <ButtonBase
              label="Từ chối"
              variant="outlined"
              color="error"
              onClick={() => {
                if (role === BoPhanVaiTro.CNTT || role === BoPhanVaiTro.NGHIEP_VU)
                  setShowConfirmCntt({open: true, type: status, role});
                else setShowConfirmCustom({open: true, type: status, role});
              }}
            />
          </div>
        );
      case ThaoTac.CHUYEN_TIEP:
        return (
          <div className="min-w-fit mx-1">
            <ButtonBase
              label="Chuyển tiếp"
              variant="outlined"
              color="primary"
              onClick={() => setShowDialogChuyenTiep({open: true, type: ThaoTac.CHUYEN_TIEP})}
            />
          </div>
        );
      case ThaoTac.CHON_XU_LY:
        return (
          <div className="min-w-fit mx-1">
            <ButtonBase
              label="Chọn xử lý"
              variant="outlined"
              color="primary"
              onClick={() => setShowConfirm({open: true, type: ThaoTac.CHON_XU_LY, role})}
            />
          </div>
        );
      case ThaoTac.CAP_NHAT_PYC:
        return (
          <div className="min-w-fit mx-1">
            <ButtonBase
              label="Cập nhật PYC"
              variant="outlined"
              color="warning"
              onClick={() => setShowDialogUpdatePyc({open: true})}
            />
          </div>
        );
      case ThaoTac.MOI_BO_PHAN:
        return (
          <div className="min-w-fit mx-1">
            <ButtonBase
              label="Mời bộ phận"
              variant="outlined"
              color="primary"
              onClick={() =>
                setShowDialogMoiThemBoPhan({
                  ...showDialogMoiThemBoPhan,
                  open: true,
                  type: 'bo-phan',
                })
              }
            />
          </div>
        );
      case ThaoTac.MOI_PHE_DUYET:
        return (
          <div className="min-w-fit mx-1">
            <ButtonBase
              label="Mời phê duyệt"
              variant="outlined"
              color="primary"
              onClick={() =>
                setShowDialogMoiThemNguoiPheDuyet({
                  ...showDialogMoiThemNguoiPheDuyet,
                  open: true,
                  role,
                })
              }
            />
          </div>
        );
      case ThaoTac.DIEU_PHOI:
        return (
          <div className="min-w-fit mx-1">
            <ButtonBase
              label="Điều phối"
              variant="outlined"
              color="primary"
              onClick={() =>
                setShowDialogMoiThemBoPhan({
                  ...showDialogMoiThemBoPhan,
                  open: true,
                  type: 'dieu-phoi',
                })
              }
            />
          </div>
        );
      default:
        return undefined;
    }
  };

  const actionButtonWithRole = () => {
    if (data?.trangThaiPhu === TrangThaiPhu.OPEN) {
      // Quyền Trưởng đơn vị
      if (Number(infoUser?.Id) === data?.tdvId && data?.trangThaiTdv === TrangThaiXuLy.TIEP_NHAN) {
        return (
          <>
            {renderAction('dong-y', 'tdv')}
            {renderAction('tu-choi', 'tdv')}
          </>
        );
      }
      if (data?.trangThaiTdv === TrangThaiXuLy.CHAP_THUAN) {
        let emailNguoiXuLy = dataNguoiXuLys?.data?.find(
          item =>
            item?.email === infoUser?.Email &&
            (item?.trangThaiBoPhan === TrangThaiXuLy.TIEP_NHAN ||
              item?.trangThaiBoPhan === TrangThaiXuLy.DIEU_PHOI) &&
            item?.thuTuBoPhan === data?.trangThaiChinh
        );

        if (emailNguoiXuLy) {
          // Quyền Bộ phận nghiệp vụ
          if (emailNguoiXuLy?.vaiTroBoPhan === BoPhanVaiTro.NGHIEP_VU) {
            if (
              emailNguoiXuLy.trangThai === TrangThaiXuLy.TIEP_NHAN &&
              (dataNguoiXuLys?.data?.filter(
                item => item?.boPhanXuLyId === emailNguoiXuLy?.boPhanXuLyId && item?.trangThai !== 0
              ).length || 0) <= 0
            ) {
              return (
                <>
                  {/* {renderAction('moi-bo-phan', BoPhanVaiTro.NGHIEP_VU)} */}
                  {renderAction('chuyen-tiep', BoPhanVaiTro.NGHIEP_VU)}
                  {renderAction('chon-xu-ly', BoPhanVaiTro.NGHIEP_VU)}
                </>
              );
            }
            if (emailNguoiXuLy.trangThai === TrangThaiXuLy.XU_LY)
              return (
                <>
                  {renderAction('moi-phe-duyet', BoPhanVaiTro.NGHIEP_VU)}
                  {renderAction('moi-bo-phan', BoPhanVaiTro.NGHIEP_VU)}
                  {renderAction('dong-y', BoPhanVaiTro.NGHIEP_VU)}
                  {renderAction('tu-choi', BoPhanVaiTro.NGHIEP_VU)}
                </>
              );
            if (emailNguoiXuLy.trangThai === TrangThaiXuLy.CAP_TREN_XU_LY)
              return (
                <>
                  {renderAction('cap-tren-dong-y', BoPhanVaiTro.NGHIEP_VU)}
                  {renderAction('cap-tren-tu-choi', BoPhanVaiTro.NGHIEP_VU)}
                </>
              );
          }

          // Quyền bộ phận trung gian
          if (emailNguoiXuLy?.vaiTroBoPhan === BoPhanVaiTro.TRUNG_GIAN) {
            if (
              emailNguoiXuLy.trangThai === TrangThaiXuLy.TIEP_NHAN &&
              (dataNguoiXuLys?.data?.filter(
                item => item?.boPhanXuLyId === emailNguoiXuLy?.boPhanXuLyId && item?.trangThai !== 0
              ).length || 0) <= 0
            ) {
              return <>{renderAction('chon-xu-ly', BoPhanVaiTro.TRUNG_GIAN)}</>;
            }
            if (emailNguoiXuLy.trangThai === TrangThaiXuLy.XU_LY)
              return (
                <>
                  {renderAction('dong-y', BoPhanVaiTro.TRUNG_GIAN)}
                  {renderAction('tu-choi', BoPhanVaiTro.TRUNG_GIAN)}
                </>
              );
          }

          // Quyền Bộ phận điều phối - CNTT
          if (emailNguoiXuLy?.vaiTroBoPhan === BoPhanVaiTro.CNTT) {
            if (
              emailNguoiXuLy.trangThai === TrangThaiXuLy.DIEU_PHOI &&
              data?.trangThaiPhu === TrangThaiPhu.OPEN
            ) {
              return (
                <>
                  {renderAction('dieu-phoi', BoPhanVaiTro.CNTT)}
                  {renderAction('cap-nhat-pyc', BoPhanVaiTro.CNTT)}
                </>
              );
            }
            if (
              emailNguoiXuLy.trangThai === TrangThaiXuLy.TIEP_NHAN &&
              (dataNguoiXuLys?.data?.filter(
                item => item?.boPhanXuLyId === emailNguoiXuLy?.boPhanXuLyId && item?.trangThai !== 0
              ).length || 0) <= 0
            ) {
              return (
                <>
                  {renderAction('dieu-phoi', BoPhanVaiTro.CNTT)}
                  {renderAction('chon-xu-ly', BoPhanVaiTro.CNTT)}
                </>
              );
            }
            if (emailNguoiXuLy.trangThai === TrangThaiXuLy.XU_LY)
              return (
                <>
                  {renderAction('moi-bo-phan', BoPhanVaiTro.CNTT)}
                  {renderAction('moi-phe-duyet', BoPhanVaiTro.CNTT)}
                  {renderAction('cap-nhat-pyc', BoPhanVaiTro.CNTT)}
                  {renderAction('dong-y', BoPhanVaiTro.CNTT)}
                  {renderAction('tu-choi', BoPhanVaiTro.CNTT)}
                </>
              );
            if (emailNguoiXuLy.trangThai === TrangThaiXuLy.CAP_TREN_XU_LY)
              return (
                <>
                  {renderAction('cap-tren-dong-y', BoPhanVaiTro.CNTT)}
                  {renderAction('cap-tren-tu-choi', BoPhanVaiTro.CNTT)}
                </>
              );
          }
        }
      }
    }
  };

  const handleCloseDialog = () => {
    reset({noiDung: '', role: ''});
    formMoiThem.reset({boPhanId: undefined, radio: 1});
    setShowDialogMoiThemBoPhan({open: false, type: ''});
    setShowDialogMoiThemNguoiPheDuyet({open: false, role: ''});
    setShowConfirmCustom({open: false, type: '', role: ''});
    setShowConfirm({open: false, type: '', role: ''});
    setShowConfirmCntt({open: false, type: '', role: ''});
    setShowDialogChuyenTiep({open: false, type: ''});
    setShowDialogUpdatePyc({open: false});
  };

  const {data: dataTdv} = useGetOneNhanSu(data?.tdvId || '');
  const mutationUpdate = useUpdateStatusPhieuYeuCau(() => {
    handleCloseDialog();
  });
  const mutationDongPhieuYeuCau = useDongPhieuYeuCau(() => {
    handleCloseDialog();
  });

  const mutationCreate = useCreateBoPhanXuLy(() => {
    handleCloseDialog();
  });

  const mutationCreateNguoiXuLy = useCreateNguoiXuLy(() => {
    handleCloseDialog();
  });

  const mutationDelete = useDeletePhieuYeuCau(() => navigate('/danh-sach-phieu-yeu-cau'));

  const onSubmit = async (
    typeDialog: 'confirm' | 'cntt' | 'xu-ly' | 'dong-pyc',
    value?: FormConfirm
  ) => {
    if (typeDialog === 'dong-pyc') {
      await mutationDongPhieuYeuCau.mutateAsync({
        id: Number(idHoSo),
        chucVu: infoUser?.ChucVu,
        noiDung: value?.noiDung,
        tenDonVi: infoUser?.donVi,
        tenNhanSu: infoUser?.TenNhanVien,
      });
    } else {
      let resDinhKem: FileUpload | undefined = undefined;
      if (value?.dinhKemKetQuas && value?.dinhKemKetQuas?.length > 0) {
        resDinhKem = await uploadFiles(value?.dinhKemKetQuas, infoUser.Email);
      }
      let newData = {
        id: Number(idHoSo),
        noiDung: value?.noiDung,
        xuLy: value?.xuLy,
        type:
          typeDialog === 'confirm'
            ? showConfirmCustom.type
            : typeDialog === 'cntt'
            ? showConfirmCntt.type
            : typeDialog === 'xu-ly'
            ? showConfirm.type
            : '',
        role:
          typeDialog === 'confirm'
            ? showConfirmCustom.role
            : typeDialog === 'cntt'
            ? showConfirmCntt.role
            : typeDialog === 'xu-ly'
            ? showConfirm.role
            : '',
        tenDonVi: infoUser?.donVi,
        tenNhanSu: infoUser?.TenNhanVien,
        chucVu: infoUser?.ChucVu,
        dinhKemKetQuas: resDinhKem?.files as DinhKemKetQua[],
      };
      await mutationUpdate.mutateAsync(newData);
    }
  };

  const onCreate = async (data: any) => {
    let type = showDialogMoiThemBoPhan?.type || showDialogChuyenTiep?.type;
    if (type === 'chuyen-tiep') {
      data = {...data, boPhanIds: [data?.boPhanId]};
    }
    await mutationCreate.mutateAsync({...data, type, phieuYeuCauId: idHoSo});
  };

  const onCreateNguoiXuLy = async (dataFrom: any) => {
    let user = dataNguoiXuLys?.data?.find(
      item =>
        item?.email === infoUser?.Email &&
        item?.trangThaiBoPhan === TrangThaiXuLy.TIEP_NHAN &&
        item?.thuTuBoPhan === data?.trangThaiChinh
    );
    await mutationCreateNguoiXuLy.mutateAsync({
      ...dataFrom,
      boPhanXuLyId: user?.boPhanXuLyId,
      phieuYeuCauId: idHoSo,
      hoTen: infoUser?.TenNhanVien,
      chucVu: infoUser?.ChucVu,
      tenDonVi: infoUser?.donVi,
      role: showDialogMoiThemNguoiPheDuyet?.role,
    });
  };

  const nguoiXuLy = dataNguoiXuLys?.data
    ?.filter(item => item?.vaiTroBoPhan !== BoPhanVaiTro.TRUNG_GIAN)
    ?.find(item => item?.email === infoUser?.Email);

  return (
    <div>
      <Header title="Chi tiết hồ sơ" />
      <PageWrapper>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8} lg={8}>
              {isLoading ? null : (
                <div>
                  <CardBase
                    headerShow
                    title={`Mã PYC ${idHoSo}`}
                    childrenHeaderRight={
                      <>
                        {/* {data?.trangThaiChinh === TrangThaiXuLy.TIEP_NHAN &&
                          data?.trangThaiPhu === TrangThaiPhu.OPEN &&
                          data?.createdById === Number(infoUser.Id) && (
                            <>
                              <ButtonBase
                                startIcon={<Trash size="20" color={colors.delete} variant="Bulk" />}
                                label="XÓA PYC"
                                color="error"
                                variant="outlined"
                                className="min-btn"
                                onClick={() => setShowDialog({open: true, data})}
                              />
                              <Box className="mr-2" />
                            </>
                          )} */}
                        {(Number(infoUser?.Id) === data?.createdById ||
                          infoUser?.roles.includes('1')) &&
                          data?.trangThaiPhu !== TrangThaiPhu.CLOSED && (
                            <>
                              <ButtonBase
                                startIcon={
                                  <Slash size="20" color={colors.warning} variant="Bulk" />
                                }
                                label="ĐÓNG PYC"
                                color="warning"
                                variant="outlined"
                                className="min-btn"
                                onClick={() =>
                                  setShowConfirmCustom({
                                    open: true,
                                    type: ThaoTac.DONG_PYC,
                                    role: '',
                                  })
                                }
                              />
                              <Box className="mr-2" />
                            </>
                          )}
                        <ButtonBase
                          label="XUẤT FILE PDF"
                          className="min-btn"
                          startIcon={<DocumentDownload size="20" color={'#fff'} variant="Bulk" />}
                          onClick={() => {
                            data &&
                              generatePdf({
                                phieuYeuCau: data,
                                dataTdv,
                                nguoiXuLys: dataNguoiXuLys?.data,
                              }).then(file => {
                                if (file)
                                  setShowDialogXuatFile({open: true, fileUrl: file as string});
                              });
                          }}
                        />
                      </>
                    }
                  >
                    <AlertXuLy
                      lichSuThaoTacs={data?.lichSuThaoTacs.filter(item => item?.buoc > 0) || []}
                    />
                    <TienDoXuly
                      actionsButton={actionButtonWithRole()}
                      phieuYeuCau={data}
                      dataNguoiXuLys={dataNguoiXuLys?.data}
                    />
                    <Box className="mt-2" />
                    {nguoiXuLy &&
                      (data?.lichSuThaoTacs?.filter(
                        item =>
                          (item?.vaiTro === BoPhanVaiTro.CNTT ||
                            item?.vaiTro === BoPhanVaiTro.NGHIEP_VU) &&
                          (item?.buoc === TrangThaiXuLy.CHAP_THUAN ||
                            item?.buoc === TrangThaiXuLy.CHO_CAP_TREN_DUYET ||
                            item?.buoc === TrangThaiXuLy.MOI_THAM_GIA ||
                            item?.buoc === TrangThaiXuLy.THEO_DOI ||
                            item?.buoc === TrangThaiXuLy.DIEU_PHOI ||
                            item?.buoc === TrangThaiXuLy.CAP_TREN_DONG_Y ||
                            item?.buoc === TrangThaiXuLy.TU_CHOI ||
                            item?.buoc === TrangThaiXuLy.CAP_TREN_TU_CHOI)
                      )?.length || []) > 0 && (
                        <KetQuaXuLy
                          closed={data?.trangThaiPhu}
                          lichSuThaoTacs={data?.lichSuThaoTacs}
                        />
                      )}

                    <Box className="mt-2" />
                    <CardCollapse
                      title={`Thông tin phiếu yêu cầu - Mã PYC: ${idHoSo}`}
                      className="detail-"
                    >
                      <TableThongTin
                        labelWidth={200}
                        data={[
                          {
                            label: 'Mă yêu cầu',
                            value: data?.id,
                            valueBold: true,
                          },
                          {
                            label: 'Người khởi tạo',
                            value: data?.tenNhanSu,
                            valueBold: true,
                          },
                          {
                            label: 'Chức danh',
                            value: data?.chucDanh,
                            valueBold: true,
                          },
                          {
                            label: 'Email',
                            value: data?.createdBy,
                            valueBold: true,
                          },
                          {
                            label: 'Điện thoại liên lạc',
                            value: data?.sdt,
                            valueBold: true,
                          },
                          {
                            label: 'Đơn vị',
                            value: data?.tenDonVi,
                            valueBold: true,
                          },
                          {
                            label: 'Trưởng đơn vị',
                            value: dataTdv?.email,
                            valueBold: true,
                          },
                          {
                            label: 'Chức danh TĐV',
                            value: dataTdv?.chucVu,
                            valueBold: true,
                          },
                        ]}
                      />
                    </CardCollapse>
                    <Box className="mt-2" />
                    <CardCollapse title="Nội dung yêu cầu" className="detail-">
                      <TableThongTin
                        labelWidth={200}
                        data={[
                          {
                            label: 'Loại nghiệp vụ',
                            value: data?.tenLoaiNghiepVu ?? data?.loaiYeuCau?.loaiNghiepVu?.ten,
                            valueBold: true,
                          },
                          {
                            label: 'Loại yêu cầu',
                            value: data?.tenLoaiYeuCau ?? data?.loaiYeuCau?.ten,
                            valueBold: true,
                          },
                          {
                            label: 'Mô tả chi tiết',
                            value: data?.moTa,
                            valueBold: true,
                          },
                          {
                            label: 'Mức độ ưu tiên',
                            value: data?.uuTien,
                            valueBold: true,
                          },
                        ]}
                      />
                    </CardCollapse>
                    <Box className="mt-2" />
                    <CardCollapse title="Tập tin đính kèm" className="box-attached-detail detail-">
                      {data?.dinhKemPhieuYeuCaus?.map((item: any) => (
                        <DinhKemItem
                          item={item as ItemFileProp}
                          listFiles={data?.dinhKemPhieuYeuCaus as ItemFileProp[]}
                        />
                      ))}
                    </CardCollapse>
                  </CardBase>
                  <Box className="mt-2" />
                  {(data?.createdBy === infoUser.Email ||
                    dataTdv?.email === infoUser.Email ||
                    dataNguoiXuLys?.data?.findIndex(item => item?.email === infoUser.Email) !==
                      -1) && (
                    <CardBase>
                      {(dataDinhKemThaoLuans?.length || []) > 0 && (
                        <>
                          <CardCollapse
                            title="Tập tin đính kèm trong thảo luận"
                            className="detail-"
                          >
                            {dataDinhKemThaoLuans?.map((item: any) => (
                              <DinhKemItem
                                item={item as ItemFileProp}
                                listFiles={dataDinhKemThaoLuans as ItemFileProp[]}
                              />
                            ))}
                          </CardCollapse>
                          <Box className="mt-2" />
                        </>
                      )}

                      <div className="box-comment">
                        <ThaoLuan phieuYeuCauId={Number(idHoSo)} />
                      </div>
                    </CardBase>
                  )}
                </div>
              )}
            </Grid>
            <Grid item xs={12} sm={4} lg={4}>
              <div>
                <CardMoreInfo
                  phieuYeuCau={data}
                  dataTdv={dataTdv}
                  dataNguoiXuLys={dataNguoiXuLys?.data || []}
                />
              </div>
              <div className="my-2" />
              <div>
                <CardLichSuThaoTac
                  data={
                    data?.lichSuThaoTacs?.map((item: any) => ({
                      time: formatDatetimeHHmmDDMMYYYY(item?.created),
                      email: item?.createdBy,
                      status: item?.buoc,
                      taiBuoc: item?.tenBuoc,
                    })) || []
                  }
                />
              </div>
            </Grid>
          </Grid>
          <DialogConfirmCustom
            required={
              showConfirmCustom.type === ThaoTac.DONG_PYC ||
              showConfirmCustom.type === ThaoTac.CAP_TREN_TU_CHOI ||
              showConfirmCustom.type === ThaoTac.TU_CHOI
            }
            form={formConfirmCustom}
            open={showConfirmCustom.open}
            title="Thông báo"
            label={showConfirmCustom.type === ThaoTac.TU_CHOI ? 'Nhập lý do từ chối' : 'Ghi chú'}
            maxWidth="sm"
            content={`<b>Bạn có chắc chắn muốn ${
              showConfirmCustom.type === ThaoTac.TU_CHOI ||
              showConfirmCustom.type === ThaoTac.CAP_TREN_TU_CHOI
                ? `<span style="color:${colors.error}">từ chối</span>`
                : showConfirmCustom.type === ThaoTac.DONG_PYC
                ? `<span style="color:${colors.warning}">đóng</span>`
                : `<span style="color:${colors.success}">đồng ý</span>`
            } yêu cầu này không?</b>`}
            onClose={handleCloseDialog}
            onSubmit={handleSubmitConfirmCustom(data =>
              onSubmit(showConfirmCustom.type === ThaoTac.DONG_PYC ? 'dong-pyc' : 'confirm', data)
            )}
          />
          <DialogConfirmCntt
            required={
              showConfirmCntt.type === ThaoTac.CAP_TREN_TU_CHOI ||
              showConfirmCntt.type === ThaoTac.TU_CHOI
            }
            form={formConfirmCntt}
            open={showConfirmCntt.open}
            title="Phần xử lý của công nghệ thông tin"
            maxWidth="sm"
            onClose={handleCloseDialog}
            onSubmit={handleSubmitConfirmCntt(data => onSubmit(BoPhanVaiTro.CNTT, data))}
          />
          <DialogMoiThemBoPhan
            form={formMoiThem}
            open={showDialogMoiThemBoPhan.open}
            title="Mời thêm bộ phận xử lý"
            maxWidth="sm"
            onClose={handleCloseDialog}
            onSubmit={handleSubmitMoiThem(onCreate)}
          />
          {showDialogMoiThemNguoiPheDuyet.open && (
            <DialogMoiThemNguoiPheDuyet
              phieuYeuCauId={idHoSo}
              form={formMoiThemNgPheDuyet}
              open={showDialogMoiThemNguoiPheDuyet.open}
              title="Mời người phê duyệt"
              maxWidth="sm"
              onClose={handleCloseDialog}
              onSubmit={handleSubmitMoiPheDuyet(onCreateNguoiXuLy)}
            />
          )}
          <DialogChuyenTiep
            form={formChuyenTiep}
            open={showDialogChuyenTiep.open}
            title="Chuyển tiếp"
            maxWidth="sm"
            onClose={handleCloseDialog}
            onSubmit={handleSubmitChuyenTiep(onCreate)}
          />
          <DialogConfirm
            open={showConfirm.open}
            title="Thông báo"
            content="Bạn có chắc muốn chọn xử lý yêu cầu này không?"
            onClose={handleCloseDialog}
            onAgree={() => onSubmit('xu-ly')}
          />
          <DialogUpdatePyc
            open={showDialogUpdatePyc.open}
            onClose={handleCloseDialog}
            data={data}
          />
          {showDialog.open && (
            <DialogConfirm
              open={showDialog.open}
              onClose={() => setShowDialog({open: false, data: null})}
              title="Thông báo"
              content={`Bạn có chắc chắn muốn xóa phiếu yêu cầu số ${showDialog?.data?.id}?`}
              onAgree={() => mutationDelete.mutate(showDialog?.data?.id ?? 0)}
            />
          )}
          {showDialogXuatFile.open && (
            <DialogXuatFilePdf
              open={showDialogXuatFile.open}
              fileUrl={showDialogXuatFile.fileUrl}
              onClose={() => setShowDialogXuatFile({open: false, fileUrl: ''})}
              title="Xuất file pdf"
            />
          )}
        </div>
      </PageWrapper>
    </div>
  );
};

export default ThongTinChiTietPage;
