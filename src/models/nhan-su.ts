import {TimeStamp} from './common';
import {NhanSuBoPhan} from './nhan-su-bo-phan';

export interface NhanSu extends TimeStamp {
  id: number;
  email: string;
  ten: string;
  maNs: string;
  chucVu: string;
  sdt: string;
  phongBan: string;
  maPhongBan: string;
  cif: string;
  tdvId: number;
  anhDaiDien: string;
  cmnd: string;
  khuVuc: string;
  donVi: string;
  role: number;
  nhanSuBoPhans: NhanSuBoPhan[];
}

export interface NhanSuDTO {
  email: string;
  ten: string;
  donVi: string;
  boPhan: string;
  sdt: string;
}
export interface NhanSuBoPhanDTO extends NhanSuDTO {
  id: number;
  chucVu: string;
  maNs: string;
}
