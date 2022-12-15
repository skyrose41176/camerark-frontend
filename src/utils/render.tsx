import {User} from '../models';

export const renderInfoUser = (dataNhanSu: User) => {
  return (
    <>
      <p>Tên: {dataNhanSu.name}</p>
      <p>Số điện thoại: {dataNhanSu.phone}</p>
    </>
  );
};
