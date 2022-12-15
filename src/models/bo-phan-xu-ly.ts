import {TimeStamp} from './common';
import {NguoiXuLy} from './nguoi-xu-ly';
import {PhieuYeuCau} from './phieu-yeu-cau';

export interface BoPhanXuLy extends TimeStamp {
  tenBoPhan: string;
  trangThai: number;
  phieuYeuCauId: number;
  vaiTro: string;
  phieuYeuCau: PhieuYeuCau;
  thuTu: number;
  nguoiXuLys: NguoiXuLy[];
}
