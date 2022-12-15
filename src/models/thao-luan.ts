import {TimeStamp} from './common';
import {DinhKemThaoLuan} from './dinh-kem';
import {NhanSu} from './nhan-su';
import {PhieuYeuCau} from './phieu-yeu-cau';

export interface ThaoLuan extends TimeStamp {
  id: number;
  phieuYeuCauId: number;
  phieuYeuCau: PhieuYeuCau;
  noiDung: string;
  nhanSuId: number;
  nhanSu: NhanSu;
  parentId: number | null;
  soLuongPhanHoi: number;
  dinhKemThaoLuans: DinhKemThaoLuan[];
}
