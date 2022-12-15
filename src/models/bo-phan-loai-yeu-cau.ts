import {BoPhan} from './bo-phan';
import {TimeStamp} from './common';
import {LoaiYeuCau} from './loai-yeu-cau';

export interface BoPhanLoaiYeuCau extends TimeStamp {
  id: number;
  boPhanId: number;
  loaiYeuCauId: number;
  boPhan: BoPhan;
  loaiYeuCau: LoaiYeuCau;
}
