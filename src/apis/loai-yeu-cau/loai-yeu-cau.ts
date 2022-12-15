import {LoaiYeuCau} from 'src/models';
import {QueryParams, ResponseData, ResultData} from 'src/models/common';
import axiosClient from '../axiosClient';

const loaiYeuCauApi = {
  getAll: (
    params: QueryParams & {loaiNghiepVuId?: number; trangThai?: boolean}
  ): Promise<ResponseData<ResultData<LoaiYeuCau>>> => {
    const url = '/LoaiYeuCau';
    return axiosClient.get(url, {params});
  },
  getOne: (id: number | string): Promise<ResponseData<LoaiYeuCau>> => {
    const url = `/LoaiYeuCau/${id}`;
    return axiosClient.get(url);
  },
  create: (data: Partial<LoaiYeuCau>): Promise<ResponseData<number>> => {
    const url = '/LoaiYeuCau';
    return axiosClient.post(url, data);
  },
  update: (data: Partial<LoaiYeuCau>): Promise<ResponseData<number>> => {
    const url = `/LoaiYeuCau/${data?.id}`;
    return axiosClient.put(url, data);
  },
  delete: (id: number | string): Promise<ResponseData<number>> => {
    const url = `/LoaiYeuCau/${id}`;
    return axiosClient.delete(url);
  },
};
export default loaiYeuCauApi;
