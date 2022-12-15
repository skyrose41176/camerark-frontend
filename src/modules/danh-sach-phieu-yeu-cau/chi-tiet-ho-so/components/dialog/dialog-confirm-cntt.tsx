import {Box} from '@mui/system';
import {UseFormReturn} from 'react-hook-form';
import {DialogBase} from 'src/components/base';
import {DinhKemField, TextAreaField} from 'src/components/hook-form/fields';

interface Props {
  open: boolean;
  required?: boolean;
  form: UseFormReturn<any>;
  onClose?: () => void;
  onSubmit?: () => void;
  title: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const DialogConfirmCntt = ({
  open,
  required = false,
  form,
  title,
  onClose,
  onSubmit,
  maxWidth = 'sm',
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
      <TextAreaField
        label="Nội dung ý kiến (Sẽ được hiển thị trên thông báo trạng thái)"
        name="noiDung"
        form={form}
        rules={{
          required: {
            value: required,
            message: 'Chưa nhập nội dung ý kiến',
          },
        }}
      />
      <Box className="mt-4" />
      <TextAreaField label="Nội dung xử lý (Chỉ hiển thị ở phần xử lý)" name="xuLy" form={form} />
      <Box className="mt-2" />
      <DinhKemField form={form} label="Tài liệu đính kèm" name="dinhKemKetQuas" />
    </DialogBase>
  );
};

export default DialogConfirmCntt;
