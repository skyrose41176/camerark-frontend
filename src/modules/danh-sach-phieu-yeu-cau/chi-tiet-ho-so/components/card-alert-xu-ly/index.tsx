import {Stack, Typography} from '@mui/material';
import {Box} from '@mui/system';
import {CloseCircle, Information, MinusCirlce, Slash, TickCircle} from 'iconsax-react';
import React from 'react';
import {TrangThaiXuLy} from 'src/constants';
import {LichSuThaoTac} from 'src/models';
import {colors} from 'src/theme';
interface Props {
  lichSuThaoTacs: LichSuThaoTac[];
}
const AlertXuLy = ({lichSuThaoTacs}: Props) => {
  return (
    <>
      {lichSuThaoTacs
        ?.filter(
          item =>
            item?.buoc !== TrangThaiXuLy.XU_LY &&
            item?.buoc !== TrangThaiXuLy.THEO_DOI &&
            item?.buoc !== TrangThaiXuLy.MOI_THAM_GIA &&
            item?.buoc !== TrangThaiXuLy.DIEU_PHOI
        )
        ?.map(item => (
          <React.Fragment key={item.id}>
            <Box
              style={{
                padding: 9,
                borderRadius: '4px',
                width: '100%',
                backgroundColor:
                  item?.buoc === TrangThaiXuLy.TU_CHOI ||
                  item?.buoc === TrangThaiXuLy.CAP_TREN_TU_CHOI
                    ? '#ffefef'
                    : item?.buoc === TrangThaiXuLy.CHAP_THUAN ||
                      item?.buoc === TrangThaiXuLy.CAP_TREN_DONG_Y
                    ? '#EDF7EE'
                    : item?.buoc === TrangThaiXuLy.DONG_PYC ||
                      item?.buoc === TrangThaiXuLy.THEO_DOI ||
                      item?.buoc === TrangThaiXuLy.CHO_CAP_TREN_DUYET
                    ? '#fff3d9'
                    : '#dfefff',
              }}
            >
              <Stack direction="row">
                {item?.buoc === TrangThaiXuLy.CHAP_THUAN ||
                item?.buoc === TrangThaiXuLy.CAP_TREN_DONG_Y ? (
                  <TickCircle color={colors.success} variant="Bulk" />
                ) : item?.buoc === TrangThaiXuLy.TU_CHOI ||
                  item?.buoc === TrangThaiXuLy.CAP_TREN_TU_CHOI ? (
                  <CloseCircle color={colors.error} variant="Bulk" />
                ) : item?.buoc === TrangThaiXuLy.DONG_PYC ? (
                  <Slash color={colors.warning} variant="Bulk" />
                ) : item?.buoc === TrangThaiXuLy.THEO_DOI ||
                  item?.buoc === TrangThaiXuLy.CHO_CAP_TREN_DUYET ? (
                  <MinusCirlce color={colors.warning} variant="Bulk" />
                ) : (
                  <Information color={colors.primary} variant="Bulk" />
                )}

                <Box className="mr-5" />
                <Typography color="#555555" fontSize={14} width="100%">
                  {item?.tenBuoc} - {item?.createdBy}
                  <pre style={{whiteSpace: 'pre-wrap'}}>{item?.noiDung ? item?.noiDung : ''}</pre>
                </Typography>
              </Stack>
            </Box>
            <Box className="mt-2" />
          </React.Fragment>
        ))}
    </>
  );
};
export default AlertXuLy;
