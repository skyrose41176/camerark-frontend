import {TimeStamp} from './common';
import {NhanSu} from './nhan-su';

export interface NhanSuBoPhan extends TimeStamp {
  id: number;
  nhanSuId: number;
  boPhanId: number;
  nhanSu: NhanSu;
}
