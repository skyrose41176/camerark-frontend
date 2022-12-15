import {BoPhanLoaiYeuCau} from './bo-phan-loai-yeu-cau';
import {TimeStamp} from './common';
import {LoaiNghiepVu} from './loai-nghiep-vu';

export interface LoaiYeuCau extends TimeStamp {
  id: number;
  ten: string;
  loaiNghiepVuId: number;
  trangThai: boolean;
  loaiNghiepVu: LoaiNghiepVu;
  boPhanLoaiYeuCaus: BoPhanLoaiYeuCau[];
}
