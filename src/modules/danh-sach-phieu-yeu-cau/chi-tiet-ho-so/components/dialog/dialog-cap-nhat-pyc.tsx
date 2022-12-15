import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useParams} from 'react-router-dom';
import {useGetByPhieuYeuCauId, useUpdatePhieuYeuCau} from 'src/apis';
import {DialogBase} from 'src/components/base';
import {InputField, RadioGroupField} from 'src/components/hook-form/fields';
import LoaiNghiepVuField from 'src/components/hook-form/loai-nghiep-vu-field';
import LoaiYeuCauField from 'src/components/hook-form/loai-yeu-cau-field';
import {BoPhanVaiTro} from 'src/constants';
import FieldLayout from 'src/layouts/FieldLayout';
import {PhieuYeuCau} from 'src/models';
import {PathParams} from 'src/models/common';

interface FormPhieuYeuCau {
  loaiNghiepVuId: {label: string; value: number} | null;
  loaiYeuCauId: {label: string; value: number} | null;
  uuTien: string;
  moTa: string;
}
const DialogUpdatePyc = ({
  open,
  onClose,
  data,
}: {
  open: boolean;
  onClose: () => void;
  data?: PhieuYeuCau;
}) => {
  const form = useForm<FormPhieuYeuCau>({
    defaultValues: {
      loaiNghiepVuId: null,
      loaiYeuCauId: null,
      uuTien: 'Thấp',
      moTa: '',
    },
  });
  const {
    handleSubmit,
    reset,
    formState: {isSubmitting},
  } = form;

  const mutationUpdate = useUpdatePhieuYeuCau(() => {
    onClose();
    reset();
  });

  const {idHoSo} = useParams<PathParams>();
  const {data: dataNguoiXuLys} = useGetByPhieuYeuCauId(Number(idHoSo));

  const onSubmit = async (dataForm: FormPhieuYeuCau) => {
    await mutationUpdate.mutateAsync({
      ...dataForm,
      loaiYeuCauId: dataForm?.loaiYeuCauId?.value,
      id: data?.id,
    });
  };

  const nguoiTrungGians = dataNguoiXuLys?.data?.filter(
    item => item.vaiTroBoPhan === BoPhanVaiTro.TRUNG_GIAN
  );

  useEffect(() => {
    reset({
      loaiNghiepVuId: {
        label: data?.loaiYeuCau?.loaiNghiepVu?.ten,
        value: data?.loaiYeuCau?.loaiNghiepVuId,
      },
      loaiYeuCauId: {
        label: data?.loaiYeuCau?.ten,
        value: data?.loaiYeuCauId,
      },
      uuTien: data?.uuTien,
      moTa: data?.moTa,
    });
  }, [
    data?.loaiYeuCau?.loaiNghiepVu?.ten,
    data?.loaiYeuCau?.loaiNghiepVuId,
    data?.loaiYeuCau?.ten,
    data?.loaiYeuCauId,
    data?.moTa,
    data?.uuTien,
    reset,
  ]);
  return (
    <DialogBase
      open={open}
      title="CẬP NHẬT PHIẾU YÊU CẦU"
      textCancel="Thoát"
      textAccept="Cập nhật"
      maxWidth="sm"
      loading={isSubmitting}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FieldLayout xs={12} md={12} lg={12} xl={12}>
        <LoaiNghiepVuField
          form={form}
          required
          disabled={(nguoiTrungGians?.length || 0) > 0}
          valueTypeSelectObject
        />
        <LoaiYeuCauField
          form={form}
          required
          disabled={(nguoiTrungGians?.length || 0) > 0}
          valueTypeSelectObject
        />
        <FieldLayout xs={12} md={12} lg={12} xl={12} className="box-fieldset-full">
          <RadioGroupField
            xs={4}
            md={4}
            lg={4}
            xl={4}
            items={[
              {
                value: 'Thấp',
                label: 'Thấp',
              },
              {
                value: 'Trung bình',
                label: 'Trung bình',
              },
              {
                value: 'Cao',
                label: 'Cao',
              },
            ]}
            form={form}
            name="uuTien"
            label="Mức độ ưu tiên"
            rules={{
              required: {
                value: true,
                message: ' Vui lòng chọn mức độ ưu tiên',
              },
            }}
          />
        </FieldLayout>
        <InputField
          disabled
          form={form}
          name="moTa"
          label="Mô tả chi tiết"
          multiline
          minRows={4}
          maxRows={10}
        />
        {/* <DinhKemField form={form} label="Tài liệu đính kèm" name="dinhKems" /> */}
      </FieldLayout>
    </DialogBase>
  );
};

export default DialogUpdatePyc;
