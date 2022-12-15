import {NhanSu, NhanSuBoPhanDTO} from 'src/models';
import {QueryParams, ResponseData, ResultData} from 'src/models/common';
import axiosClient from '../axiosClient';

const nhanSuApi = {
  getAll: (
    params: QueryParams & {phieuYeuCauId?: string | number}
  ): Promise<ResponseData<ResultData<NhanSu>>> => {
    const url = '/NhanSu';
    return axiosClient.get(url, {params});
  },
  getAllNhanSuBoPhan: (params: QueryParams): Promise<ResponseData<ResultData<NhanSuBoPhanDTO>>> => {
    const url = '/NhanSu/BoPhan';
    return axiosClient.get(url, {params});
  },
  getOne: (id: number | string): Promise<ResponseData<NhanSu>> => {
    const url = `/NhanSu/${id}`;
    return axiosClient.get(url);
  },
  update: (data: Partial<any>): Promise<ResponseData<number>> => {
    const url = `/NhanSu/${data.id}`;
    return axiosClient.put(url, data);
  },
  updateRole: (data: Partial<any>): Promise<ResponseData<number>> => {
    const url = `/NhanSu/Role/${data.id}`;
    return axiosClient.put(url, data);
  },
  sync: (): Promise<number> => {
    const url = `/NhanSu/Sync`;
    return axiosClient.get(url);
  },
};
export default nhanSuApi;
