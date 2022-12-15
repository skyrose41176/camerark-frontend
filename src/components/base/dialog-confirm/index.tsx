import {Divider, Stack, Typography} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';
import React, {FC} from 'react';
import ButtonBase from '../button-base';
import LoadingOverlay from '../loading-overlay';
import IconButtonBase from '../icon-button-base';
import {CloseCircle} from 'iconsax-react';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  open: boolean;
  title: string;
  content: React.ReactNode;
  loading?: boolean;
  onClose?: () => void;
  onAgree?: () => void;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  onCloseText?: string;
  onAgreeText?: string;
  className?: string;
}
const DialogConfirm: FC<Props> = ({
  open,
  title,
  loading = false,
  content,
  onClose = () => {},
  onAgree = () => {},
  maxWidth = 'sm',
  onCloseText = 'TỪ CHỐI',
  onAgreeText = 'ĐỒNG Ý',
  className = '',
}) => {
  return (
    <Dialog
      maxWidth={maxWidth}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      className={className}
      sx={{zIndex: 1302}}
    >
      <div className="flex justify-between items-center pl-4 pb-0 dialog-header">
        <Typography variant="subtitle2">{title}</Typography>
        <IconButtonBase
          iconSize="medium"
          iconName={CloseCircle}
          color="error"
          rounded
          onClick={onClose}
        />
      </div>
      <Divider />
      <DialogContent>
        <DialogContentText className="text-center">{content}</DialogContentText>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Stack direction="row" justifyContent="center">
          <ButtonBase
            variant="outlined"
            color="error"
            onClick={onClose}
            sx={{minWidth: 150}}
            label={onCloseText}
          />
          <div style={{width: 16}} />
          <ButtonBase
            onClick={onAgree}
            variant="contained"
            color="success"
            sx={{minWidth: 150}}
            label={onAgreeText}
          />
        </Stack>
      </DialogActions>
      <LoadingOverlay open={loading} />
    </Dialog>
  );
};

export default DialogConfirm;
