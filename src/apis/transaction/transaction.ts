import {Product} from 'src/models';
import {QueryParams, ResponseData, ResultData} from 'src/models/common';
import axiosClient from '../axiosClient';

export const transactionApi = {
  getAll: (params: QueryParams): Promise<ResponseData<ResultData<Product>>> => {
    const url = '/transactions/du-lieu';
    return axiosClient.get(url, {params});
  },
  getOne: (_id: number | string): Promise<ResponseData<Product>> => {
    const url = `/transactions/chi-tiet?id=${_id}`;
    return axiosClient.get(url);
  },
  create: (data: Partial<Product>): Promise<ResponseData<number>> => {
    const url = '/transactions/tao';
    return axiosClient.post(url, data);
  },
  update: (data: Partial<Product>): Promise<ResponseData<number>> => {
    const url = `/transactions/cap-nhat${data?._id}`;
    return axiosClient.put(url, data);
  },
  delete: (_id: number | string): Promise<ResponseData<number>> => {
    const url = `/transactions/xoa?id=${_id}`;
    return axiosClient.delete(url);
  },
};
export default transactionApi;
