import {Refresh} from '@mui/icons-material';
import {IconButton} from '@mui/material';
import React, {useState} from 'react';
import DialogConfirm from '../dialog-confirm';

interface RefreshButtonProps {
  refreshData: any;
}
const RefreshButton = ({refreshData}: RefreshButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton
        sx={{
          position: 'absolute',
          top: '0',
          left: '12px',
          zIndex: 181,
        }}
        color="primary"
        size="small"
        onClick={() => {
          setOpen(true);
        }}
      >
        <Refresh
          sx={{
            fontSize: '1.025rem',
          }}
          fontSize="small"
        />
      </IconButton>
      <DialogConfirm
        content="Sau khi làm mới dữ liệu, tất cả dữ liệu sẽ bị xóa và không thể phục hồi lại."
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        onAgree={() => {
          setOpen(false);
          refreshData();
        }}
        title="Bạn có chắc chắn muốn làm mới dữ liệu? "
      />
    </>
  );
};

export default RefreshButton;
