import {Box} from '@mui/system';
import {UseFormReturn} from 'react-hook-form';
import {DialogBase} from 'src/components/base';
import BoPhanField from 'src/components/hook-form/bo-phan-field';
import {RadioGroupField, TextAreaField} from 'src/components/hook-form/fields';
import NhanSuBoPhanField from 'src/components/hook-form/nhan-su-bo-phan-field';
import FieldLayout from 'src/layouts/FieldLayout';

interface Props {
  open: boolean;
  form: UseFormReturn<any>;
  onClose?: () => void;
  onSubmit?: () => void;
  title: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const DialogMoiThem = ({open, form, title, onClose, onSubmit, maxWidth = 'sm'}: Props) => {
  const {
    watch,
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
      <FieldLayout md={12} lg={12} xl={12} className="box-fieldset-full">
        <RadioGroupField
          form={form}
          label=""
          name="radio"
          xs={6}
          md={6}
          lg={6}
          xl={6}
          items={[
            {label: 'Bộ phận xử lý', value: 1},
            {label: 'Người phê duyệt', value: 2},
          ]}
        />
      </FieldLayout>
      {Number(watch('radio')) === 1 && (
        <BoPhanField
          multiple
          label="Mời thêm bộ phận"
          form={form}
          rules={{
            required: {
              value: true,
              message: 'Chưa chọn bộ phận',
            },
          }}
        />
      )}
      {Number(watch('radio')) === 2 && (
        <>
          <Box className="mt-2" />
          <NhanSuBoPhanField
            form={form}
            label="Chuyển cho người phê duyệt"
            rules={{
              required: {
                value: true,
                message: 'Chưa chọn người phê duyệt',
              },
            }}
          />
          <Box className="mt-2" />
          <TextAreaField label="Ghi chú" name="noiDung" form={form} />
        </>
      )}
    </DialogBase>
  );
};

export default DialogMoiThem;
