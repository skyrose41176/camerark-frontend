import {NhanSu} from './nhan-su';

export interface NguoiXuLy {
  id: number;
  email: string;
  ten: string;
  chucVu: string;
  phongBan: string;
  vaiTro: string;
  vaiTroBoPhan: string;
  thuTuBoPhan: number;
  trangThai: number;
  trangThaiBoPhan: number;
  boPhanXuLyId: number;
  nhanSu: NhanSu;
  tenBoPhanXuLy: string;
}
