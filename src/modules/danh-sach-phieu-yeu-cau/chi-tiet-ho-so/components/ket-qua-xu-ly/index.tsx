import {Box, Card, Divider, Stack, Typography} from '@mui/material';
import moment from 'moment';
import {FC} from 'react';
import {BoPhanVaiTro, COLORS, TrangThaiXuLy} from 'src/constants';
import {LichSuThaoTac} from 'src/models';
import {getTimeFromMins} from 'src/utils/format';
import StateDetail from '../tien-do-xu-ly/state-detail';
interface Props {
  closed?: number;
  lichSuThaoTacs?: LichSuThaoTac[];
}

const KetQuaXuLy: FC<Props> = ({closed, lichSuThaoTacs}) => {
  const data = lichSuThaoTacs?.filter(
    item =>
      (item?.vaiTro === BoPhanVaiTro.CNTT || item?.vaiTro === BoPhanVaiTro.NGHIEP_VU) &&
      (item?.buoc === TrangThaiXuLy.CHAP_THUAN ||
        item?.buoc === TrangThaiXuLy.DIEU_PHOI ||
        item?.buoc === TrangThaiXuLy.THEO_DOI ||
        item?.buoc === TrangThaiXuLy.MOI_THAM_GIA ||
        item?.buoc === TrangThaiXuLy.CHO_CAP_TREN_DUYET ||
        item?.buoc === TrangThaiXuLy.CAP_TREN_DONG_Y ||
        item?.buoc === TrangThaiXuLy.TU_CHOI ||
        item?.buoc === TrangThaiXuLy.CAP_TREN_TU_CHOI)
  );

  const endDate = new Date(lichSuThaoTacs?.sort((a, b) => b.id - a.id)?.[0]?.created || '');
  const startDate = new Date(lichSuThaoTacs?.sort((a, b) => a.id - b.id)?.[0]?.created || '');

  return (
    <Card
      className={' rounded-[4px] shadow-none overflow-aut'}
      elevation={3}
      style={{backgroundColor: '#1f82eb22'}}
      //   sx={{maxHeight, height}}
      // variant="outlined"
    >
      <div className="sticky top-0 z-10">
        <Stack
          sx={{padding: '8px 16px'}}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          textAlign={'center'}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row">
              <Typography
                flex={1}
                className="border-0  box-title"
                style={{
                  fontSize: 14,
                }}
                variant="h3"
                color={COLORS.primary}
              >
                KẾT QUẢ XỬ LÝ
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row">
            <Stack direction="column" className={`mr-3 ${!closed && 'mt-3'}`}>
              <Typography
                style={{
                  fontSize: 12,
                }}
                color={'#555555'}
              >
                Ngày bắt đầu: {moment(startDate).format('HH:mm - DD/MM/YYYY')}
              </Typography>
              {!!closed && (
                <Typography
                  style={{
                    fontSize: 12,
                  }}
                  color={'#555555'}
                >
                  Ngày kết thúc: {moment(endDate).format('HH:mm - DD/MM/YYYY')}
                </Typography>
              )}
            </Stack>
            <Divider orientation="vertical" flexItem />
            <Typography
              flex={1}
              className="border-0  box-title ml-3"
              style={{
                fontSize: 14,
              }}
              variant="h3"
              color={COLORS.primary}
            >
              {!!closed
                ? getTimeFromMins((endDate.getTime() - startDate.getTime()) / 1000 / 60)
                : 'Đang xử lý'}
            </Typography>
          </Stack>
        </Stack>
        <Box>
          <Divider />
        </Box>
      </div>

      <div className={`p-2`}>
        {data
          ?.filter(item => item?.xuLy || item?.dinhKemKetQuas?.length > 0)
          ?.map(item => (
            <StateDetail state={item?.buoc} data={item} />
          ))}
      </div>
    </Card>
  );
};
export default KetQuaXuLy;
