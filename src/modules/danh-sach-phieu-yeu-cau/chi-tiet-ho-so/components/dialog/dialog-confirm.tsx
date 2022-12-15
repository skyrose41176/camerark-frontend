import {DialogContentText, Typography} from '@mui/material';
import {UseFormReturn} from 'react-hook-form';
import {DialogBase} from 'src/components/base';
import {TextAreaField} from 'src/components/hook-form/fields';

interface Props {
  open: boolean;
  required?: boolean;
  form: UseFormReturn<any>;
  onClose?: () => void;
  onSubmit?: () => void;
  title: string;
  label: string;
  content: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const DialogConfirmCustom = ({
  open,
  required = false,
  form,
  title,
  label,
  content,
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
      loading={isSubmitting}
      color="success"
      maxWidth={maxWidth}
    >
      <DialogContentText className="text-center">
        <Typography
          variant="caption"
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </DialogContentText>
      <TextAreaField
        label={label}
        name="noiDung"
        form={form}
        rules={{
          required: {
            value: required,
            message: 'Vui lòng nhập nội dung',
          },
        }}
      />
    </DialogBase>
  );
};

export default DialogConfirmCustom;
