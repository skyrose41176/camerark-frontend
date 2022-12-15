import {Container, Stack, Typography} from '@mui/material';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import {ButtonBase} from '../base';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center h-screen text-error font-bold bg-white">
      <Container maxWidth="md">
        <Typography align="center" color="textPrimary" variant="h3">
          404: Không tìm thấy trang
        </Typography>
        <Typography align="center" color="textPrimary" variant="subtitle2">
          Không tìm thấy trang bạn đang tìm kiếm
        </Typography>

        <Stack
          sx={{
            mt: 2,
          }}
          alignItems="center"
        >
          <ButtonBase
            variant="contained"
            color="primary"
            label="Quay lại trang chủ"
            onClick={() => {
              navigate('/');
            }}
          />
        </Stack>
      </Container>
    </div>
  );
};

export default NotFound;
