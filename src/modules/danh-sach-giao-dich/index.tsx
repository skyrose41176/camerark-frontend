import {Stack} from '@mui/material';
import {createContext, useState} from 'react';
import {ButtonBase} from 'src/components/base';
import {PageWrapper} from 'src/components/wrapper';
import Header from '../../layouts/Header';
import './index.css';
import TableTransaction from './table-giao-dich';
import DialogTransaction from './table-giao-dich/dialog';

export const TransactionContext = createContext<string>('');

const DanhSachGiaoDichPage = () => {
  const [dialogCreatePYC, setDialogCreatePYC] = useState({open: false});
  return (
    <div>
      <Header
        title="Danh sách giao dịch"
        actions={
          <Stack className="txtUppercase">
            <ButtonBase
              variant="outlined"
              color="success"
              label="Tạo giao dịch"
              onClick={() => setDialogCreatePYC({open: true})}
            />
          </Stack>
        }
      />
      <PageWrapper>
        <TableTransaction />
      </PageWrapper>

      {dialogCreatePYC?.open && (
        <DialogTransaction
          open={dialogCreatePYC.open}
          onClose={() => setDialogCreatePYC({open: false})}
        />
      )}
    </div>
  );
};

export default DanhSachGiaoDichPage;
