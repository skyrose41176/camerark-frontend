import {BoPhan} from 'src/models';
import {QueryParams, ResponseData, ResultData} from 'src/models/common';
import axiosClient from '../axiosClient';

export const boPhanApi = {
  getAll: (
    params: QueryParams & {phieuYeuCauId?: number | string; trangThai?: boolean}
  ): Promise<ResponseData<ResultData<BoPhan>>> => {
    const url = '/BoPhan';
    return axiosClient.get(url, {params});
  },
  getOne: (id: number | string): Promise<ResponseData<BoPhan>> => {
    const url = `/BoPhan/${id}`;
    return axiosClient.get(url);
  },
  create: (data: Partial<BoPhan>): Promise<ResponseData<number>> => {
    const url = '/BoPhan';
    return axiosClient.post(url, data);
  },
  update: (data: Partial<BoPhan>): Promise<ResponseData<number>> => {
    const url = `/BoPhan/${data?.id}`;
    return axiosClient.put(url, data);
  },
  chooseCntt: (data: any): Promise<ResponseData<number>> => {
    const url = `/BoPhan/ChooseCntt/${data?.id}`;
    return axiosClient.put(url, data);
  },
  delete: (id: number | string): Promise<ResponseData<number>> => {
    const url = `/BoPhan/${id}`;
    return axiosClient.delete(url);
  },
};
