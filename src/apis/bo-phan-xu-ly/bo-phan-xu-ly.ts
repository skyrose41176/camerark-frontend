import {BoPhanXuLy} from 'src/models';
import {ResponseData} from 'src/models/common';
import axiosClient from '../axiosClient';

export const boPhanXuLyApi = {
  getAll: (params: {phieuYeuCauId: number | string}): Promise<ResponseData<BoPhanXuLy[]>> => {
    const url = `/BoPhanXuLy/${params.phieuYeuCauId}`;
    return axiosClient.get(url);
  },
  create: (data: {
    phieuYeuCauId: number;
    boPhanIds: number[];
    type: string;
  }): Promise<ResponseData<number>> => {
    const url = '/BoPhanXuLy';
    return axiosClient.post(url, data);
  },
};
