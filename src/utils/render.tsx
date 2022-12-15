import {NhanSu} from '../models';

export const renderInfoUser = (dataNhanSu: NhanSu) => {
  return (
    <>
      <p>Mã nhân sự: {dataNhanSu.maNs}</p>
      <p>Tên nhân sự: {dataNhanSu.ten}</p>
      <p>Email: {dataNhanSu.email}</p>
      <p>Chức vụ: {dataNhanSu.chucVu}</p>
      <p>Đơn vị: {dataNhanSu.donVi}</p>
    </>
  );
};
