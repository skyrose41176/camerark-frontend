import {TimeStamp} from './common';
import {DinhKemPhieuYeuCau} from './dinh-kem';
import {LichSuThaoTac} from './lich-su-thao-tac';
import {LoaiYeuCau} from './loai-yeu-cau';
import {NhanSu} from './nhan-su';
import {ThaoLuan} from './thao-luan';

export interface PhieuYeuCau extends TimeStamp {
  id: number;
  loaiYeuCauId: number;
  loaiYeuCau?: LoaiYeuCau;
  uuTien: string;
  moTa: string;
  trangThaiChinh: number;
  trangThaiPhu: number;
  tdvId: number;
  trangThaiTdv: number;
  chucDanh: string;
  chucDanhTdv: string;
  tenNhanSu: string;
  sdt: string;
  tenDonVi: string;
  thaoLuans: ThaoLuan[];
  lichSuThaoTacs: LichSuThaoTac[];
  dinhKemPhieuYeuCaus: DinhKemPhieuYeuCau[];
  boPhanXuLys: any[];
  closed: boolean;
  tenLoaiYeuCau: string;
  tenLoaiNghiepVu: string;
  nhanSuTdv: NhanSu;
  nhanSuCreate: NhanSu;
}

export interface CountPyc {
  hopThuTatCa: number;
  hopThuDi: number;
  hopThuDen: number;
  hopThuTheoDoi: number;
  hopThuDong: number;
}

export interface CountHopThuInside {
  tatCa: number;
  dangXuLy: number;
  tuChoi: number;
  hoanThanh: number;
  daDong: number;
  choTiepNhan: number;
}
