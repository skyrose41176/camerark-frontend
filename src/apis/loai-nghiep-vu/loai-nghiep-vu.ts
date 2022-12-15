import {LoaiNghiepVu} from 'src/models';
import {QueryParams, ResponseData, ResultData} from 'src/models/common';
import axiosClient from '../axiosClient';

const loaiNghiepVuApi = {
  getAll: (
    params: QueryParams & {trangThai?: boolean}
    // cancelToken?: CancelToken
  ): Promise<ResponseData<ResultData<LoaiNghiepVu>>> => {
    const url = '/LoaiNghiepVu';
    return axiosClient.get(url, {params});
  },
  getOne: (id: number | string): Promise<ResponseData<LoaiNghiepVu>> => {
    const url = `/LoaiNghiepVu/${id}`;
    return axiosClient.get(url);
  },
  create: (data: Partial<LoaiNghiepVu>): Promise<ResponseData<number>> => {
    const url = '/LoaiNghiepVu';
    return axiosClient.post(url, data);
  },
  update: (data: Partial<LoaiNghiepVu>): Promise<ResponseData<number>> => {
    const url = `/LoaiNghiepVu/${data.id}`;
    return axiosClient.put(url, data);
  },
  delete: (id: number | string): Promise<ResponseData<number>> => {
    const url = `/LoaiNghiepVu/${id}`;
    return axiosClient.delete(url);
  },
};
export default loaiNghiepVuApi;
