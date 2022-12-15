import {UseFormReturn} from 'react-hook-form';
import {useParams} from 'react-router-dom';
import {DialogBase} from 'src/components/base';
import BoPhanField from 'src/components/hook-form/bo-phan-field';
import {InputField} from 'src/components/hook-form/fields';
import {PathParams} from 'src/models/common';

interface Props {
  open: boolean;
  form: UseFormReturn<any>;
  onClose?: () => void;
  onSubmit?: () => void;
  title: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const DialogMoiThemBoPhan = ({open, form, title, onClose, onSubmit, maxWidth = 'sm'}: Props) => {
  const {
    formState: {isSubmitting},
  } = form;
  const {idHoSo} = useParams<PathParams>();

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
      <BoPhanField
        multiple
        phieuYeuCauId={idHoSo}
        label="Mời thêm bộ phận"
        form={form}
        rules={{
          required: {
            value: true,
            message: 'Chưa chọn bộ phận',
          },
        }}
      />
      <InputField form={form} className="mt-2" name="xuLy" label="Ghi chú" multiline minRows={3} />
    </DialogBase>
  );
};

export default DialogMoiThemBoPhan;
