import {Stack} from '@mui/material';
import {createContext, useState} from 'react';
import {ButtonBase} from 'src/components/base';
import {PageWrapper} from 'src/components/wrapper';
import Header from '../../layouts/Header';
import './index.css';
import TableProduct from './table-phieu-yeu-cau';
import DialogProduct from './table-phieu-yeu-cau/dialog';

export const ProductContext = createContext<string>('');

const RoutePageDanhSachProduct = () => {
  const [dialogCreatePYC, setDialogCreatePYC] = useState({open: false});
  return (
    <div>
      <Header
        title="Danh sách sản phẩm"
        actions={
          <Stack className="txtUppercase">
            <ButtonBase
              variant="outlined"
              color="success"
              label="Tạo sản phẩm"
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

export default RoutePageDanhSachProduct;
