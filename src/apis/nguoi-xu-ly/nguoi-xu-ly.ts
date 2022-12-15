import {NguoiXuLy} from 'src/models';
import {ResponseData, ResultData} from 'src/models/common';
import axiosClient from '../axiosClient';

export const nguoiXuLyApi = {
  getByPhieuYeuCauId: (
    phieuYeuCauId: number | string
  ): Promise<ResponseData<ResultData<NguoiXuLy>>> => {
    const url = `/NguoiXuLy/${phieuYeuCauId}`;
    return axiosClient.get(url);
  },
  create: (data: Partial<NguoiXuLy & {noiDung: string}>): Promise<ResponseData<number>> => {
    const url = '/NguoiXuLy';
    return axiosClient.post(url, data);
  },
};
