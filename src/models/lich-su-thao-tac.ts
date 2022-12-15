import {TimeStamp} from './common';
import {DinhKemKetQua} from './dinh-kem';
import {PhieuYeuCau} from './phieu-yeu-cau';

export interface LichSuThaoTac extends TimeStamp {
  id: number;
  phieuYeuCauId: number;
  phieuYeuCau: PhieuYeuCau;
  tenBuoc: string;
  buoc: number;
  noiDung: string;
  xuLy: string;
  vaiTro: string;
  chucVu: string;
  tenNhanSu: string;
  tenDonVi: string;
  dinhKemKetQuas: DinhKemKetQua[];
}
