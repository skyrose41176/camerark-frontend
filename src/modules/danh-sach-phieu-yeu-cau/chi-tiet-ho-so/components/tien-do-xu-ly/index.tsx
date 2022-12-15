import {Stack, StepConnector, stepConnectorClasses, Typography} from '@mui/material';
import {Box} from '@mui/system';
import {CloseCircle, TickCircle, MinusCirlce} from 'iconsax-react';
import React, {FC, useCallback, useEffect, useState} from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import {BoPhanVaiTro, COLORS, TrangThaiChinh, TrangThaiPhu, TrangThaiXuLy} from 'src/constants';
import styled from '@emotion/styled';
import {NguoiXuLy, PhieuYeuCau} from 'src/models';
import {colors} from 'src/theme';
import {formatDatetimeHHmmDDMMYYYY} from 'src/utils/format';
interface Props {
  actionsButton?: React.ReactNode;
  phieuYeuCau?: PhieuYeuCau;
  dataNguoiXuLys?: NguoiXuLy[];
}

interface StepProps {
  id: number;
  name: string;
  step: string;
  time: string;
  status: 'success' | 'none' | 'error' | 'idle' | 'current' | string;
}
const TienDoXuly: FC<Props> = ({actionsButton, phieuYeuCau, dataNguoiXuLys}) => {
  const [step, setStep] = useState<StepProps[]>();
  const [activeStep, setActiveStep] = useState<number>();
  // const {width} = useWindowDimensions();
  // const [widthBox, setWidthBox] = useState<any>();
  // useEffect(() => {
  //   if (width === 1920) {
  //     setWidthBox(width / 9 + (width / 100) * 2);
  //   } else if (width > 1920) {
  //     let temp = width - 1920;
  //     let a = temp % 100;
  //     setWidthBox(width / 9 + (width / 100) * a);
  //   } else {
  //     setWidthBox(width / 9);
  //   }
  // }, [width]);

  useEffect(() => {
    const lichSuThaoTacs = phieuYeuCau?.lichSuThaoTacs;
    const lichSuKhoiTao = lichSuThaoTacs?.find(item => item?.vaiTro === BoPhanVaiTro.KHOI_TAO);
    const step1: StepProps = {
      id: 1,
      name: 'Bước 1',
      step: 'Tạo phiếu yêu cầu',
      time: formatDatetimeHHmmDDMMYYYY(lichSuKhoiTao?.created ?? ''),
      status: 'success',
    };

    const lichSuTdv = lichSuThaoTacs?.find(item => item?.vaiTro === BoPhanVaiTro.TDV);
    const step2: StepProps = {
      id: 2,
      name: 'Bước 2',
      step: 'Trưởng đơn vị',
      time: lichSuTdv?.created ? formatDatetimeHHmmDDMMYYYY(lichSuTdv?.created) : '',
      status:
        lichSuTdv?.buoc === TrangThaiXuLy.CHAP_THUAN
          ? 'success'
          : lichSuTdv?.buoc === TrangThaiXuLy.TU_CHOI
          ? 'error'
          : 'idle',
    };

    // ==== step trung gian ====
    let step3: StepProps | null = null;
    if (
      (dataNguoiXuLys?.filter(item => item?.vaiTroBoPhan === BoPhanVaiTro?.TRUNG_GIAN) || [])
        ?.length > 0
    ) {
      let lichSuTrungGian = lichSuThaoTacs?.find(
        item => item?.vaiTro === BoPhanVaiTro.TRUNG_GIAN && item?.buoc === TrangThaiXuLy?.TU_CHOI
      );
      let status = 'idle';
      if (lichSuTrungGian) status = 'error';
      else {
        const temp = lichSuThaoTacs?.filter(
          item =>
            item?.vaiTro === BoPhanVaiTro.TRUNG_GIAN && item?.buoc === TrangThaiXuLy?.CHAP_THUAN
        );
        const uniqueBoPhanId = [
          ...new Set(
            dataNguoiXuLys
              ?.filter(item => item?.vaiTroBoPhan === BoPhanVaiTro?.TRUNG_GIAN)
              ?.map(item => item?.boPhanXuLyId)
          ),
        ];

        if (temp?.length && temp?.length === uniqueBoPhanId.length) {
          const maxDate = Math.max.apply(
            null,
            temp?.map(item => Number(new Date(item?.created || '')))
          );
          lichSuTrungGian = temp?.find(item => Number(new Date(item?.created || '')) === maxDate);

          status = 'success';
        }
      }

      step3 = {
        id: 3,
        name: 'Bước 3',
        step: 'Bộ phận trung gian',
        time: lichSuTrungGian?.created ? formatDatetimeHHmmDDMMYYYY(lichSuTrungGian?.created) : '',
        status: status,
      };
    }
    // ==== end ====
    // ==== step cntt ====
    let lichSuCntt = lichSuThaoTacs?.find(
      item => item?.vaiTro === BoPhanVaiTro.CNTT && item?.buoc === TrangThaiXuLy.TU_CHOI
    );
    let statusCntt = 'idle';
    if (lichSuCntt) statusCntt = 'error';
    else {
      lichSuCntt = lichSuThaoTacs?.find(
        item =>
          item?.vaiTro === BoPhanVaiTro.CNTT &&
          (item?.buoc === TrangThaiXuLy.CHAP_THUAN || item?.buoc === TrangThaiXuLy.DIEU_PHOI)
      );
      if (lichSuCntt) statusCntt = 'success';
    }

    const step4: StepProps = {
      id: 4,
      name: 'Bước 4',
      step: 'Bộ phận CNTT',
      time: lichSuCntt?.created ? formatDatetimeHHmmDDMMYYYY(lichSuCntt?.created) : '',
      status: statusCntt,
    };
    // ==== end ====

    // ==== step Nghiệp vụ ====
    let step5: StepProps | null = null;
    if (
      (dataNguoiXuLys?.filter(item => item?.vaiTroBoPhan === BoPhanVaiTro?.NGHIEP_VU) || [])
        ?.length > 0
    ) {
      let lichSuNghiepVu = lichSuThaoTacs?.find(
        item => item?.vaiTro === BoPhanVaiTro.NGHIEP_VU && item?.buoc === TrangThaiXuLy.TU_CHOI
      );
      let statusNghiepVu = 'idle';
      if (lichSuNghiepVu) statusNghiepVu = 'error';
      else {
        const temp = lichSuThaoTacs?.filter(
          item =>
            item?.vaiTro === BoPhanVaiTro.NGHIEP_VU && item?.buoc === TrangThaiXuLy?.CHAP_THUAN
        );
        const uniqueBoPhanId = [
          ...new Set(
            dataNguoiXuLys
              ?.filter(item => item?.vaiTroBoPhan === BoPhanVaiTro?.NGHIEP_VU)
              ?.map(item => item?.boPhanXuLyId)
          ),
        ];

        if (temp?.length && temp?.length > 0 && temp?.length === uniqueBoPhanId.length) {
          const maxDate = Math.max.apply(
            null,
            temp?.map(item => Number(new Date(item?.created || '')))
          );
          lichSuNghiepVu = temp?.find(item => Number(new Date(item?.created || '')) === maxDate);
          statusNghiepVu = 'success';
        }
      }
      step5 = {
        id: 5,
        name: 'Bước 5',
        step: 'Bộ phận nghiệp vụ',
        time: lichSuNghiepVu?.created ? formatDatetimeHHmmDDMMYYYY(lichSuNghiepVu?.created) : '',
        status: statusNghiepVu,
      };
    }

    let temp: any[] = [step1, step2, step3, step4, step5].filter(item => item !== null);
    setStep(temp);
  }, [dataNguoiXuLys, phieuYeuCau?.lichSuThaoTacs]);

  const renderIcon = (item: StepProps) => {
    switch (item.status) {
      case 'success':
        return <TickCircle size={28} color={COLORS.success} variant="Bulk" />;
      case 'error':
        return <CloseCircle size={28} color={COLORS.error} variant="Bulk" />;
      case 'idle':
        return <div className="bg-[#d9d9d9] w-[28px] h-[28px] rounded-full" />;
      case 'none':
        return <MinusCirlce size={28} color={COLORS.warning} variant="Bulk" />;
      default:
        return null;
    }
  };

  const renderStatus = (item: StepProps, index: number) => {
    switch (item.status) {
      case 'success':
        return (
          <Typography color={COLORS.success} className="text-xs font-bold mb-1">
            Bước {index + 1}
          </Typography>
        );
      case 'error':
        return (
          <Typography color={COLORS.error} className="text-xs font-bold mb-1">
            Bước {index + 1}
          </Typography>
        );
      case 'idle':
        return '';
      case 'none':
        return (
          <Typography color={COLORS.warning} className="text-xs font-bold mb-1">
            Bước {index + 1}
          </Typography>
        );
      default:
        return null;
    }
  };

  const handleActiveStep = useCallback(() => {
    const temp = step?.map(item => {
      let index = 0;
      if (item?.status === 'success' || item?.status === 'error') index = item?.id;
      return index - 1;
    });
    setActiveStep(Math.max.apply(null, temp || []));
  }, [step]);

  useEffect(() => {
    handleActiveStep();
  }, [handleActiveStep]);

  const QontoConnector = styled(StepConnector)(({theme}) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 12,
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#42B814',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#42B814',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      // borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderTopWidth: 2,
      borderRadius: 1,
    },
  }));

  const renderTienDoXuLy = () => {
    let rs: {color: string; label: string} = {color: '', label: ''};
    if (
      phieuYeuCau?.trangThaiChinh === TrangThaiChinh.TIEP_NHAN &&
      phieuYeuCau?.trangThaiTdv === TrangThaiXuLy.TIEP_NHAN
    )
      rs = {color: colors.primary, label: 'Chờ TĐV duyệt'};
    if (phieuYeuCau?.trangThaiTdv === TrangThaiXuLy.TU_CHOI)
      rs = {color: colors.error, label: 'TĐV từ chối'};
    if (phieuYeuCau?.trangThaiChinh === TrangThaiChinh.BPTG_TIEP_NHAN)
      rs = {color: colors.primary, label: 'Chờ xử lý'};
    if (phieuYeuCau?.trangThaiChinh === TrangThaiChinh.BPTG_TU_CHOI)
      rs = {color: colors.error, label: 'BPTG từ chối'};
    if (phieuYeuCau?.trangThaiChinh === TrangThaiChinh.BPCNTT_TIEP_NHAN)
      rs = {color: colors.primary, label: 'Đang xử lý'};
    if (phieuYeuCau?.trangThaiChinh === TrangThaiChinh.BPCNTT_TU_CHOI)
      rs = {color: colors.error, label: 'Từ chối'};
    if (phieuYeuCau?.trangThaiChinh === TrangThaiChinh.HOAN_THANH)
      rs = {color: colors.success, label: 'Hoàn thành'};
    if (phieuYeuCau?.closed) rs = {color: colors.warning, label: 'Đã đóng'};

    return (
      <Typography color={rs.color} className="text-xs">
        {rs.label}
      </Typography>
    );
  };
  return (
    <div>
      <Stack direction={'row'} justifyContent="space-between">
        <Stack direction={'row'}>
          <Typography color={'#55555'} className="text-xs">
            Trạng thái:&nbsp;
          </Typography>
          {phieuYeuCau?.trangThaiPhu === TrangThaiPhu.OPEN ? (
            <Typography color={colors.success} className="text-xs">
              Open
            </Typography>
          ) : (
            <Typography color={colors.error} className="text-xs">
              Closed
            </Typography>
          )}
        </Stack>
        <Stack direction={'row'}>
          <Typography color={'#55555'} className="text-xs">
            Tiến độ xử lý:&nbsp;
          </Typography>
          {renderTienDoXuLy()}
        </Stack>
      </Stack>
      <Box className="mt-1" />
      <Box
        style={{
          border: '1px solid #D5D5D5',
          width: '100%',
          borderRadius: '4px',
          padding: '12px 8px 8px 8px',
        }}
      >
        <Stepper activeStep={activeStep} alternativeLabel connector={<QontoConnector />}>
          {step?.map((item, index) => {
            return (
              <Step key={item.id.toString()}>
                <StepLabel StepIconComponent={() => renderIcon(item)}>
                  <div>{renderStatus(item, index)}</div>
                  <Typography className="text-xs mb-1">{item?.step}</Typography>
                  <Typography className="text-xs">{item.time}</Typography>
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>

      {actionsButton && (
        <div className="border border-[#eee] border-solid rounded-[4px] flex justify-center p-2 txtUppercase mt-2">
          {actionsButton}
        </div>
      )}
    </div>
  );
};
export default TienDoXuly;
