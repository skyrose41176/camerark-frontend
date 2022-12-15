import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {DialogBase} from 'src/components/base';
import {DinhKemField, InputField, RadioGroupField} from 'src/components/hook-form/fields';
import LoaiNghiepVuField from 'src/components/hook-form/loai-nghiep-vu-field';
import LoaiYeuCauField from 'src/components/hook-form/loai-yeu-cau-field';
import FieldLayout from 'src/layouts/FieldLayout';
import DialogXemTruoc from './xem-truoc';

interface Props {
  open: boolean;
  onClose: () => void;
}

export interface FormTaoPhieuYeuCau {
  loaiNghiepVuId: {label: string; value: number} | null;
  loaiYeuCauId: {label: string; value: number} | null;
  uuTien: string;
  moTa?: string;
  tdvId: any;
  nhanSuId?: any;
  taiLieuDinhKem: [];
  dinhKems: [];
}
const DialogTaoPhieuYeuCau = ({open, onClose}: Props) => {
  const [showDialogXemTruoc, setShowDialogXemTruoc] = useState({open: false});
  const form = useForm<FormTaoPhieuYeuCau>({
    defaultValues: {
      loaiNghiepVuId: null,
      loaiYeuCauId: null,
      uuTien: 'Thấp',
      moTa: '',
      tdvId: null,
      nhanSuId: undefined,
      taiLieuDinhKem: [],
    },
  });
  const {handleSubmit} = form;
  const onSubmit = (data: any) => {
    setShowDialogXemTruoc({open: true});
  };
  return (
    <>
      <DialogBase
        open={open}
        title="PHIẾU YÊU CẦU"
        textCancel="Thoát"
        textAccept="Tiếp tục"
        maxWidth="md"
        // loading={mutationDelete.isLoading}
        onClose={onClose}
        onSubmit={handleSubmit(onSubmit)}
      >
        <FieldLayout xs={12} md={12} lg={12} xl={12}>
          <LoaiNghiepVuField form={form} required valueTypeSelectObject />
          <LoaiYeuCauField form={form} required valueTypeSelectObject />
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
            form={form}
            name="moTa"
            label="Mô tả chi tiết"
            multiline
            minRows={4}
            maxRows={10}
          />
          <DinhKemField form={form} label="Tài liệu đính kèm" name="dinhKems" />
        </FieldLayout>
      </DialogBase>
      {showDialogXemTruoc?.open && (
        <DialogXemTruoc
          open={showDialogXemTruoc?.open}
          form={form}
          onClose={() => {
            setShowDialogXemTruoc({open: false});
          }}
          onCloseTaoPhieuYeuCau={onClose}
        />
      )}
    </>
  );
};
export default DialogTaoPhieuYeuCau;
