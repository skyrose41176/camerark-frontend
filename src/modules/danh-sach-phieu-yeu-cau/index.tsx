import {Stack} from '@mui/material';
import {createContext, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {ButtonBase, SearchBar, TopTab} from 'src/components/base';
import {ButtonGroupProps} from 'src/components/types';
import {PageWrapper} from 'src/components/wrapper';
import {PathParams} from 'src/models/common';
import Header from '../../layouts/Header';
import './index.css';
import TableProduct from './table-phieu-yeu-cau';
import DialogTaoProduct from './table-phieu-yeu-cau/dialog/tao-phieu-yeu-cau';

export const ProductContext = createContext<string>('');

const RoutePageDanhSachProduct = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>('');
  const [dialogCreatePYC, setDialogCreatePYC] = useState({open: false, step: 0});
  const {screen = 'tat-ca'} = useParams<PathParams>();
  const tabs: ButtonGroupProps[] = [
    {
      id: 0,
      label: 'Sản phẩm',
      url: 'tat-ca',
      color: 'primary',
    },
    {
      id: 1,
      label: 'Kho hàng',
      url: 'hop-thu-di/tat-ca',
      color: 'primary',
    },
  ];
  return (
    <div>
      <ProductContext.Provider value={search}>
        <Header
          title="Danh sách sản phẩm"
          actions={
            <Stack className="txtUppercase">
              <ButtonBase
                variant="outlined"
                color="success"
                label="Tạo yêu cầu"
                onClick={() => setDialogCreatePYC({open: true, step: 0})}
              />
            </Stack>
          }
        />
        <PageWrapper>
          <TopTab
            init={tabs.findIndex(item => item.url.includes(screen))}
            tabs={tabs.map(item => ({...item}))}
            panels={[<TableProduct />, <TableProduct />]}
            onChange={value => {
              navigate(`/danh-sach-phieu-yeu-cau/${value.url}`);
            }}
            tabRightComponent={<SearchBar onSubmit={setSearch} />}
          />
        </PageWrapper>
      </ProductContext.Provider>

      {dialogCreatePYC?.open && (
        <DialogTaoProduct
          open={dialogCreatePYC.open}
          onClose={() => setDialogCreatePYC({open: false, step: 0})}
        />
      )}
    </div>
  );
};

export default RoutePageDanhSachProduct;
