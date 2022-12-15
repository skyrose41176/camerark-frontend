import {List, Typography} from '@mui/material';
import {CloseCircle, HierarchySquare2, MinusCirlce, TickCircle} from 'iconsax-react';
import React, {FC} from 'react';
import {CardBase, InfoUserItem} from 'src/components/base';
import {BoPhanVaiTro, COLORS, TrangThaiXuLy} from 'src/constants';
import {NguoiXuLy, NhanSu, PhieuYeuCau} from 'src/models';

import {colors} from 'src/theme';
import {useGetAllBoPhanXuLyInPYC} from 'src/apis';
import CardBoPhan from '../card-bo-phan';

interface Props {
  phieuYeuCau?: PhieuYeuCau;
  dataNguoiXuLys?: NguoiXuLy[];
  dataTdv?: NhanSu;
}
export const convertAction = (status: number | string) => {
  let result: React.ReactNode | React.ReactChild = '';
  switch (status) {
    case TrangThaiXuLy.CHAP_THUAN:
    case TrangThaiXuLy.CAP_TREN_DONG_Y:
      result = <TickCircle size="28" color={colors.success} variant="Bulk" />;
      break;
    case TrangThaiXuLy.TU_CHOI:
    case TrangThaiXuLy.CAP_TREN_TU_CHOI:
      result = <CloseCircle size="28" color={colors.error} variant="Bulk" />;
      break;
    case TrangThaiXuLy.DIEU_PHOI:
      result = <HierarchySquare2 size="28" color={colors.primary} variant="Bulk" />;
      break;
    case TrangThaiXuLy.THEO_DOI:
      result = <MinusCirlce size="28" color={colors.warning} variant="Bulk" />;
      break;
  }
  return result;
};

const CardMoreInfo: FC<Props> = ({phieuYeuCau, dataNguoiXuLys, dataTdv}) => {
  // const listTrungGian = dataNguoiXuLys?.filter(
  //   item => item?.vaiTroBoPhan === BoPhanVaiTro.TRUNG_GIAN
  // );
  // const listCntt = dataNguoiXuLys?.filter(item => item?.vaiTroBoPhan === BoPhanVaiTro.CNTT);
  // const listNghiepVu = dataNguoiXuLys?.filter(
  //   item =>
  //     item?.vaiTroBoPhan === BoPhanVaiTro.NGHIEP_VU || item?.vaiTroBoPhan === BoPhanVaiTro.THEO_DOI
  // );

  const boPhanXuLys = useGetAllBoPhanXuLyInPYC({phieuYeuCauId: phieuYeuCau?.id || 0});
  const listTrungGian = boPhanXuLys?.data?.filter(item => item?.vaiTro === BoPhanVaiTro.TRUNG_GIAN);
  const listCntt = boPhanXuLys?.data?.filter(item => item?.vaiTro === BoPhanVaiTro.CNTT);
  const listNghiepVu = boPhanXuLys?.data?.filter(
    item => item?.vaiTro === BoPhanVaiTro.NGHIEP_VU || item?.vaiTro === BoPhanVaiTro.THEO_DOI
  );

  return (
    <div className="cardbase-padding-0">
      <div>
        <CardBase headerShow title="Trưởng đơn vị">
          <List className="scroll-list">
            <InfoUserItem
              item={{
                chucDanh: dataTdv?.chucVu || '',
                email: dataTdv?.email || '',
                name: dataTdv?.ten || '',
                donVi: dataTdv?.donVi || '',
                sdt: dataTdv?.sdt || '',
              }}
              secondaryAction={convertAction(phieuYeuCau?.trangThaiTdv || 0)}
            />
          </List>
        </CardBase>

        {listTrungGian && listTrungGian?.length > 0 && (
          <>
            <div className="mt-2" />
            <div className="box-card-group">
              <Typography
                flex={1}
                className="border-0  box-title box-title-group"
                variant="subtitle2"
                color={COLORS.primary}
              >
                Bộ phận trung gian
              </Typography>
              {listTrungGian.map(bp => (
                <>
                  <div className="mt-2" />
                  <CardBoPhan
                    title={`${bp?.tenBoPhan}`}
                    data={bp?.nguoiXuLys?.map(item => ({
                      trangThai: item?.trangThai,
                      chucVu: item?.nhanSu?.chucVu,
                      email: item?.nhanSu.email,
                      ten: item?.nhanSu.ten,
                      sdt: item?.nhanSu?.sdt,
                      donVi: item?.nhanSu?.donVi,
                    }))}
                  />
                </>
              ))}
            </div>
          </>
        )}

        {listCntt && listCntt?.length > 0 && (
          <>
            <div className="mt-2" />
            <div className="box-card-group">
              <Typography
                flex={1}
                className="border-0  box-title box-title-group"
                variant="subtitle2"
                color={COLORS.primary}
              >
                Bộ phận điều phối
              </Typography>
              {listCntt.map(bp => (
                <>
                  <div className="mt-2" />
                  <CardBoPhan
                    title={`${bp?.tenBoPhan}`}
                    data={bp?.nguoiXuLys?.map(item => ({
                      trangThai: item?.trangThai,
                      chucVu: item?.nhanSu?.chucVu,
                      email: item?.nhanSu.email,
                      ten: item?.nhanSu.ten,
                      sdt: item?.nhanSu?.sdt,
                      donVi: item?.nhanSu?.donVi,
                    }))}
                  />
                </>
              ))}
            </div>
          </>
        )}

        {listNghiepVu && listNghiepVu?.length > 0 && (
          <>
            <div className="mt-2" />
            <div className="box-card-group">
              <Typography
                flex={1}
                className="border-0  box-title box-title-group"
                variant="subtitle2"
                color={COLORS.primary}
              >
                Bộ phận nghiệp vụ
              </Typography>
              {listNghiepVu.map(bp => (
                <>
                  <div className="mt-2" />
                  <CardBoPhan
                    title={`${bp?.tenBoPhan}`}
                    data={bp?.nguoiXuLys?.map(item => ({
                      trangThai: item?.trangThai,
                      chucVu: item?.nhanSu?.chucVu,
                      email: item?.nhanSu.email,
                      ten: item?.nhanSu.ten,
                      sdt: item?.nhanSu?.sdt,
                      donVi: item?.nhanSu?.donVi,
                    }))}
                  />
                </>
              ))}
            </div>
          </>
        )}
        {/* {listTrungGian && listTrungGian?.length > 0 && (
          <CardBoPhan title="Bộ phận trung gian" data={listTrungGian} />
        )}
        <div className="mt-2" />
        <CardBoPhan title="Bộ phận điều phối - CNTT" data={listCntt || []} />
        <div className="mt-2" />
        {(listNghiepVu?.length || 0) > 0 && (
          <CardBoPhan title="Bộ phận nghiệp vụ " data={listNghiepVu || []} />
        )} */}
      </div>
    </div>
  );
};

export default CardMoreInfo;
