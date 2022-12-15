import {List, Typography} from '@mui/material';
import {CardBase, InfoUserItem} from 'src/components/base';
import {TrangThaiXuLy} from 'src/constants';
import {convertAction} from '../card-thong-tin-them';

interface Props {
  data: {
    trangThai: number;
    chucVu: string;
    email: string;
    ten: string;
    sdt: string;
    donVi: string;
  }[];
  title: string;
}
const CardBoPhan = ({data, title}: Props) => {
  return (
    <CardBase headerShow title={title}>
      <List className="scroll-list">
        {data?.filter(
          item =>
            item?.trangThai === TrangThaiXuLy.XU_LY ||
            item?.trangThai === TrangThaiXuLy.CHAP_THUAN ||
            item?.trangThai === TrangThaiXuLy.CAP_TREN_XU_LY ||
            item?.trangThai === TrangThaiXuLy.CAP_TREN_DONG_Y ||
            item?.trangThai === TrangThaiXuLy.CAP_TREN_TU_CHOI ||
            item?.trangThai === TrangThaiXuLy.TU_CHOI
        )?.length > 0 && (
          <>
            <Typography variant="h6" className="text-primary box-title box-title-bg">
              Nhân sự xử lý
            </Typography>
          </>
        )}
        {data?.filter(item => item?.trangThai === TrangThaiXuLy.DIEU_PHOI)?.length > 0 && (
          <>
            <Typography variant="h6" className="text-primary box-title box-title-bg">
              Nhân sự điều phối
            </Typography>
          </>
        )}
        {data
          ?.filter(item => item?.trangThai === TrangThaiXuLy.DIEU_PHOI)
          ?.map(item => (
            <InfoUserItem
              item={{
                chucDanh: item?.chucVu,
                email: item?.email,
                name: item?.ten,
                donVi: item?.donVi,
                sdt: item?.sdt,
              }}
              secondaryAction={convertAction(item?.trangThai) ?? {}}
            />
          ))}

        {data
          ?.filter(
            item =>
              item?.trangThai === TrangThaiXuLy.XU_LY ||
              item?.trangThai === TrangThaiXuLy.CHAP_THUAN ||
              item?.trangThai === TrangThaiXuLy.CAP_TREN_XU_LY ||
              item?.trangThai === TrangThaiXuLy.CAP_TREN_DONG_Y ||
              item?.trangThai === TrangThaiXuLy.CAP_TREN_TU_CHOI ||
              item?.trangThai === TrangThaiXuLy.TU_CHOI
          )
          ?.map(item => (
            <InfoUserItem
              item={{
                chucDanh: item?.chucVu,
                email: item?.email,
                name: item?.ten,
                donVi: item?.donVi,
                sdt: item?.sdt,
              }}
              secondaryAction={convertAction(item?.trangThai) ?? {}}
            />
          ))}
        {data?.filter(
          item =>
            item?.trangThai === TrangThaiXuLy.TIEP_NHAN ||
            item?.trangThai === TrangThaiXuLy.THEO_DOI
        )?.length > 0 && (
          <>
            <Typography variant="h6" className="text-primary box-title box-title-bg">
              Nhân sự theo dõi
            </Typography>
          </>
        )}
        {data
          ?.filter(
            item =>
              item?.trangThai === TrangThaiXuLy.TIEP_NHAN ||
              item?.trangThai === TrangThaiXuLy.THEO_DOI
          )
          ?.map(item => (
            <InfoUserItem
              item={{
                chucDanh: item?.chucVu,
                email: item?.email,
                name: item?.ten,
                donVi: item?.donVi,
                sdt: item?.sdt,
              }}
              secondaryAction={convertAction(item?.trangThai) ?? {}}
            />
          ))}
      </List>
    </CardBase>
  );
};
export default CardBoPhan;
