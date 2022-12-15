import {DinhKemThaoLuan, ThaoLuan} from 'src/models';
import {QueryParams, ResponseData, ResultData} from 'src/models/common';
import axiosClient from '../axiosClient';

export const thaoLuanApi = {
  getAll: (
    params: QueryParams & {phieuYeuCauId: number | string; parentId?: number | string}
  ): Promise<ResponseData<ResultData<ThaoLuan>>> => {
    const url = '/ThaoLuan';
    return axiosClient.get(url, {params});
  },
  getAllDinhKemThaoLuan: (
    phieuYeuCauId: number | string
  ): Promise<ResponseData<DinhKemThaoLuan[]>> => {
    const url = `/ThaoLuan/DinhKem?phieuYeuCauId=${phieuYeuCauId}`;
    return axiosClient.get(url);
  },
  create: (data: Partial<ThaoLuan>): Promise<ResponseData<number>> => {
    const url = '/ThaoLuan';
    return axiosClient.post(url, data);
  },
};
