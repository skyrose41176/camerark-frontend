import {Box} from '@mui/system';
import {UseFormReturn} from 'react-hook-form';
import {DialogBase} from 'src/components/base';
import {TextAreaField} from 'src/components/hook-form/fields';
import NhanSuField from 'src/components/hook-form/nhan-su-field';

interface Props {
  open: boolean;
  form: UseFormReturn<any>;
  onClose?: () => void;
  onSubmit?: () => void;
  title: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  phieuYeuCauId?: string | number;
}

const DialogMoiThemNguoiPheDuyet = ({
  open,
  form,
  title,
  onClose,
  onSubmit,
  maxWidth = 'sm',
  phieuYeuCauId,
}: Props) => {
  const {
    formState: {isSubmitting},
  } = form;

  return (
    <DialogBase
      title={title}
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      textAccept="Xác nhận"
      color="success"
      maxWidth={maxWidth}
      loading={isSubmitting}
    >
      <Box className="mt-2" />
      <NhanSuField
        phieuYeuCauId={phieuYeuCauId}
        form={form}
        name="nhanSuId"
        label="Mời người phê duyệt"
        rules={{
          required: {
            value: true,
            message: 'Chưa chọn người phê duyệt',
          },
        }}
      />
      <Box className="mt-2" />
      <TextAreaField label="Ghi chú" name="noiDung" form={form} />
    </DialogBase>
  );
};

export default DialogMoiThemNguoiPheDuyet;
