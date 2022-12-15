import {createContext, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useCountHopThu} from 'src/apis';
import {SearchBar, TopTab} from 'src/components/base';
import {ButtonGroupProps} from 'src/components/types';
import {PathParams} from 'src/models/common';
import TablePhieuYeuCau from '../table-phieu-yeu-cau';
import '../index.css';

export const PhieuYeuCauContext = createContext<string>('');

const HopThuTheoDoiPage = () => {
  const [search, setSearch] = useState<string>('');
  const navigate = useNavigate();
  const {screen = 'hop-thu-theo-doi', subScreen = 'tat-ca'} = useParams<PathParams>();
  const {data} = useCountHopThu({screen});
  const tabs: ButtonGroupProps[] = [
    {
      id: 0,
      label: 'tất cả',
      url: 'tat-ca',
      color: 'primary',
      count: data?.tatCa,
    },
    {
      id: 1,
      label: 'đang xử lý',
      url: 'dang-xu-ly',
      color: 'primary',
      count: data?.dangXuLy,
    },
    {
      id: 2,
      label: 'từ chối',
      url: 'tu-choi',
      color: 'error',
      count: data?.tuChoi,
    },
    {
      id: 3,
      label: 'hoàn thành',
      url: 'hoan-thanh',
      color: 'success',
      count: data?.hoanThanh,
    },
    {
      id: 4,
      label: 'đã đóng',
      url: 'dong-pyc',
      color: 'warning',
      count: data?.daDong,
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

export default HopThuTheoDoiPage;
