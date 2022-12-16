import {Transaction} from 'src/models';
import {QueryParams, ResultData} from 'src/models/common';
import axiosClient from '../axiosClient';

export const transactionApi = {
  getAll: (params: QueryParams): Promise<ResultData<Transaction>> => {
    const url = '/transactions/du-lieu';
    return axiosClient.get(url, {params});
  },
  getOne: (_id: number | string): Promise<Transaction> => {
    const url = `/transactions/chi-tiet?id=${_id}`;
    return axiosClient.get(url);
  },
  create: (data: Partial<Transaction>): Promise<number> => {
    const url = '/transactions/tao';
    return axiosClient.post(url, data);
  },
  update: (data: Partial<Transaction>): Promise<number> => {
    const url = `/transactions/cap-nhat?id=${data?._id}`;
    return axiosClient.put(url, data);
  },
  delete: (_id: number | string): Promise<number> => {
    const url = `/transactions/xoa?id=${_id}`;
    return axiosClient.delete(url);
  },
};
export default transactionApi;
