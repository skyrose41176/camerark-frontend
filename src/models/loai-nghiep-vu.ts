import {TimeStamp} from './common';
import {LoaiYeuCau} from './loai-yeu-cau';

export interface LoaiNghiepVu extends TimeStamp {
  id: number;
  ten: string;
  groupMail: string;
  isTrungGian: number | null;
  trangThai: boolean;
  loaiYeuCaus: LoaiYeuCau[];
}
