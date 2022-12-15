import {
  Breakpoint,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  Divider,
  Typography,
} from '@mui/material';
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';
import {CloseCircle, DocumentDownload} from 'iconsax-react';
import React, {FC} from 'react';
import {Color} from 'src/components/types';
import ButtonBase from '../button-base';
import IconButtonBase from '../icon-button-base';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props extends DialogProps {
  open: boolean;
  title: string;
  children?: React.ReactNode;
  onClose?: () => void;
  onSubmit?: () => void;
  onDownload?: () => void;
  isSubmitting?: boolean;
  textAccept?: string;
  textCancel?: string;
  maxWidth?: false | Breakpoint;
  hiddenAcceptButton?: boolean;
  className?: string;
  loading?: boolean;
  color?: Color;
  changeTdv?: boolean;
  onChangeTdv?: () => void;
}
export interface DialogBaseProps extends Props {}

const DialogBase: FC<Props> = ({
  open,
  title,
  children,
  onClose,
  onSubmit,
  onDownload,
  isSubmitting = false,
  textCancel = 'Thoát',
  textAccept = 'Xác nhận',
  maxWidth = 'xs',
  className = '',
  hiddenAcceptButton = false,
  loading = false,
  color = 'success',
  changeTdv,
  onChangeTdv,
  ...rest
}) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      fullWidth
      maxWidth={maxWidth}
      className={className}
      {...rest}
      onClick={e => {
        e.stopPropagation();
      }}
    >
      <div className="flex justify-between items-center pl-4 pb-0 dialog-header">
        <Typography variant="subtitle2">{title}</Typography>
        {onDownload && (
          <IconButtonBase
            className="mr-2"
            iconSize="medium"
            iconName={DocumentDownload}
            color="primary"
            rounded
            onClick={onDownload}
          />
        )}
        <IconButtonBase
          className="mr-2"
          iconSize="medium"
          iconName={CloseCircle}
          color="error"
          rounded
          onClick={onClose}
        />
      </div>
      <Divider />
      <DialogContent>{children}</DialogContent>
      <Divider />
      <DialogActions className="txtUppercase">
        <div className="flex justify-end">
          <ButtonBase label={textCancel} variant="outlined" color="inherit" onClick={onClose} />
          {changeTdv && (
            <>
              <div style={{width: 16}} />
              <ButtonBase
                label="Thay đổi TĐV"
                variant="outlined"
                color="primary"
                onClick={onChangeTdv}
              />
            </>
          )}
          <div style={{width: 16}} />
          {!hiddenAcceptButton && (
            <ButtonBase
              label={textAccept}
              variant="contained"
              color={color}
              onClick={onSubmit}
              loading={loading}
            />
          )}
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default DialogBase;
