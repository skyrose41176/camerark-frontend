import {BoPhanLoaiYeuCau} from './bo-phan-loai-yeu-cau';
import {TimeStamp} from './common';
import {NhanSuBoPhan} from './nhan-su-bo-phan';

export interface BoPhan extends TimeStamp {
  id: number;
  ten: string;
  groupMail: string;
  isCntt?: number;
  trangThai: boolean;
  nhanSuBoPhans: NhanSuBoPhan[];
  boPhanLoaiYeuCaus: BoPhanLoaiYeuCau[];
}
