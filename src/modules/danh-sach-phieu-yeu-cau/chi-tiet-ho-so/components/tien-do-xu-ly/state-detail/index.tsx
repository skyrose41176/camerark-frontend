import {Divider, Stack, Typography} from '@mui/material';
import {CloseCircle, HierarchySquare2, MinusCirlce, TickCircle} from 'iconsax-react';
import DinhKemItem, {
  ItemFileProp,
} from 'src/components/hook-form/fields/dinh-kem-field/dinh-kem-item';

import {COLORS, TrangThaiXuLy} from 'src/constants';
import {LichSuThaoTac} from 'src/models';
interface Props {
  data?: LichSuThaoTac;
  state?: any;
}

const StateDetail = ({data, state}: Props) => {
  return (
    <div className="p-4 item-result">
      <Stack direction="row" justifyContent={'space-between'}>
        <Typography
          style={{
            fontSize: 12,
            fontWeight: 'bold',
          }}
          color={COLORS.primary}
        >
          {(state === TrangThaiXuLy.DIEU_PHOI ||
            state === TrangThaiXuLy.THEO_DOI ||
            state === TrangThaiXuLy.MOI_THAM_GIA) && (
            <>
              {data?.noiDung}
              <br />
            </>
          )}
          {data?.tenNhanSu} - {data?.tenDonVi}{' '}
          {state === TrangThaiXuLy.CHO_CAP_TREN_DUYET ? data?.noiDung : ''}
        </Typography>
        <Stack direction={'row'}>
          {state === TrangThaiXuLy.CHAP_THUAN || state === TrangThaiXuLy.CAP_TREN_DONG_Y ? (
            <TickCircle size={18} variant="Bold" color={COLORS.success} />
          ) : state === TrangThaiXuLy.TU_CHOI || state === TrangThaiXuLy.CAP_TREN_TU_CHOI ? (
            <CloseCircle size={18} variant="Bold" color={COLORS.error} />
          ) : state === TrangThaiXuLy.DIEU_PHOI ? (
            <HierarchySquare2 size={18} variant="Bold" color={COLORS.primary} />
          ) : (
            <MinusCirlce size={18} variant="Bold" color={COLORS.warning} />
          )}

          <Typography
            className="border-0 ml-2"
            style={{
              fontSize: 12,
              fontWeight: 'bold',
            }}
            color={
              state === TrangThaiXuLy.CHAP_THUAN || state === TrangThaiXuLy.CAP_TREN_DONG_Y
                ? COLORS.success
                : state === TrangThaiXuLy.TU_CHOI || state === TrangThaiXuLy.CAP_TREN_TU_CHOI
                ? COLORS.error
                : state === TrangThaiXuLy.DIEU_PHOI
                ? COLORS.primary
                : COLORS.warning
            }
          >
            {state === TrangThaiXuLy.CHAP_THUAN || state === TrangThaiXuLy.CAP_TREN_DONG_Y
              ? 'Đồng ý'
              : state === TrangThaiXuLy.TU_CHOI || state === TrangThaiXuLy.CAP_TREN_TU_CHOI
              ? 'Từ chối'
              : state === TrangThaiXuLy.DIEU_PHOI
              ? 'Điều phối'
              : state === TrangThaiXuLy.THEO_DOI
              ? 'Chuyển tiếp'
              : state === TrangThaiXuLy.MOI_THAM_GIA
              ? 'Mời tham gia'
              : 'Mời phê duyệt'}
          </Typography>
        </Stack>
      </Stack>
      <div className="mb-2" />
      <Stack>
        <div>
          <Typography
            style={{
              fontSize: 12,
            }}
            color={'#555555'}
          >
            Nội dung xử lý:
          </Typography>
          <Typography
            style={{
              fontSize: 12,
            }}
          >
            <pre style={{whiteSpace: 'pre-wrap'}}>{data?.xuLy}</pre>
          </Typography>
        </div>
        {(data?.dinhKemKetQuas?.length || []) > 0 && <Divider className="my-2" />}
        <Stack direction={'column'}>
          {data?.dinhKemKetQuas?.map(item => (
            <DinhKemItem item={item as ItemFileProp} />
          ))}
        </Stack>
      </Stack>
      {/* <DinhKemField name="dinhKemPhai" form={form}  /> */}
    </div>
  );
};

export default StateDetail;
