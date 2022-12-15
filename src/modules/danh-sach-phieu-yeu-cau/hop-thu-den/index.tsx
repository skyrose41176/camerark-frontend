import {createContext} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useCountHopThu} from 'src/apis';
import {TopTab} from 'src/components/base';
import {ButtonGroupProps} from 'src/components/types';
import {PathParams} from 'src/models/common';
import TablePhieuYeuCau from '../table-phieu-yeu-cau';
import '../index.css';

export const PhieuYeuCauContext = createContext<string>('');

const HopThuDenPage = () => {
  const navigate = useNavigate();
  const {screen = 'hop-thu-den', subScreen = 'cho-tiep-nhan'} = useParams<PathParams>();
  const {data} = useCountHopThu({screen});
  const tabs: ButtonGroupProps[] = [
    {
      id: 0,
      label: 'chờ tiếp nhận',
      url: 'cho-tiep-nhan',
      color: 'primary',
      count: data?.choTiepNhan,
    },
    {
      id: 1,
      label: 'đang xử lý',
      url: 'dang-xu-ly',
      color: 'primary',
      count: data?.dangXuLy,
    },
  ];
  return (
    <div>
      <TopTab
        init={tabs.findIndex(item => item.url.includes(subScreen))}
        tabs={tabs.map(item => ({...item}))}
        panels={tabs.map((_, index) => (
          <TablePhieuYeuCau key={index.toString()} />
        ))}
        onChange={value => {
          navigate(`/danh-sach-phieu-yeu-cau/${screen}/${value.url}`);
        }}
      />
    </div>
  );
};

export default HopThuDenPage;
