import {Stack} from '@mui/material';
import {createContext, useState} from 'react';
import {ButtonBase} from 'src/components/base';
import {PageWrapper} from 'src/components/wrapper';
import Header from '../../layouts/Header';
import './index.css';
import TableProduct from './table-kho-hang';
import DialogProduct from './table-kho-hang/dialog';

const DanhSachKhoHangPage = () => {
  const [dialogCreatePYC, setDialogCreatePYC] = useState({open: false});
  return (
    <div>
      <Header
        title="Danh sách kho sản phẩm"
        actions={
          <Stack className="txtUppercase">
            <ButtonBase
              variant="outlined"
              color="success"
              label="Thêm sản phẩm vào kho"
              onClick={() => setDialogCreatePYC({open: true})}
            />
          </Stack>
        }
      />
      <PageWrapper>
        <TableProduct />
      </PageWrapper>

      {dialogCreatePYC?.open && (
        <DialogProduct
          open={dialogCreatePYC.open}
          onClose={() => setDialogCreatePYC({open: false})}
        />
      )}
    </div>
  );
};

export default DanhSachKhoHangPage;
