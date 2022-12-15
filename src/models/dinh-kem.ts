import {MyFile} from 'src/apis/upload';
import {TimeStamp} from './common';
import {LichSuThaoTac} from './lich-su-thao-tac';
import {PhieuYeuCau} from './phieu-yeu-cau';
import {ThaoLuan} from './thao-luan';

export interface DinhKemPhieuYeuCau extends TimeStamp, MyFile {
  id: number;
  phieuYeuCauId: number;
  phieuYeuCau: PhieuYeuCau;
}

export interface DinhKemThaoLuan extends TimeStamp, MyFile {
  id: number;
  thaoLuanId: number;
  thaoLuan: ThaoLuan;
}

export interface DinhKemKetQua extends TimeStamp, MyFile {
  id: number;
  lichSuThaoTacId: number;
  lichSuThaoTac: LichSuThaoTac;
}
