import {Stack} from '@mui/material';
import {createContext, useState} from 'react';
import {ButtonBase} from 'src/components/base';
import {PageWrapper} from 'src/components/wrapper';
import Header from '../../layouts/Header';
import './index.css';
import TableUser from './table-nguoi-dung';
import DialogUser from './table-nguoi-dung/dialog';

const DanhSachUserPage = () => {
  const [dialogCreatePYC, setDialogCreatePYC] = useState({open: false});
  return (
    <div>
      <Header
        title="Danh sách người dùng"
        actions={
          <Stack className="txtUppercase">
            <ButtonBase
              variant="outlined"
              color="success"
              label="Tạo người dùng"
              onClick={() => setDialogCreatePYC({open: true})}
            />
          </Stack>
        }
      />
      <PageWrapper>
        <TableUser />
      </PageWrapper>

      {dialogCreatePYC?.open && (
        <DialogUser open={dialogCreatePYC.open} onClose={() => setDialogCreatePYC({open: false})} />
      )}
    </div>
  );
};

export default DanhSachUserPage;
