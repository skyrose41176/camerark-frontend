import {Stack} from '@mui/material';
import {createContext, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useCountPhieuYeuCau} from 'src/apis';
import {ButtonBase, SearchBar, TopTab} from 'src/components/base';
import {ButtonGroupProps} from 'src/components/types';
import {PageWrapper} from 'src/components/wrapper';
import {PathParams} from 'src/models/common';
import Header from '../../layouts/Header';
import HopThuDenPage from './hop-thu-den';
import HopThuDiPage from './hop-thu-di';
import HopThuTheoDoiPage from './hop-thu-theo-doi';
import './index.css';
import TablePhieuYeuCau from './table-phieu-yeu-cau';
import DialogTaoPhieuYeuCau from './table-phieu-yeu-cau/dialog/tao-phieu-yeu-cau';

export const PhieuYeuCauContext = createContext<string>('');

const RoutePageDanhSachPhieuYeuCau = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>('');
  const [dialogCreatePYC, setDialogCreatePYC] = useState({open: false, step: 0});
  const {screen = 'tat-ca'} = useParams<PathParams>();
  const {data} = useCountPhieuYeuCau();
  const tabs: ButtonGroupProps[] = [
    {
      id: 0,
      label: 'tất cả',
      url: 'tat-ca',
      color: 'primary',
      count: data?.hopThuTatCa,
    },
    {
      id: 1,
      label: 'hộp thư đi',
      url: 'hop-thu-di/tat-ca',
      color: 'primary',
      count: data?.hopThuDi,
    },
    {
      id: 2,
      label: 'hộp thư đến',
      url: 'hop-thu-den/cho-tiep-nhan',
      color: 'primary',
      count: data?.hopThuDen,
    },
    {
      id: 3,
      label: 'đang theo dõi',
      url: 'dang-theo-doi/tat-ca',
      color: 'primary',
      count: data?.hopThuTheoDoi,
    },
  ];
  return (
    <div>
      <PhieuYeuCauContext.Provider value={search}>
        <Header
          title="Danh sách phiếu yêu cầu"
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
            panels={[
              <TablePhieuYeuCau />,
              <HopThuDiPage />,
              <HopThuDenPage />,
              <HopThuTheoDoiPage />,
            ]}
            onChange={value => {
              navigate(`/danh-sach-phieu-yeu-cau/${value.url}`);
            }}
            tabRightComponent={<SearchBar onSubmit={setSearch} />}
          />
        </PageWrapper>
      </PhieuYeuCauContext.Provider>

      {dialogCreatePYC?.open && (
        <DialogTaoPhieuYeuCau
          open={dialogCreatePYC.open}
          onClose={() => setDialogCreatePYC({open: false, step: 0})}
        />
      )}
    </div>
  );
};

export default RoutePageDanhSachPhieuYeuCau;
